import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Toolbar from "@/components/Toolbar";

const tryFormat = (text: string): { ok: boolean; out: string; err?: string } => {
  if (!text.trim()) return { ok: true, out: "" };
  try {
    return { ok: true, out: JSON.stringify(JSON.parse(text), null, 2) };
  } catch (e: any) {
    return { ok: false, out: text, err: e?.message || "Invalid JSON" };
  }
};

const JsonViewer = () => {
  const [raw, setRaw] = useState("");

  const formatted = useMemo(() => tryFormat(raw), [raw]);

  const highlighted = useMemo(() => {
    if (!formatted.out) return "";
    try {
      return hljs.highlight(formatted.out, { language: "json", ignoreIllegals: true }).value;
    } catch {
      return formatted.out;
    }
  }, [formatted.out]);

  return (
    <div
      className="h-screen flex flex-col bg-neutral-950 text-neutral-300 overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif',
      }}
    >
      <Toolbar />
      <div className="flex-1 flex min-h-0">
        <div className="w-1/2 flex flex-col border-r border-neutral-800 min-w-0">
          <div className="px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0 text-neutral-300">
            Paste JSON
          </div>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="Paste JSON here…"
            spellCheck={false}
            className="flex-1 w-full p-3 bg-neutral-950 font-mono text-base text-neutral-200 outline-none resize-none border-0"
            style={{ caretColor: "#fff" }}
          />
        </div>
        <div className="w-1/2 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0">
            <span className="text-neutral-300">Formatted</span>
            <span className={`font-mono text-sm ${formatted.ok ? "text-neutral-500" : "text-rose-400"}`}>
              {raw.trim() ? (formatted.ok ? "json" : formatted.err) : ""}
            </span>
          </div>
          <pre
            className="flex-1 m-0 p-3 overflow-auto text-base font-mono whitespace-pre text-neutral-200"
            dangerouslySetInnerHTML={{ __html: highlighted || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonViewer;
