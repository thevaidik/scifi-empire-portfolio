import { useMemo, useState } from "react";
import { diffLines } from "diff";
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

const Editor = ({
  value,
  onChange,
  label,
  lang,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  lang: string;
}) => (
  <div className="flex-1 flex flex-col min-w-0">
    <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-t-md text-xs">
      <span className="text-neutral-300">{label}</span>
      <span className="text-neutral-500 font-mono">{lang}</span>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste content here…"
      spellCheck={false}
      className="flex-1 w-full p-3 bg-neutral-950 border border-t-0 border-neutral-700 rounded-b-md font-mono text-sm text-neutral-200 outline-none resize-none focus:border-neutral-500 min-h-[300px]"
    />
  </div>
);

const DiffChecker = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const lang = useMemo(() => detectLang(a || b), [a, b]);
  const diff = useMemo(() => (a || b ? diffLines(a, b) : []), [a, b]);

  const highlight = (code: string) => {
    if (lang === "plaintext") return code;
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true })
        .value;
    } catch {
      return code;
    }
  };

  return (
    <div
      className="min-h-screen bg-neutral-900 text-neutral-300"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif',
      }}
    >
      <Toolbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
          >
            Diff Checker
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Paste two snippets — language is auto-detected.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Editor value={a} onChange={setA} label="File 1" lang={lang} />
          <Editor value={b} onChange={setB} label="File 2" lang={lang} />
        </div>

        {diff.length > 0 && (
          <div className="border border-neutral-700 rounded-md overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-800 text-xs">
              <span className="text-neutral-300">Diff</span>
              <span className="text-neutral-500 font-mono">{lang}</span>
            </div>
            <pre className="bg-neutral-950 p-0 m-0 overflow-x-auto text-sm font-mono">
              {diff.map((part, i) => {
                const bg = part.added
                  ? "bg-emerald-900/30 border-l-2 border-emerald-500"
                  : part.removed
                  ? "bg-rose-900/30 border-l-2 border-rose-500"
                  : "border-l-2 border-transparent";
                const sign = part.added ? "+" : part.removed ? "−" : " ";
                const lines = part.value.replace(/\n$/, "").split("\n");
                return lines.map((line, j) => (
                  <div key={`${i}-${j}`} className={`flex ${bg}`}>
                    <span className="select-none w-6 text-center text-neutral-600 shrink-0">
                      {sign}
                    </span>
                    <code
                      className="flex-1 whitespace-pre px-2 py-0.5"
                      dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
                    />
                  </div>
                ));
              })}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiffChecker;
