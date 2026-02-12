import { useRef, useEffect, useState, useCallback } from "react";
import { Play, RotateCcw } from "lucide-react";

/* ── B1 Battle Droid shape (drawn on canvas) ────────────────── */
const drawDroid = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  scale: number,
  walkPhase: number
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const s = scale;

  const legSwing = Math.sin(walkPhase) * 0.3;
  const armSwing = Math.sin(walkPhase) * 0.25;

  // Glow effect
  ctx.shadowColor = "#c4a35a";
  ctx.shadowBlur = 8;

  // Body color
  const bodyColor = "#c4a35a";
  const darkColor = "#8a7440";
  const eyeColor = "#ff3333";

  // Legs
  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.moveTo(-3 * s, 2 * s);
  ctx.lineTo(-3 * s + Math.sin(legSwing) * 4 * s, 12 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(3 * s, 2 * s);
  ctx.lineTo(3 * s + Math.sin(-legSwing) * 4 * s, 12 * s);
  ctx.stroke();

  // Torso
  ctx.fillStyle = bodyColor;
  ctx.fillRect(-4 * s, -6 * s, 8 * s, 9 * s);
  ctx.fillStyle = darkColor;
  ctx.fillRect(-3 * s, -5 * s, 6 * s, 3 * s);

  // Arms
  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(-5 * s, -4 * s);
  ctx.lineTo(-8 * s + Math.sin(armSwing) * 3 * s, 4 * s);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(5 * s, -4 * s);
  ctx.lineTo(8 * s + Math.sin(-armSwing) * 3 * s, 4 * s);
  ctx.stroke();

  // Neck
  ctx.fillStyle = darkColor;
  ctx.fillRect(-1.5 * s, -8 * s, 3 * s, 2.5 * s);

  // Head
  ctx.fillStyle = bodyColor;
  ctx.fillRect(-4 * s, -14 * s, 8 * s, 6 * s);
  // Snout
  ctx.fillStyle = darkColor;
  ctx.fillRect(-2 * s, -10 * s, 4 * s, 3 * s);

  // Eyes (glowing red)
  ctx.shadowColor = eyeColor;
  ctx.shadowBlur = 6;
  ctx.fillStyle = eyeColor;
  ctx.beginPath();
  ctx.arc(-2 * s, -11.5 * s, 1.2 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(2 * s, -11.5 * s, 1.2 * s, 0, Math.PI * 2);
  ctx.fill();

  // Antenna
  ctx.shadowBlur = 0;
  ctx.strokeStyle = darkColor;
  ctx.lineWidth = 1 * s;
  ctx.beginPath();
  ctx.moveTo(0, -14 * s);
  ctx.lineTo(0, -17 * s);
  ctx.stroke();

  ctx.restore();
};

/* ── A* Pathfinding ──────────────────────────────────────────── */
interface GridNode {
  row: number;
  col: number;
  g: number;
  h: number;
  f: number;
  parent: GridNode | null;
}

const heuristic = (a: { row: number; col: number }, b: { row: number; col: number }) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const findPath = (
  obstacles: Set<string>,
  start: { row: number; col: number },
  end: { row: number; col: number },
  rows: number,
  cols: number
): { row: number; col: number }[] => {
  const open: GridNode[] = [];
  const closed = new Set<string>();

  open.push({ ...start, g: 0, h: heuristic(start, end), f: heuristic(start, end), parent: null });
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    const key = `${current.row},${current.col}`;
    if (closed.has(key)) continue;
    closed.add(key);

    if (current.row === end.row && current.col === end.col) {
      const path: { row: number; col: number }[] = [];
      let node: GridNode | null = current;
      while (node) {
        path.unshift({ row: node.row, col: node.col });
        node = node.parent;
      }
      return path;
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (obstacles.has(`${nr},${nc}`)) continue;
      if (closed.has(`${nr},${nc}`)) continue;
      const cost = dr !== 0 && dc !== 0 ? 1.414 : 1;
      const g = current.g + cost;
      const h = heuristic({ row: nr, col: nc }, end);
      open.push({ row: nr, col: nc, g, h, f: g + h, parent: current });
    }
  }
  return [];
};

/* ── Main Component ──────────────────────────────────────────── */
const GRID_COLS = 32;
const GRID_ROWS = 18;

const DroidSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [obstacles, setObstacles] = useState<Set<string>>(new Set());
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
  const [targetPos, setTargetPos] = useState<{ row: number; col: number } | null>(null);
  const [mode, setMode] = useState<"wall" | "start" | "target">("wall");
  const [isRunning, setIsRunning] = useState(false);
  const [droidPath, setDroidPath] = useState<{ row: number; col: number }[]>([]);
  const [droidIndex, setDroidIndex] = useState(0);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [isDrawing, setIsDrawing] = useState(false);

  const getCellSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 20;
    return Math.floor(Math.min(canvas.width / GRID_COLS, canvas.height / GRID_ROWS));
  }, []);

  const getGridOffset = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const cellSize = getCellSize();
    return {
      x: (canvas.width - cellSize * GRID_COLS) / 2,
      y: (canvas.height - cellSize * GRID_ROWS) / 2,
    };
  }, [getCellSize]);

  const getCellFromMouse = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      const offset = getGridOffset();
      const cellSize = getCellSize();
      const col = Math.floor((mx - offset.x) / cellSize);
      const row = Math.floor((my - offset.y) / cellSize);
      if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) return null;
      return { row, col };
    },
    [getCellSize, getGridOffset]
  );

  const handleClick = useCallback(
    (cell: { row: number; col: number }) => {
      if (isRunning) return;
      if (mode === "start") {
        setStartPos(cell);
      } else if (mode === "target") {
        setTargetPos(cell);
      } else {
        const key = `${cell.row},${cell.col}`;
        setObstacles((prev) => {
          const next = new Set(prev);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        });
      }
    },
    [mode, isRunning]
  );

  const runSimulation = useCallback(() => {
    if (!startPos || !targetPos || isRunning) return;
    setIsRunning(true);
    setExplored(new Set());
    setDroidPath([]);
    setDroidIndex(0);

    const path = findPath(obstacles, startPos, targetPos, GRID_ROWS, GRID_COLS);
    if (path.length === 0) {
      setIsRunning(false);
      return;
    }

    // Animate explored cells then droid movement
    const exploredSet = new Set<string>();
    let step = 0;
    const animateExplore = () => {
      if (step < path.length) {
        exploredSet.add(`${path[step].row},${path[step].col}`);
        setExplored(new Set(exploredSet));
        step++;
        setTimeout(animateExplore, 30);
      } else {
        setDroidPath(path);
        let d = 0;
        const moveDroid = () => {
          if (d < path.length) {
            setDroidIndex(d);
            d++;
            setTimeout(moveDroid, 50);
          } else {
            setIsRunning(false);
          }
        };
        moveDroid();
      }
    };
    animateExplore();
  }, [startPos, targetPos, obstacles, isRunning]);

  const resetAll = useCallback(() => {
    setObstacles(new Set());
    setStartPos(null);
    setTargetPos(null);
    setDroidPath([]);
    setDroidIndex(0);
    setExplored(new Set());
    setIsRunning(false);
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    let phase = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cellSize = getCellSize();
      const offset = getGridOffset();
      phase += 0.08;

      // Clear
      ctx.fillStyle = "#080a12";
      ctx.fillRect(0, 0, w, h);

      // Draw grid
      ctx.strokeStyle = "rgba(196, 163, 90, 0.08)";
      ctx.lineWidth = 1;
      for (let r = 0; r <= GRID_ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(offset.x, offset.y + r * cellSize);
        ctx.lineTo(offset.x + GRID_COLS * cellSize, offset.y + r * cellSize);
        ctx.stroke();
      }
      for (let c = 0; c <= GRID_COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(offset.x + c * cellSize, offset.y);
        ctx.lineTo(offset.x + c * cellSize, offset.y + GRID_ROWS * cellSize);
        ctx.stroke();
      }

      // Draw explored cells
      explored.forEach((key) => {
        const [r, c] = key.split(",").map(Number);
        ctx.fillStyle = "rgba(59, 130, 246, 0.12)";
        ctx.fillRect(offset.x + c * cellSize + 1, offset.y + r * cellSize + 1, cellSize - 2, cellSize - 2);
      });

      // Draw path
      if (droidPath.length > 0) {
        ctx.strokeStyle = "rgba(196, 163, 90, 0.5)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#c4a35a";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        droidPath.forEach((p, i) => {
          const px = offset.x + p.col * cellSize + cellSize / 2;
          const py = offset.y + p.row * cellSize + cellSize / 2;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw obstacles
      obstacles.forEach((key) => {
        const [r, c] = key.split(",").map(Number);
        ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
        ctx.fillRect(offset.x + c * cellSize + 1, offset.y + r * cellSize + 1, cellSize - 2, cellSize - 2);
        // Border highlight
        ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(offset.x + c * cellSize + 1, offset.y + r * cellSize + 1, cellSize - 2, cellSize - 2);
      });

      // Draw start
      if (startPos) {
        ctx.fillStyle = "rgba(34, 197, 94, 0.5)";
        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 8;
        ctx.fillRect(
          offset.x + startPos.col * cellSize + 2,
          offset.y + startPos.row * cellSize + 2,
          cellSize - 4,
          cellSize - 4
        );
        ctx.shadowBlur = 0;
      }

      // Draw target
      if (targetPos) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.5)";
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 8;
        ctx.fillRect(
          offset.x + targetPos.col * cellSize + 2,
          offset.y + targetPos.row * cellSize + 2,
          cellSize - 4,
          cellSize - 4
        );
        ctx.shadowBlur = 0;
      }

      // Draw droid
      if (droidPath.length > 0 && droidIndex < droidPath.length) {
        const dp = droidPath[droidIndex];
        const dx = offset.x + dp.col * cellSize + cellSize / 2;
        const dy = offset.y + dp.row * cellSize + cellSize / 2;
        // Direction
        let angle = 0;
        if (droidIndex < droidPath.length - 1) {
          const next = droidPath[droidIndex + 1];
          angle = Math.atan2(
            (next.row - dp.row) * cellSize,
            (next.col - dp.col) * cellSize
          ) + Math.PI / 2;
        }
        drawDroid(ctx, dx, dy, angle, cellSize / 28, phase * 4);
      }

      // Scan line effect
      const scanY = (phase * 30) % h;
      const grad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(196, 163, 90, 0.04)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 2, w, 4);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [obstacles, startPos, targetPos, droidPath, droidIndex, explored, getCellSize, getGridOffset]);

  return (
    <div className="sw-card overflow-hidden scan-line-effect">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 pb-3">
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.2em] text-sw-saber mb-1">
            SEPARATIST DROID PATHFINDER
          </h3>
          <p className="text-xs text-sw-steel font-body tracking-wide">
            A* search — the algorithm powering real autonomous droids
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(["start", "target", "wall"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-md border transition-all ${
                mode === m
                  ? "border-sw-saber/50 bg-sw-saber/15 text-sw-saber"
                  : "border-border text-sw-steel hover:border-sw-steel/40"
              }`}
            >
              {m === "start" ? "START" : m === "target" ? "TARGET" : "WALLS"}
            </button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          <button
            onClick={runSimulation}
            disabled={!startPos || !targetPos || isRunning}
            className="px-3 py-1.5 text-xs font-display tracking-wider rounded-md border border-sw-saber/50 bg-sw-saber/10 text-sw-saber hover:bg-sw-saber/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Play className="w-3 h-3" /> DEPLOY
          </button>
          <button
            onClick={resetAll}
            className="px-2 py-1.5 text-xs rounded-md border border-border text-sw-steel hover:border-sw-steel/40 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-5 pb-2 text-[10px] font-mono tracking-wider text-sw-steel/60 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50 inline-block" /> START
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500/50 inline-block" /> TARGET
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-500/50 inline-block" /> WALL
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/20 inline-block" /> EXPLORED
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sw-saber/40 inline-block" /> PATH
        </span>
      </div>

      {/* Canvas */}
      <div className="w-full aspect-[16/9] relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={(e) => {
            const cell = getCellFromMouse(e);
            if (cell) {
              setIsDrawing(true);
              handleClick(cell);
            }
          }}
          onMouseMove={(e) => {
            if (isDrawing && mode === "wall" && !isRunning) {
              const cell = getCellFromMouse(e);
              if (cell) {
                const key = `${cell.row},${cell.col}`;
                if (!obstacles.has(key)) {
                  setObstacles((prev) => new Set(prev).add(key));
                }
              }
            }
          }}
          onMouseUp={() => setIsDrawing(false)}
          onMouseLeave={() => setIsDrawing(false)}
        />
      </div>

      <div className="px-5 py-3">
        <p className="text-[10px] font-mono tracking-wider text-sw-steel/40 text-center">
          Place start & target, draw walls, then deploy the droid — A* finds the optimal path, just like real autonomous navigation systems
        </p>
      </div>
    </div>
  );
};

export default DroidSimulator;
