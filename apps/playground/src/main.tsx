import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Home } from "./home";

import "./globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Home />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
