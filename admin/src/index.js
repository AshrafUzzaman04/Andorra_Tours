import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import App from "./App";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";

import "./i18n";

// Find the root DOM node
const container = document.getElementById("root");

// Create the root using createRoot
const root = createRoot(container);

// Render the app using the new API
root.render(
  <React.StrictMode>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </React.StrictMode>
);
