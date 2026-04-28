import { useMemo, useState } from "react";
import { diffLines, type Change } from "diff";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Toolbar from "@/components/Toolbar";

const detectLang = (text: string): string => {
  if (!text.trim()) return "plaintext";
  try {
    const r = hljs.highlightAuto(text.slice(0, 2000), [
      "swift",
      "typescript",
      "javascript",
      "python",
      "json",
      "css",
      "html",
      "rust",
      "go",
      "java",
      "kotlin",
      "objectivec",
      "bash",
    ]);
    return r.language || "plaintext";
  } catch {
    return "plaintext";
  }
};

const Pane = ({
  value,
  onChange,
  label,
  lang,
  diff,
  side,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  lang: string;
  diff: Change[];
  side: "left" | "right";
}) => {
  const highlight = (code: string) => {
    if (lang === "plaintext" || !code) return code;
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch {
      return code;
    }
  };

  // Build per-line overlay: left shows context + removed; right shows context + added
  const lines: { type: "ctx" | "add" | "rem" | "empty"; text: string }[] = [];
  diff.forEach((part) => {
    const partLines = part.value.replace(/\n$/, "").split("\n");
    partLines.forEach((l) => {
      if (part.added && side === "right") lines.push({ type: "add", text: l });
      else if (part.added && side === "left") lines.push({ type: "empty", text: "" });
      else if (part.removed && side === "left") lines.push({ type: "rem", text: l });
      else if (part.removed && side === "right") lines.push({ type: "empty", text: "" });
      else if (!part.added && !part.removed) lines.push({ type: "ctx", text: l });
    });
  });

  const showOverlay = diff.length > 0 && value.length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 border-r border-neutral-800 last:border-r-0">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-800/80 border-b border-neutral-800 text-xs shrink-0">
        <span className="text-neutral-300">{label}</span>
        <span className="text-neutral-500 font-mono">{lang}</span>
      </div>
      <div className="relative flex-1 min-h-0">
        {showOverlay && (
          <pre className="absolute inset-0 m-0 p-3 overflow-auto text-sm font-mono pointer-events-none whitespace-pre">
            {lines.map((l, i) => {
              const bg =
                l.type === "add"
                  ? "bg-emerald-900/30"
                  : l.type === "rem"
                  ? "bg-rose-900/30"
                  : "";
              return (
                <div
                  key={i}
                  className={`${bg} min-h-[1.25rem]`}
                  dangerouslySetInnerHTML={{ __html: highlight(l.text) || "&nbsp;" }}
                />
              );
            })}
          </pre>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste content here…"
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-3 bg-neutral-950 font-mono text-sm text-neutral-200 outline-none resize-none border-0"
          style={{ color: showOverlay ? "transparent" : undefined, caretColor: "#fff", background: showOverlay ? "transparent" : undefined }}
        />
      </div>
    </div>
  );
};

const DiffChecker = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const lang = useMemo(() => detectLang(a || b), [a, b]);
  const diff = useMemo(() => (a || b ? diffLines(a, b) : []), [a, b]);

  return (
    <div
      className="h-screen flex flex-col bg-neutral-950 text-neutral-300 overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif',
      }}
    >
      <Toolbar />
      <div className="flex-1 flex min-h-0 bg-neutral-950">
        <Pane value={a} onChange={setA} label="File 1" lang={lang} diff={diff} side="left" />
        <Pane value={b} onChange={setB} label="File 2" lang={lang} diff={diff} side="right" />
      </div>
    </div>
  );
};

export default DiffChecker;
