import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Determine initial view based on URL path
const path = window.location.pathname.replace("/", "") || "home";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App initialView={path} />
  </React.StrictMode>
);