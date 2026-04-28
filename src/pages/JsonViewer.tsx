import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Toolbar from "@/components/Toolbar";

type Mode = "paste" | "fetch";

const tryFormat = (text: string): { ok: boolean; out: string; err?: string } => {
  if (!text.trim()) return { ok: true, out: "" };
  try {
    return { ok: true, out: JSON.stringify(JSON.parse(text), null, 2) };
  } catch (e: any) {
    return { ok: false, out: text, err: e?.message || "Invalid JSON" };
  }
};

const JsonViewer = () => {
  const [mode, setMode] = useState<Mode>("paste");
  const [raw, setRaw] = useState("");

  // fetch state
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const formatted = useMemo(() => tryFormat(raw), [raw]);

  const highlighted = useMemo(() => {
    if (!formatted.out) return "";
    try {
      return hljs.highlight(formatted.out, { language: "json", ignoreIllegals: true }).value;
    } catch {
      return formatted.out;
    }
  }, [formatted.out]);

  const sendRequest = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setStatus("");
    try {
      const h: Record<string, string> = {};
      headers
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((l) => {
          const i = l.indexOf(":");
          if (i > 0) h[l.slice(0, i).trim()] = l.slice(i + 1).trim();
        });
      const init: RequestInit = { method, headers: h };
      if (method !== "GET" && method !== "HEAD" && body.trim()) init.body = body;
      const res = await fetch(url, init);
      setStatus(`${res.status} ${res.statusText}`);
      const txt = await res.text();
      try {
        setRaw(JSON.stringify(JSON.parse(txt), null, 2));
      } catch {
        setRaw(txt);
      }
    } catch (e: any) {
      setStatus("error");
      setRaw(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  const tabBtn = (m: Mode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
        mode === m
          ? "bg-neutral-700 text-white"
          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
      }`}
    >
      {label}
    </button>
  );

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
        {/* Left: input */}
        <div className="w-1/2 flex flex-col border-r border-neutral-800 min-w-0">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-neutral-800/80 border-b border-neutral-800 text-xs shrink-0">
            {tabBtn("paste", "Paste JSON")}
            {tabBtn("fetch", "API Request")}
          </div>

          {mode === "paste" ? (
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="Paste JSON here…"
              spellCheck={false}
              className="flex-1 w-full p-3 bg-neutral-950 font-mono text-sm text-neutral-200 outline-none resize-none border-0"
              style={{ caretColor: "#fff" }}
            />
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-neutral-800 shrink-0">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-md text-xs text-neutral-200 px-2 py-1 outline-none"
                >
                  {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendRequest()}
                  placeholder="https://api.example.com/endpoint"
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md text-xs text-neutral-200 px-2 py-1 outline-none font-mono min-w-0"
                />
                <button
                  onClick={sendRequest}
                  disabled={loading}
                  className="px-3 py-1 rounded-md text-xs bg-neutral-200 text-neutral-900 hover:bg-white disabled:opacity-50 transition-colors"
                >
                  {loading ? "…" : "Send"}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-px bg-neutral-800 border-b border-neutral-800 shrink-0" style={{ height: "40%" }}>
                <div className="flex flex-col bg-neutral-950 min-h-0">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-500 shrink-0">
                    Headers (one per line: Key: Value)
                  </div>
                  <textarea
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    placeholder="Authorization: Bearer …"
                    spellCheck={false}
                    className="flex-1 w-full px-3 pb-2 bg-neutral-950 font-mono text-xs text-neutral-200 outline-none resize-none border-0"
                  />
                </div>
                <div className="flex flex-col bg-neutral-950 min-h-0">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-500 shrink-0">
                    Body
                  </div>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='{"key":"value"}'
                    spellCheck={false}
                    disabled={method === "GET" || method === "HEAD"}
                    className="flex-1 w-full px-3 pb-2 bg-neutral-950 font-mono text-xs text-neutral-200 outline-none resize-none border-0 disabled:opacity-40"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col min-h-0">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-500 shrink-0 flex items-center justify-between">
                  <span>Raw response</span>
                  {status && <span className="font-mono normal-case text-neutral-400">{status}</span>}
                </div>
                <textarea
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  placeholder="Response will appear here…"
                  spellCheck={false}
                  className="flex-1 w-full px-3 pb-3 bg-neutral-950 font-mono text-xs text-neutral-200 outline-none resize-none border-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: formatted */}
        <div className="w-1/2 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-800/80 border-b border-neutral-800 text-xs shrink-0">
            <span className="text-neutral-300">Formatted</span>
            <span className={`font-mono ${formatted.ok ? "text-neutral-500" : "text-rose-400"}`}>
              {raw.trim() ? (formatted.ok ? "json" : formatted.err) : ""}
            </span>
          </div>
          <pre
            className="flex-1 m-0 p-3 overflow-auto text-sm font-mono whitespace-pre text-neutral-200"
            dangerouslySetInnerHTML={{ __html: highlighted || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonViewer;
