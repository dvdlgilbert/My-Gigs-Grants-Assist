import React from "react";
import "./Finder.css";

export default function Finder() {
  return (
    <div className="finder-container">
      <h2>Grant Finder</h2>
      <form>
        <input type="text" placeholder="Search grants..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}