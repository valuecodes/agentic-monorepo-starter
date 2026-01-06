import { createRoot } from "react-dom/client";

import "./globals.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<></>);
} else {
  console.error("Root element not found");
}
