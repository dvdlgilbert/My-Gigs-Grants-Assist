import React from "react";
import "./Tools.css";

export default function Tools({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="tools-container">
      <h2>Manage Grants</h2>
      <p>Select a tool below to continue:</p>

      <div className="tools-buttons">
        <button onClick={() => onNavigate("finder")}>Grant Finder</button>
        <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button onClick={() => onNavigate("projects")}>Projects</button>
        <button onClick={() => onNavigate("aihelper")}>AI Helper</button>
      </div>
    </div>
  );
}