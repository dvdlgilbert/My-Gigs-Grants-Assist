import React, { useState, useEffect } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Tools from "./Tools";
import Projects from "./Projects";
import ProjectWorkspace from "./components/ProjectWorkspace";
import ManageGrants from "./ManageGrants"; // ✅ new page
import ApiKeyInput from "./components/ApiKeyInput"; // ✅ import API Key component
import type { GrantProject } from "./types";
import "./App.css";
import "./Home.css";

interface AppProps {
  initialView: string;
}

function App({ initialView }: AppProps) {
  const validViews = [
    "home",
    "finder",
    "dashboard",
    "mockup",
    "profile",
    "tools",
    "projects",
    "workspace",
    "managegrants", // ✅ new view
  ];

  const normalizeView = (view: string) => {
    const v = view.toLowerCase();
    return validViews.includes(v) ? v : "home";
  };

  const [view, setView] = useState<string>(normalizeView(initialView));
  const [selectedProject, setSelectedProject] = useState<GrantProject | null>(null);

  // ✅ Track mock/real mode in localStorage
  const [useRealApi, setUseRealApi] = useState<boolean>(() => {
    const saved = localStorage.getItem("useRealApi");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("useRealApi", String(useRealApi));
  }, [useRealApi]);

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <h1>My Gigs Grants Assist</h1>
        <nav>
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("finder")}>Finder</button>
          <button onClick={() => setView("dashboard")}>Dashboard</button>
          <button onClick={() => setView("mockup")}>API Key</button> {/* ✅ renamed */}
          <button onClick={() => setView("managegrants")}>Manage Grants</button> {/* ✅ new button */}
        </nav>
      </header>

      {/* Main content */}
      <main>
        {view === "home" && (
          <>
            <div className="home-container">
              <h2>Welcome to My Gigs Grants Assist</h2>
              <p>
                This is the Home view. Add onboarding, quick-start steps, and links to Finder and Dashboard.
              </p>
            </div>

            <div className="home-buttons">
              <button onClick={() => setView("tools")}>Manage Grants (Legacy)</button>
              <button onClick={() => setView("profile")}>Profile</button>
            </div>
          </>
        )}

        {view === "finder" && <Finder />}
        {view === "dashboard" && <Dashboard />}
        {view === "mockup" && (
          <div className="home-container">
            <h2>Mockup Training Mode</h2>
            <p>Use Mockup for training. This mode is for demo flows and UI practice.</p>

            {/* ✅ New API Key section */}
            <section style={{ marginTop: "2rem" }}>
              <h3>API Key Management</h3>
              <ApiKeyInput />

              <p>
                Don’t have a key?{" "}
                <a
                  href="https://your-api-provider.com/get-key"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Obtain one here
                </a>
              </p>

              <p style={{ color: "red" }}>
                ⚠️ Warning: Switching to real mode will use live API calls. Costs or rate limits may apply.
              </p>

              <label>
                <input
                  type="checkbox"
                  checked={useRealApi}
                  onChange={(e) => setUseRealApi(e.target.checked)}
                />{" "}
                Use real API (uncheck for mock mode)
              </label>
            </section>
          </div>
        )}
        {view === "tools" && <Tools onNavigate={setView} />}
        {view === "profile" && <Profile onBack={() => setView("dashboard")} />}
        {view === "projects" && (
          <Projects onNavigate={setView} onSelect={setSelectedProject} />
        )}
        {view === "workspace" && selectedProject && (
          <ProjectWorkspace
            project={selectedProject}
            onClose={() => setView("projects")}
            onUpdate={(updated) => setSelectedProject(updated)}
          />
        )}
        {view === "managegrants" && <ManageGrants />} {/* ✅ new view */}
      </main>
    </div>
  );
}

export default App;