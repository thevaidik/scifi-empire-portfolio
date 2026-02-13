import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Shield, Crosshair, RotateCcw, Radio, Swords, Eye, Volume2, VolumeX } from "lucide-react";
import B1DroidModel from "./B1DroidModel";

type BattleAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
  soundType: "blaster" | "shield" | "scan" | "march" | "roger" | "alert";
  quote: string;
  duration: number;
};

const ACTIONS: BattleAction[] = [
  { id: "fire", label: "FIRE", icon: <Crosshair className="w-4 h-4" />, colorClass: "text-red-400 border-red-500/30 hover:bg-red-500/10", soundType: "blaster", quote: "Blast them!", duration: 1200 },
  { id: "shield", label: "SHIELD", icon: <Shield className="w-4 h-4" />, colorClass: "text-primary border-primary/30 hover:bg-primary/10", soundType: "shield", quote: "Shields up!", duration: 1500 },
  { id: "scan", label: "SCAN", icon: <Eye className="w-4 h-4" />, colorClass: "text-accent border-accent/30 hover:bg-accent/10", soundType: "scan", quote: "Scanning sector...", duration: 2000 },
  { id: "march", label: "MARCH", icon: <Swords className="w-4 h-4" />, colorClass: "text-primary border-primary/30 hover:bg-primary/10", soundType: "march", quote: "Roger roger, moving out.", duration: 1800 },
  { id: "roger", label: "ROGER", icon: <Radio className="w-4 h-4" />, colorClass: "text-primary border-primary/30 hover:bg-primary/10", soundType: "roger", quote: "Roger roger!", duration: 1000 },
  { id: "alert", label: "JEDI!", icon: <Radio className="w-4 h-4" />, colorClass: "text-red-400 border-red-500/30 hover:bg-red-500/10", soundType: "alert", quote: "It's a Jedi!", duration: 1500 },
];

const useDroidSounds = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const getCtx = () => { if (!ctxRef.current) ctxRef.current = new AudioContext(); return ctxRef.current; };

  const synth = useCallback((type: BattleAction["soundType"]) => {
    if (muted) return;
    const ctx = getCtx();
    const now = ctx.currentTime;
    const make = (freq: number, t: number, dur: number, wave: OscillatorType = "sawtooth", vol = 0.15) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = wave; o.frequency.setValueAtTime(freq, now + t);
      o.frequency.exponentialRampToValueAtTime(freq * 0.3, now + t + dur);
      g.gain.setValueAtTime(vol, now + t);
      g.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
      o.connect(g).connect(ctx.destination); o.start(now + t); o.stop(now + t + dur);
    };
    if (type === "blaster") { make(800, 0, 0.15); make(900, 0.25, 0.15); }
    else if (type === "shield") { make(200, 0, 0.8, "sine", 0.12); }
    else if (type === "scan") { [0,0.3,0.6,0.9].forEach((d,i) => make(1200+i*200, d, 0.15, "sine", 0.1)); }
    else if (type === "march") { [0,0.25,0.5,0.75,1,1.25].forEach((d,i) => make(i%2?100:120, d, 0.1, "square", 0.08)); }
    else if (type === "roger") { [0,0.12,0.3,0.42].forEach((d,i) => make(i<2?440:520, d, 0.08, "square", 0.06)); }
    else if (type === "alert") { [0,0.4,0.8].forEach(d => make(700, d, 0.3, "sawtooth", 0.12)); }
  }, [muted]);

  return { synth, muted, setMuted };
};

const DroidSimulator = () => {
  const [action, setAction] = useState<string | null>(null);
  const [quote, setQuote] = useState("Awaiting orders...");
  const { synth, muted, setMuted } = useDroidSounds();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const exec = useCallback((a: BattleAction) => {
    if (action) return;
    setAction(a.id);
    setQuote(a.quote);
    synth(a.soundType);
    timerRef.current = setTimeout(() => { setAction(null); setQuote("Standing by."); }, a.duration);
  }, [action, synth]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setAction(null);
    setQuote("Awaiting orders...");
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section className="mb-16">
      <h2 className="section-title">DROID SIMULATOR</h2>

      <div className="sw-card p-0 max-w-3xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-primary/15 bg-primary/5">
          <span className="font-mono text-[10px] text-primary tracking-[0.2em]">◆ B1 BATTLE DROID — CIS PROTOTYPE</span>
          <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-primary transition-colors">
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* 3D Canvas */}
          <div className="flex-1 relative" style={{ height: 400 }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
              style={{ backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`, backgroundSize: "30px 30px" }}
            />
            <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[3, 5, 3]} intensity={0.8} color="#ffd080" />
              <directionalLight position={[-2, 3, -1]} intensity={0.3} color="#6699cc" />
              <pointLight position={[0, 0, 2]} intensity={0.4} color="#c4a46a" />
              <Suspense fallback={null}>
                <B1DroidModel action={action} />
                <Environment preset="night" />
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate={!action}
                autoRotateSpeed={0.5}
              />
              {/* Ground plane */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
                <circleGeometry args={[2, 32]} />
                <meshStandardMaterial color="#c4a46a" transparent opacity={0.05} />
              </mesh>
            </Canvas>

            {/* Quote overlay */}
            <div className="absolute bottom-3 left-0 right-0 text-center z-20">
              <p className={`font-mono text-xs tracking-wider ${action ? "text-primary" : "text-muted-foreground/50"}`}>
                "{quote}"
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full md:w-44 border-t md:border-t-0 md:border-l border-primary/15 bg-background/40 p-3 flex flex-col gap-1.5">
            {ACTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => exec(a)}
                disabled={!!action}
                className={`flex items-center gap-2.5 px-3 py-2 rounded border text-left transition-all text-xs font-display tracking-[0.1em]
                  ${a.colorClass}
                  ${action === a.id ? "bg-current/10 scale-[1.02]" : ""}
                  ${action && action !== a.id ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {a.icon} {a.label}
              </button>
            ))}
            <button onClick={reset} className="mt-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded border border-muted-foreground/20 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-[10px] font-mono tracking-wider">
              <RotateCcw className="w-3 h-3" /> RESET
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroidSimulator;
