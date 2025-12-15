// src/App.tsx
import React, { useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import ApiKeyInput from "./components/ApiKeyInput";

interface AppProps {
  initialView?: string;
}

const App: React.FC<AppProps> = ({ initialView }) => {
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
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold text-brand-primary mb-6">
        My Gigs Grants Assist
      </h1>

      {/* Navigation buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={() => setView("finder")}
        >
          Finder
        </button>
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={() => setView("dashboard")}
        >
          Dashboard
        </button>
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={() => setView("manage")}
        >
          Manage Grants
        </button>
      </div>

      {/* Render based on current view */}
      <div className="bg-white shadow rounded p-4">
        {view === "finder" && <Finder />}
        {view === "dashboard" && <Dashboard />}
        {view === "manage" && <ManageGrants />}
      </div>

      {/* API Key Section */}
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-2">API Key Management</h3>
        <button
          className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
          onClick={() => setShowApiKeyInput(true)}
        >
          Enter API Key
        </button>
        <p className="mt-4">
          Don’t have a key?{" "}
          <a
            href="https://your-api-provider.com/signup"
            target="_blank"
            rel="noreferrer"
            className="text-brand-primary underline hover:text-brand-dark"
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