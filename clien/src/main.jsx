import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { HelmetProvider } from "react-helmet-async"; // ✅ import HelmetProvider

createRoot(document.getElementById("root")).render(
  <HelmetProvider> {/* ✅ enables per-page SEO */}
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </HelmetProvider>
);
