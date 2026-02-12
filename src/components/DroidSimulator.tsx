import { useState, useCallback } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap, Shield, Crosshair, RotateCcw } from "lucide-react";

type DroidAction = "idle" | "walking" | "shooting" | "shielding" | "scanning";

const DroidSimulator = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [action, setAction] = useState<DroidAction>("idle");
  const [logs, setLogs] = useState<string[]>(["[SYS] B1 Battle Droid online.", "[SYS] Awaiting commands..."]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-6), msg]);
  }, []);

  const step = 6;

  const move = (dir: "up" | "down" | "left" | "right") => {
    setAction("walking");
    switch (dir) {
      case "up": setY(p => Math.max(5, p - step)); setRotation(0); break;
      case "down": setY(p => Math.min(95, p + step)); setRotation(180); break;
      case "left": setX(p => Math.max(5, p - step)); setRotation(-90); break;
      case "right": setX(p => Math.min(95, p + step)); setRotation(90); break;
    }
    addLog(`[MOV] Relocating ${dir.toUpperCase()} — pos(${dir === "left" || dir === "right" ? (dir === "left" ? "−" : "+") : "0"}, ${dir === "up" || dir === "down" ? (dir === "up" ? "−" : "+") : "0"})`);
    setTimeout(() => setAction("idle"), 400);
  };

  const doAction = (act: DroidAction, label: string) => {
    setAction(act);
    addLog(`[ACT] ${label}`);
    setTimeout(() => setAction("idle"), 800);
  };

  const reset = () => {
    setX(50); setY(50); setRotation(0); setAction("idle");
    setLogs(["[SYS] B1 Battle Droid rebooted.", "[SYS] Awaiting commands..."]);
  };

  return (
    <section className="mb-16">
      <h2 className="section-title">DROID SIMULATOR</h2>
      <p className="text-center text-sw-steel mb-2 font-body text-sm tracking-wide">
        Separatist B1 Battle Droid — Based on open-source pathfinding algorithm used on real robots
      </p>
      <p className="text-center text-sw-saber/60 mb-6 font-mono text-[10px] tracking-[0.15em]">
        ROGER ROGER • PROTOTYPE HOLO-INTERFACE v2.1
      </p>

      <div className="sw-card p-0 max-w-2xl mx-auto overflow-hidden scan-line-effect">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-sw-saber/15 bg-sw-saber/5">
          <span className="font-mono text-[10px] text-sw-saber tracking-[0.2em]">◆ HOLO-SIM UNIT</span>
          <span className="font-mono text-[10px] text-sw-holo/60 tracking-wider">
            STATUS: <span className={action !== "idle" ? "text-sw-saber animate-pulse" : "text-green-400"}>{action.toUpperCase()}</span>
          </span>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Arena */}
          <div className="flex-1 relative" style={{ minHeight: 280 }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(45 90% 55% / 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(45 90% 55% / 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
            {/* Radar circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-40 h-40 rounded-full border border-sw-saber/10" />
              <div className="absolute w-24 h-24 rounded-full border border-sw-saber/8" />
              <div className="absolute w-56 h-56 rounded-full border border-sw-saber/5" />
            </div>

            {/* Droid */}
            <div
              className="absolute transition-all duration-300 ease-out"
              style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
            >
              {/* Glow */}
              <div className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                action === "shooting" ? "bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.5)]" :
                action === "shielding" ? "bg-sw-saber/20 shadow-[0_0_20px_hsl(45_90%_55%/0.4)]" :
                action === "scanning" ? "bg-sw-holo/20 shadow-[0_0_25px_hsl(190_80%_55%/0.4)]" :
                "bg-sw-saber/10"
              }`} />
              
              {/* Droid body */}
              <svg width="32" height="32" viewBox="0 0 32 32" className="relative z-10">
                {/* Torso */}
                <rect x="10" y="8" width="12" height="14" rx="2" fill="none" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.9"/>
                {/* Head */}
                <circle cx="16" cy="5" r="4" fill="none" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.9"/>
                {/* Eye */}
                <circle cx="16" cy="5" r="1.5" fill={action === "scanning" ? "hsl(190 80% 55%)" : action === "shooting" ? "#ef4444" : "hsl(45 90% 55%)"} className="transition-colors duration-200"/>
                {/* Legs */}
                <line x1="12" y1="22" x2="10" y2="30" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.7"/>
                <line x1="20" y1="22" x2="22" y2="30" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.7"/>
                {/* Arm / blaster */}
                <line x1="10" y1="12" x2="4" y2="16" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.7"/>
                <line x1="22" y1="12" x2="28" y2="16" stroke="hsl(45 90% 55%)" strokeWidth="1.5" opacity="0.7"/>
                {action === "shielding" && <circle cx="16" cy="14" r="14" fill="none" stroke="hsl(45 90% 55%)" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 2"/>}
              </svg>

              {/* Blaster bolts */}
              {action === "shooting" && (
                <>
                  <div className="absolute -top-8 left-1/2 w-0.5 h-4 bg-red-500 rounded-full animate-pulse" style={{transform: "translateX(-50%)"}} />
                  <div className="absolute -top-14 left-1/2 w-0.5 h-3 bg-red-400/60 rounded-full animate-pulse" style={{transform: "translateX(-50%)", animationDelay: "0.1s"}} />
                </>
              )}
            </div>
          </div>

          {/* Controls panel */}
          <div className="w-full md:w-48 border-t md:border-t-0 md:border-l border-sw-saber/15 bg-sw-void/60 p-3 flex flex-col gap-3">
            {/* D-pad */}
            <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
              <div />
              <button onClick={() => move("up")} className="droid-btn"><ChevronUp className="w-4 h-4" /></button>
              <div />
              <button onClick={() => move("left")} className="droid-btn"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={reset} className="droid-btn !border-sw-holo/30 text-sw-holo"><RotateCcw className="w-3 h-3" /></button>
              <button onClick={() => move("right")} className="droid-btn"><ChevronRight className="w-4 h-4" /></button>
              <div />
              <button onClick={() => move("down")} className="droid-btn"><ChevronDown className="w-4 h-4" /></button>
              <div />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-1.5">
              <button onClick={() => doAction("shooting", "Blaster fire — PEW PEW!")} className="droid-action-btn text-red-400 border-red-500/30 hover:bg-red-500/10">
                <Crosshair className="w-3.5 h-3.5" /> FIRE
              </button>
              <button onClick={() => doAction("shielding", "Deploying droideka shield...")} className="droid-action-btn text-sw-saber border-sw-saber/30 hover:bg-sw-saber/10">
                <Shield className="w-3.5 h-3.5" /> SHIELD
              </button>
              <button onClick={() => doAction("scanning", "Scanning for Republic troops...")} className="droid-action-btn text-sw-holo border-sw-holo/30 hover:bg-sw-holo/10">
                <Zap className="w-3.5 h-3.5" /> SCAN
              </button>
            </div>

            {/* Coordinates */}
            <div className="mt-auto text-center font-mono text-[9px] text-sw-steel/50 tracking-wider">
              X:{Math.round(x)} Y:{Math.round(y)} R:{rotation}°
            </div>
          </div>
        </div>

        {/* Log feed */}
        <div className="border-t border-sw-saber/15 bg-sw-void/80 px-4 py-2 max-h-24 overflow-y-auto">
          {logs.map((log, i) => (
            <p key={i} className="font-mono text-[10px] text-sw-holo/70 leading-relaxed tracking-wider">{log}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DroidSimulator;
