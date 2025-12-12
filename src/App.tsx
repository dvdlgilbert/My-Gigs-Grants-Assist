import React, { useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import "./App.css";     // global styles
import "./Home.css";    // styles for Home view

interface AppProps {
  initialView: string;
}

function App({ initialView }: AppProps) {
  // Normalize the view so only valid options are used
  const normalizeView = (view: string) => {
    const validViews = ["home", "finder", "dashboard"];
    return validViews.includes(view.toLowerCase()) ? view.toLowerCase() : "home";
  };

  const [view, setView] = useState(normalizeView(initialView));

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>My Gigs Grants Assist</h1>
        <nav>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("finder")}>Finder</button>
          <button onClick={() => setView("dashboard")}>Dashboard</button>
        </nav>
      </header>

      {/* Main content */}
      <main>
        {view === "home" && (
          <div className="home-container">
            <h2>Welcome to My Gigs Grants Assist</h2>
            <p>This is the Home view. Add onboarding or instructions here.</p>
          </div>
        )}
        {view === "finder" && <Finder />}
        {view === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;