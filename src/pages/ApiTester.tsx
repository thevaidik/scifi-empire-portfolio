import { useMemo, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Toolbar from "@/components/Toolbar";

const ApiTester = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [raw, setRaw] = useState("");
  const [isJson, setIsJson] = useState(false);

  const highlighted = useMemo(() => {
    if (!raw) return "";
    if (!isJson) return raw;
    try {
      return hljs.highlight(raw, { language: "json", ignoreIllegals: true }).value;
    } catch {
      return raw;
    }
  }, [raw, isJson]);

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
        setIsJson(true);
      } catch {
        setRaw(txt);
        setIsJson(false);
      }
    } catch (e: any) {
      setStatus("error");
      setRaw(String(e?.message || e));
      setIsJson(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-neutral-950 text-neutral-300 overflow-hidden"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif',
      }}
    >
      <Toolbar />

      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-neutral-800 shrink-0">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md text-base text-neutral-200 px-2.5 py-2 outline-none"
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
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-md text-base text-neutral-200 px-3 py-2 outline-none font-mono min-w-0"
        />
        <button
          onClick={sendRequest}
          disabled={loading}
          className="px-5 py-2 rounded-md text-base bg-neutral-200 text-neutral-900 hover:bg-white disabled:opacity-50 transition-colors"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>

      <div className="flex-1 flex min-h-0">
        <div className="w-1/2 flex flex-col border-r border-neutral-800 min-w-0">
          <div className="flex flex-col min-h-0" style={{ height: "50%" }}>
            <div className="px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0 text-neutral-300">
              Headers <span className="text-neutral-500">(Key: Value per line)</span>
            </div>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="Authorization: Bearer …"
              spellCheck={false}
              className="flex-1 w-full p-3 bg-neutral-950 font-mono text-base text-neutral-200 outline-none resize-none border-0"
            />
          </div>
          <div className="flex flex-col min-h-0 border-t border-neutral-800" style={{ height: "50%" }}>
            <div className="px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0 text-neutral-300">
              Body
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key":"value"}'
              spellCheck={false}
              disabled={method === "GET" || method === "HEAD"}
              className="flex-1 w-full p-3 bg-neutral-950 font-mono text-base text-neutral-200 outline-none resize-none border-0 disabled:opacity-40"
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col min-w-0">
          <div className="flex items-center justify-between px-3 py-2 bg-neutral-800/80 border-b border-neutral-800 text-sm shrink-0">
            <span className="text-neutral-300">Response</span>
            {status && <span className="font-mono text-sm text-neutral-400">{status}</span>}
          </div>
          <pre
            className="flex-1 m-0 p-3 overflow-auto text-base font-mono whitespace-pre-wrap text-neutral-200"
            dangerouslySetInnerHTML={{ __html: highlighted || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
