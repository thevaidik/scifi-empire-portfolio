import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DiffChecker from "./pages/DiffChecker";
import JsonViewer from "./pages/JsonViewer";
import ApiTester from "./pages/ApiTester";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tools/diff" element={<DiffChecker />} />
        <Route path="/tools/json" element={<JsonViewer />} />
        <Route path="/tools/api" element={<ApiTester />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Analytics />
  </>
);

export default App;
