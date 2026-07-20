import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./lib/i18n";
import Index from "./pages/Index";
import JapanBridge from "./pages/JapanBridge";
import NotFound from "./pages/NotFound";

const App = () => (
  <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/japan-bridge" element={<JapanBridge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </LangProvider>
);

export default App;
