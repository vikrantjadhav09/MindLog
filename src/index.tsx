import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import { ErrorBoundary } from "./components/ErrorBoundary";
// import "./global.css";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);
