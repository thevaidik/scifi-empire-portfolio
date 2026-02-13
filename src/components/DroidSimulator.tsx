import { useState, useCallback, useRef, useEffect } from "react";
import { Shield, Crosshair, RotateCcw, Radio, Swords, Eye, Volume2, VolumeX } from "lucide-react";
import b1Droid from "@/assets/b1-battle-droid.png";

type BattleAction = {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  glowClass: string;
  droidQuote: string;
  soundType: "blaster" | "shield" | "scan" | "march" | "roger" | "alert";
  duration: number;
};

const BATTLE_ACTIONS: BattleAction[] = [
  {
    id: "fire",
    label: "OPEN FIRE",
    subtitle: "E-5 Blaster Rifle",
    icon: <Crosshair className="w-4 h-4" />,
    color: "text-red-400",
    glowClass: "shadow-[0_0_40px_rgba(239,68,68,0.4)]",
    droidQuote: "Blast them!",
    soundType: "blaster",
    duration: 1200,
  },
  {
    id: "shield",
    label: "SHIELD UP",
    subtitle: "Droideka Formation",
    icon: <Shield className="w-4 h-4" />,
    color: "text-primary",
    glowClass: "shadow-[0_0_40px_hsl(45_90%_55%/0.4)]",
    droidQuote: "Activating shields... roger roger.",
    soundType: "shield",
    duration: 1500,
  },
  {
    id: "scan",
    label: "RECON SCAN",
    subtitle: "Sector Sweep",
    icon: <Eye className="w-4 h-4" />,
    color: "text-accent",
    glowClass: "shadow-[0_0_40px_hsl(200_85%_55%/0.4)]",
    droidQuote: "Scanning for Republic troops...",
    soundType: "scan",
    duration: 2000,
  },
  {
    id: "march",
    label: "MARCH",
    subtitle: "Advance Position",
    icon: <Swords className="w-4 h-4" />,
    color: "text-primary",
    glowClass: "shadow-[0_0_40px_hsl(45_90%_55%/0.3)]",
    droidQuote: "Roger roger. Moving out.",
    soundType: "march",
    duration: 1800,
  },
  {
    id: "roger",
    label: "ROGER ROGER",
    subtitle: "Acknowledge Orders",
    icon: <Radio className="w-4 h-4" />,
    color: "text-primary",
    glowClass: "shadow-[0_0_30px_hsl(45_90%_55%/0.3)]",
    droidQuote: "Roger roger!",
    soundType: "roger",
    duration: 1000,
  },
  {
    id: "alert",
    label: "ALERT",
    subtitle: "Jedi Detected",
    icon: <Radio className="w-4 h-4" />,
    color: "text-red-400",
    glowClass: "shadow-[0_0_50px_rgba(239,68,68,0.5)]",
    droidQuote: "Uh oh... it's a Jedi!",
    soundType: "alert",
    duration: 1500,
  },
];

// Web Audio API sound synthesizer
const useDroidSounds = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  const playBlaster = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
    // Second shot
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(900, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.25, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(); osc2.stop(ctx.currentTime + 0.2);
    }, 250);
  }, []);

  const playShield = useCallback(() => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.5);
    osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.2);
  }, []);

  const playScan = useCallback(() => {
    const ctx = getCtx();
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.3;
      osc.frequency.setValueAtTime(1200 + i * 200, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.15);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.2);
    }
  }, []);

  const playMarch = useCallback(() => {
    const ctx = getCtx();
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      const t = ctx.currentTime + i * 0.25;
      osc.frequency.setValueAtTime(i % 2 === 0 ? 120 : 100, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.12);
    }
  }, []);

  const playRoger = useCallback(() => {
    const ctx = getCtx();
    // Robotic chirp sequence
    [0, 0.12, 0.3, 0.42].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      const t = ctx.currentTime + delay;
      osc.frequency.setValueAtTime(i < 2 ? 440 : 520, t);
      osc.frequency.exponentialRampToValueAtTime(i < 2 ? 380 : 460, t + 0.08);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.1);
    });
  }, []);

  const playAlert = useCallback(() => {
    const ctx = getCtx();
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      const t = ctx.currentTime + i * 0.4;
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.linearRampToValueAtTime(900, t + 0.2);
      osc.frequency.linearRampToValueAtTime(600, t + 0.4);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t); osc.stop(t + 0.4);
    }
  }, []);

  const play = useCallback((type: BattleAction["soundType"]) => {
    if (muted) return;
    const map = { blaster: playBlaster, shield: playShield, scan: playScan, march: playMarch, roger: playRoger, alert: playAlert };
    map[type]();
  }, [muted, playBlaster, playShield, playScan, playMarch, playRoger, playAlert]);

  return { play, muted, setMuted };
};

const DroidSimulator = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [quote, setQuote] = useState("Awaiting orders...");
  const [logs, setLogs] = useState<string[]>(["[SYS] B1-series Battle Droid online.", "[SYS] Separatist command link established."]);
  const { play, muted, setMuted } = useDroidSounds();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const executeAction = useCallback((action: BattleAction) => {
    if (activeAction) return;
    setActiveAction(action.id);
    setQuote(action.droidQuote);
    setLogs(prev => [...prev.slice(-5), `[${action.id.toUpperCase()}] ${action.droidQuote}`]);
    play(action.soundType);

    timeoutRef.current = setTimeout(() => {
      setActiveAction(null);
      setQuote("Roger roger. Standing by.");
    }, action.duration);
  }, [activeAction, play]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveAction(null);
    setQuote("Awaiting orders...");
    setLogs(["[SYS] B1 Battle Droid rebooted.", "[SYS] Awaiting commands..."]);
  }, []);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const currentAction = BATTLE_ACTIONS.find(a => a.id === activeAction);

  return (
    <section className="mb-16">
      <h2 className="section-title">DROID SIMULATOR</h2>
      <p className="text-center text-muted-foreground mb-1 font-body text-sm tracking-wide">
        Separatist B1 Battle Droid — Holographic Prototype Interface
      </p>
      <p className="text-center text-primary/50 mb-6 font-mono text-[10px] tracking-[0.15em]">
        ROGER ROGER • BASED ON OPEN-SOURCE ROBOTICS ALGORITHMS
      </p>

      <div className="sw-card p-0 max-w-3xl mx-auto overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-primary/15 bg-primary/5">
          <span className="font-mono text-[10px] text-primary tracking-[0.2em]">◆ HOLO-GARAGE UNIT — CIS PROTOTYPE</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-primary transition-colors">
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
              STATUS: <span className={activeAction ? "text-primary animate-pulse" : "text-green-400"}>{activeAction ? activeAction.toUpperCase() : "STANDBY"}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Holo display area */}
          <div className="flex-1 relative flex items-center justify-center py-8 px-4" style={{ minHeight: 380 }}>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Radial rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full border border-primary/[0.07]" />
              <div className="absolute w-72 h-72 rounded-full border border-primary/[0.04]" />
              <div className="absolute w-96 h-96 rounded-full border border-primary/[0.03]" />
            </div>

            {/* Scan line sweep */}
            {activeAction === "scan" && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-accent/40 to-transparent animate-[scanDown_2s_ease-in-out]" />
              </div>
            )}

            {/* Droid container */}
            <div className={`relative transition-all duration-500 ${activeAction === "march" ? "animate-bounce" : ""}`}>
              {/* Action glow behind droid */}
              <div className={`absolute -inset-6 rounded-full transition-all duration-500 blur-xl ${
                currentAction ? currentAction.glowClass.replace("shadow-", "bg-").replace(/\[.*\]/, "") : ""
              } ${activeAction === "fire" ? "bg-red-500/20" : 
                  activeAction === "shield" ? "bg-primary/15" :
                  activeAction === "scan" ? "bg-accent/15" :
                  activeAction === "alert" ? "bg-red-500/25" :
                  activeAction === "march" ? "bg-primary/10" :
                  activeAction === "roger" ? "bg-primary/10" : "bg-transparent"
              }`} />

              {/* Shield visual */}
              {activeAction === "shield" && (
                <div className="absolute -inset-8 rounded-full border-2 border-primary/30 animate-pulse z-10" />
              )}

              {/* Blaster bolts */}
              {activeAction === "fire" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                  <div className="w-1.5 h-8 bg-red-500 rounded-full animate-pulse opacity-90" />
                  <div className="w-1 h-6 bg-red-400/60 rounded-full animate-pulse" />
                </div>
              )}

              {/* Alert exclamation */}
              {activeAction === "alert" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-red-400 font-display text-2xl font-bold animate-pulse">!</div>
              )}

              {/* The B1 Droid image */}
              <img
                src={b1Droid}
                alt="B1 Battle Droid"
                className={`relative z-10 w-36 h-48 object-contain transition-all duration-500 
                  drop-shadow-[0_0_12px_hsl(45_90%_55%/0.3)]
                  ${activeAction === "fire" ? "brightness-110 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" : ""}
                  ${activeAction === "shield" ? "brightness-125 drop-shadow-[0_0_25px_hsl(45_90%_55%/0.5)]" : ""}
                  ${activeAction === "scan" ? "drop-shadow-[0_0_25px_hsl(200_85%_55%/0.5)] hue-rotate-[20deg]" : ""}
                  ${activeAction === "alert" ? "brightness-110 saturate-150" : ""}
                  ${activeAction === "march" ? "translate-y-1" : ""}
                `}
              />

              {/* Base platform glow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-3 bg-primary/20 rounded-full blur-md" />
            </div>

            {/* Droid speech bubble */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs text-center">
              <p className={`font-mono text-xs tracking-wider transition-all duration-300 ${
                activeAction ? "text-primary" : "text-muted-foreground/60"
              }`}>
                "{quote}"
              </p>
            </div>
          </div>

          {/* Action panel */}
          <div className="w-full md:w-56 border-t md:border-t-0 md:border-l border-primary/15 bg-background/40 p-4 flex flex-col gap-2">
            <p className="font-mono text-[9px] text-primary/60 tracking-[0.2em] mb-1 text-center">BATTLE ACTIONS</p>

            {BATTLE_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={() => executeAction(action)}
                disabled={!!activeAction}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded border transition-all duration-200 text-left
                  ${activeAction === action.id 
                    ? `${action.color} border-current bg-current/10 ${action.glowClass}` 
                    : `${action.color} border-current/20 hover:bg-current/5 hover:border-current/40`
                  }
                  ${activeAction && activeAction !== action.id ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <span className="shrink-0">{action.icon}</span>
                <div className="min-w-0">
                  <p className="font-display text-[11px] font-semibold tracking-[0.15em] leading-none mb-0.5">{action.label}</p>
                  <p className="font-mono text-[8px] text-muted-foreground/60 tracking-wider">{action.subtitle}</p>
                </div>
              </button>
            ))}

            <button
              onClick={reset}
              className="mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded border border-muted-foreground/20 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-[10px] font-mono tracking-wider"
            >
              <RotateCcw className="w-3 h-3" /> RESET UNIT
            </button>
          </div>
        </div>

        {/* Command log */}
        <div className="border-t border-primary/15 bg-background/60 px-5 py-2.5 max-h-20 overflow-y-auto">
          {logs.map((log, i) => (
            <p key={i} className="font-mono text-[10px] text-accent/60 leading-relaxed tracking-wider">{log}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DroidSimulator;
