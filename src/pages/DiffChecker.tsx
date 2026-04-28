import { useMemo, useState } from "react";
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
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  lang: string;
}) => {
  const highlighted = useMemo(() => {
    if (!value) return "";
    if (lang === "plaintext") return value;
    try {
      return hljs.highlight(value, { language: lang, ignoreIllegals: true }).value;
    } catch {
      return value;
    }
  }, [value, lang]);

  const showOverlay = value.length > 0;

  return (
    <div className="flex-1 flex flex-col min-w-0 border-r border-neutral-800 last:border-r-0">
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0">
        <span className="text-neutral-300">{label}</span>
        <span className="text-neutral-500 font-mono">{lang}</span>
      </div>
      <div className="relative flex-1 min-h-0">
        {showOverlay && (
          <pre
            className="absolute inset-0 m-0 p-3 overflow-auto text-base font-mono pointer-events-none whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste content here…"
          spellCheck={false}
          className="absolute inset-0 w-full h-full p-3 bg-neutral-950 font-mono text-base text-neutral-200 outline-none resize-none border-0"
          style={{
            color: showOverlay ? "transparent" : undefined,
            caretColor: "#fff",
            background: showOverlay ? "transparent" : undefined,
          }}
        />
      </div>
    </div>
  );
};

const DiffChecker = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const lang = useMemo(() => detectLang(a || b), [a, b]);

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
        <Pane value={a} onChange={setA} label="File 1" lang={lang} />
        <Pane value={b} onChange={setB} label="File 2" lang={lang} />
      </div>
    </div>
  );
};

export default DiffChecker;
