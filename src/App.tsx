import React, { useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import "./App.css";
import "./Home.css";

interface AppProps {
  initialView: string;
}

function App({ initialView }: AppProps) {
  const validViews = ["home", "finder", "dashboard", "mockup", "profile", "tools"];

  const normalizeView = (view: string) => {
    const v = view.toLowerCase();
    return validViews.includes(v) ? v : "home";
  };

  const [view, setView] = useState<string>(normalizeView(initialView));

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>My Gigs Grants Assist</h1>
        <nav>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("finder")}>Finder</button>
          <button onClick={() => setView("dashboard")}>Dashboard</button>
          <button onClick={() => setView("mockup")}>Mockup</button>
        </nav>
      </header>

      {/* Main content */}
      <main>
        {view === "home" && (
          <div className="home-container">
            <h2>Welcome to My Gigs Grants Assist</h2>
            <p>
              This is the Home view. Add onboarding, quick-start steps, and
              links to Finder and Dashboard.
            </p>

            {/* Two buttons below welcome text */}
            <div className="home-buttons">
              <button onClick={() => setView("profile")}>Profile</button>
              <button onClick={() => setView("tools")}>Manage Grants</button>
            </div>
          </div>
        )}

        {view === "finder" && <Finder />}
        {view === "dashboard" && <Dashboard />}
        {view === "mockup" && (
          <div className="home-container">
            <h2>Mockup training mode</h2>
            <p>Use Mockup for training. This mode is for demo flows and UI practice.</p>
          </div>
        )}
        {view === "profile" && <Profile />}
        {view === "tools" && (
          <div className="home-container">
            <h2>Tools Management</h2>
            <p>This will be the Manage Grants page (next phase).</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;