import { useState, useCallback, useRef, useEffect } from "react";
import { Play, RotateCcw, Trash2 } from "lucide-react";

const COLS = 28;
const ROWS = 16;

type CellType = "empty" | "wall" | "start" | "end" | "path" | "visited" | "droid";

interface Node {
  row: number;
  col: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

const heuristic = (a: { row: number; col: number }, b: { row: number; col: number }) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const aStar = (
  grid: CellType[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
): { path: { row: number; col: number }[]; visited: { row: number; col: number }[] } => {
  const open: Node[] = [];
  const closed = new Set<string>();
  const visited: { row: number; col: number }[] = [];

  const startNode: Node = { ...start, g: 0, h: heuristic(start, end), f: heuristic(start, end), parent: null };
  open.push(startNode);

  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    const key = `${current.row},${current.col}`;

    if (closed.has(key)) continue;
    closed.add(key);
    visited.push({ row: current.row, col: current.col });

    if (current.row === end.row && current.col === end.col) {
      const path: { row: number; col: number }[] = [];
      let node: Node | null = current;
      while (node) {
        path.unshift({ row: node.row, col: node.col });
        node = node.parent;
      }
      return { path, visited };
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      if (grid[nr][nc] === "wall") continue;
      if (closed.has(`${nr},${nc}`)) continue;

      // Diagonal movement cost
      const moveCost = dr !== 0 && dc !== 0 ? 1.414 : 1;
      const g = current.g + moveCost;
      const h = heuristic({ row: nr, col: nc }, end);

      open.push({ row: nr, col: nc, g, h, f: g + h, parent: current });
    }
  }

  return { path: [], visited };
};

type PlaceMode = "wall" | "start" | "end";

const DroidSimulator = () => {
  const createEmptyGrid = (): CellType[][] =>
    Array.from({ length: ROWS }, () => Array(COLS).fill("empty"));

  const [grid, setGrid] = useState<CellType[][]>(createEmptyGrid);
  const [startPos, setStartPos] = useState<{ row: number; col: number } | null>(null);
  const [endPos, setEndPos] = useState<{ row: number; col: number } | null>(null);
  const [mode, setMode] = useState<PlaceMode>("wall");
  const [isRunning, setIsRunning] = useState(false);
  const [droidPos, setDroidPos] = useState<{ row: number; col: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stats, setStats] = useState<{ explored: number; pathLen: number } | null>(null);
  const animRef = useRef<number | null>(null);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isRunning) return;
      setGrid((prev) => {
        const next = prev.map((r) => [...r]);
        if (mode === "start") {
          // Clear old start
          if (startPos) next[startPos.row][startPos.col] = "empty";
          next[row][col] = "start";
          setStartPos({ row, col });
        } else if (mode === "end") {
          if (endPos) next[endPos.row][endPos.col] = "empty";
          next[row][col] = "end";
          setEndPos({ row, col });
        } else {
          if (next[row][col] === "wall") next[row][col] = "empty";
          else if (next[row][col] === "empty") next[row][col] = "wall";
        }
        return next;
      });
    },
    [mode, isRunning, startPos, endPos]
  );

  const handleMouseDown = (row: number, col: number) => {
    if (mode === "wall") setIsDrawing(true);
    handleCellClick(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing && mode === "wall" && !isRunning) {
      setGrid((prev) => {
        const next = prev.map((r) => [...r]);
        if (next[row][col] === "empty") next[row][col] = "wall";
        return next;
      });
    }
  };

  const clearPath = useCallback(() => {
    setGrid((prev) =>
      prev.map((r) => r.map((c) => (c === "path" || c === "visited" || c === "droid" ? "empty" : c)))
    );
    setDroidPos(null);
    setStats(null);
  }, []);

  const resetGrid = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setGrid(createEmptyGrid());
    setStartPos(null);
    setEndPos(null);
    setDroidPos(null);
    setIsRunning(false);
    setStats(null);
  }, []);

  const runSimulation = useCallback(() => {
    if (!startPos || !endPos || isRunning) return;
    clearPath();
    setIsRunning(true);

    // Clean grid for algorithm
    const cleanGrid = grid.map((r) =>
      r.map((c) => (c === "path" || c === "visited" || c === "droid" ? "empty" : c))
    );

    const { path, visited } = aStar(cleanGrid, startPos, endPos);

    // Animate visited cells, then path, then droid
    let i = 0;
    const animateVisited = () => {
      if (i < visited.length) {
        const { row, col } = visited[i];
        setGrid((prev) => {
          const next = prev.map((r) => [...r]);
          if (next[row][col] === "empty") next[row][col] = "visited";
          return next;
        });
        i++;
        animRef.current = requestAnimationFrame(animateVisited);
      } else {
        // Animate path
        let j = 0;
        const animatePath = () => {
          if (j < path.length) {
            const { row, col } = path[j];
            setGrid((prev) => {
              const next = prev.map((r) => [...r]);
              if (next[row][col] !== "start" && next[row][col] !== "end")
                next[row][col] = "path";
              return next;
            });
            j++;
            setTimeout(animatePath, 40);
          } else {
            // Animate droid
            let d = 0;
            const animateDroid = () => {
              if (d < path.length) {
                setDroidPos(path[d]);
                d++;
                setTimeout(animateDroid, 60);
              } else {
                setIsRunning(false);
                setStats({ explored: visited.length, pathLen: path.length });
              }
            };
            animateDroid();
          }
        };
        animatePath();
      }
    };
    animateVisited();
  }, [startPos, endPos, grid, isRunning, clearPath]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const getCellClass = (type: CellType, row: number, col: number) => {
    const isDroid = droidPos?.row === row && droidPos?.col === col;
    if (isDroid) return "bg-sw-saber shadow-[0_0_8px_hsl(45,90%,55%,0.6)] scale-110 rounded-full";
    switch (type) {
      case "wall": return "bg-sw-steel/60 border-sw-steel/40";
      case "start": return "bg-emerald-500/70 shadow-[0_0_6px_hsl(150,60%,50%,0.4)]";
      case "end": return "bg-red-500/70 shadow-[0_0_6px_hsl(0,70%,50%,0.4)]";
      case "path": return "bg-sw-saber/40 shadow-[0_0_4px_hsl(45,90%,55%,0.2)]";
      case "visited": return "bg-sw-force/15";
      default: return "bg-sw-nebula/50 hover:bg-sw-steel/20";
    }
  };

  return (
    <div className="sw-card p-6 scan-line-effect">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-display text-sm font-bold tracking-[0.2em] text-sw-saber mb-1">
            DROID PATHFINDER
          </h3>
          <p className="text-xs text-sw-steel font-body tracking-wide">
            A* search algorithm — used in real autonomous robots
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode buttons */}
          {(["start", "end", "wall"] as PlaceMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-md border transition-all ${
                mode === m
                  ? "border-sw-saber/50 bg-sw-saber/15 text-sw-saber"
                  : "border-border text-sw-steel hover:border-sw-steel/40"
              }`}
            >
              {m === "start" ? "START" : m === "end" ? "TARGET" : "WALLS"}
            </button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          <button
            onClick={runSimulation}
            disabled={!startPos || !endPos || isRunning}
            className="px-3 py-1.5 text-xs font-display tracking-wider rounded-md border border-sw-saber/50 bg-sw-saber/10 text-sw-saber hover:bg-sw-saber/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Play className="w-3 h-3" /> RUN
          </button>
          <button
            onClick={clearPath}
            className="px-2 py-1.5 text-xs rounded-md border border-border text-sw-steel hover:border-sw-steel/40 transition-all"
            title="Clear path"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            onClick={resetGrid}
            className="px-2 py-1.5 text-xs rounded-md border border-border text-sw-steel hover:border-sw-steel/40 transition-all"
            title="Reset grid"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex gap-4 mb-4 text-[10px] font-mono tracking-wider text-sw-steel/60 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70 inline-block" /> START
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500/70 inline-block" /> TARGET
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sw-steel/60 inline-block" /> WALL
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sw-force/30 inline-block" /> EXPLORED
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-sw-saber/40 inline-block" /> PATH
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sw-saber inline-block" /> DROID
        </span>
      </div>

      {/* Grid */}
      <div
        className="grid gap-[1px] w-full overflow-x-auto select-none"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseUp={() => setIsDrawing(false)}
      >
        {grid.map((row, ri) =>
          row.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`aspect-square rounded-[2px] border border-border/30 transition-colors duration-150 cursor-pointer ${getCellClass(cell, ri, ci)}`}
              onMouseDown={() => handleMouseDown(ri, ci)}
              onMouseEnter={() => handleMouseEnter(ri, ci)}
            />
          ))
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="mt-4 flex gap-6 text-[10px] font-mono tracking-wider text-sw-steel/70">
          <span>NODES EXPLORED: <span className="text-sw-force">{stats.explored}</span></span>
          <span>PATH LENGTH: <span className="text-sw-saber">{stats.pathLen}</span></span>
          <span>ALGORITHM: <span className="text-sw-holo">A* SEARCH</span></span>
        </div>
      )}

      <p className="mt-4 text-[10px] font-mono tracking-wider text-sw-steel/40 text-center">
        A* finds the shortest path using heuristic-guided search — the same algorithm powering real-world autonomous robots and droids.
      </p>
    </div>
  );
};

export default DroidSimulator;
