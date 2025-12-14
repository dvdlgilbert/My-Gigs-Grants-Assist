import React, { useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import ApiKeyInput from "./components/ApiKeyInput";

interface AppProps {
  initialView?: string;
}

const App: React.FC<AppProps> = ({ initialView }) => {
  // Default to the provided initialView, or fallback to "finder"
  const [view, setView] = useState(initialView || "finder");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSaveApiKey = (key: string) => {
    console.log("API key saved:", key);
    setShowApiKeyInput(false);
  };

  const handleCancelApiKey = () => {
    setShowApiKeyInput(false);
  };

  return (
    <div className="App">
      <h1>My Gigs Grants Assist</h1>

      {/* Simple navigation buttons to switch views */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setView("finder")}>Finder</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={() => setView("manage")}>Manage Grants</button>
      </div>

      {/* Render based on current view */}
      {view === "finder" && <Finder />}
      {view === "dashboard" && <Dashboard />}
      {view === "manage" && <ManageGrants />}

      <section style={{ marginTop: "2rem" }}>
        <h3>API Key Management</h3>
        <button onClick={() => setShowApiKeyInput(true)}>Enter API Key</button>
        <p style={{ marginTop: "1rem" }}>
          Don’t have a key?{" "}
          <a
            href="https://your-api-provider.com/signup"
            target="_blank"
            rel="noreferrer"
          >
            Get one here
          </a>
        </p>
      </section>

      {showApiKeyInput && (
        <ApiKeyInput onSave={handleSaveApiKey} onCancel={handleCancelApiKey} />
      )}
    </div>
  );
};

export default App;