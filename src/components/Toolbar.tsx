import { Link, useLocation } from "react-router-dom";
import { GitCompare, Braces, Send } from "lucide-react";

const Toolbar = () => {
  const { pathname } = useLocation();
  const item = (to: string, icon: React.ReactNode, label: string) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors ${
          active
            ? "bg-neutral-700 text-white"
            : "text-neutral-400 hover:text-white hover:bg-neutral-800"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-neutral-900/90 backdrop-blur border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 h-9 flex items-center gap-1">
        <Link to="/" className="text-xs text-neutral-500 hover:text-white mr-2">
          ← home
        </Link>
        <div className="text-neutral-700 text-xs mr-1">tools:</div>
        {item("/tools/diff", <GitCompare size={12} />, "Diff Checker")}
        {item("/tools/json", <Braces size={12} />, "JSON Viewer")}
        {item("/tools/api", <Send size={12} />, "API Tester")}
      </div>
    </div>
  );
};

export default Toolbar;
