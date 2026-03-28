import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import InstallPage from "./pages/InstallPage";
import ComponentsPage from "./pages/ComponentsPage";
import PriceFilterPage from "./pages/PriceFilterPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/installation" element={<InstallPage />} />
          <Route path="/docs/components" element={<ComponentsPage />} />
          <Route path="/docs/components/price-filter" element={<PriceFilterPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
