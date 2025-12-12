import React, { useState } from "react";
import "./App.css";

interface AppProps {
  initialView: string;
}

function App({ initialView }: AppProps) {
  // Normalize the initial view: only allow known views, else default to "home"
  const normalizeView = (view: string) => {
    const validViews = ["home", "finder", "dashboard"];
    return validViews.includes(view.toLowerCase()) ? view.toLowerCase() : "home";
  };

  const [view, setView] = useState(normalizeView(initialView));

  // Decide which CSS class to apply based on the view
  const getViewClass = () => {
    if (view === "finder") return "finder-view";
    if (view === "dashboard") return "dashboard-view";
    return "home-view";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Gigs Grants Assist</h1>

        {/* Navigation buttons */}
        <nav>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("finder")}>Finder</button>
          <button onClick={() => setView("dashboard")}>Dashboard</button>
        </nav>
      </header>

      {/* Main content area with dynamic background */}
      <main className={getViewClass()}>
        {view === "home" && <p>Welcome to the Home view!</p>}
        {view === "finder" && <p>Finder view loaded.</p>}
        {view === "dashboard" && <p>Dashboard view loaded.</p>}
      </main>
    </div>
  );
}

export default App;