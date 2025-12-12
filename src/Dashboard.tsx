import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Your saved grants will appear here.</p>
      <ul className="dashboard-list">
        <li>Example grant #1</li>
        <li>Example grant #2</li>
      </ul>
    </div>
  );
}