// src/App.tsx
import React, { useEffect, useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import ApiKeyInput from "./components/ApiKeyInput";
import Home from "./Home";
import ProfileForm, { OrgProfile } from "./ProfileForm";

type View = "home" | "dashboard" | "finder" | "manage" | "profile";

const App: React.FC = () => {
  const [view, setView] = useState<View>("home");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [profile, setProfile] = useState<OrgProfile | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("orgProfile");
    if (raw) setProfile(JSON.parse(raw));
  }, []);

  const handleSaveProfile = (data: OrgProfile) => {
    setProfile(data);
    localStorage.setItem("orgProfile", JSON.stringify(data));
    setView("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white bg-brand-primary p-4 rounded">
          My Gigs Grants Assist
        </h1>
        <nav className="flex flex-wrap gap-3 mt-4">
          <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={() => setView("home")}>Homepage</button>
          <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={() => setView("dashboard")}>Dashboard</button>
          <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={() => setView("profile")}>Profile</button>
          <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={() => setView("finder")}>Finder</button>
          <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={() => setView("manage")}>Manage Grants</button>
        </nav>
      </header>

      <main className="bg-white shadow rounded p-4">
        {view === "home" && (
          <Home
            profilePresent={!!profile}
            onCreateProfile={() => setView("profile")}
            onGoDashboard={() => setView("dashboard")}
            onShowApiKey={() => setShowApiKeyInput(true)}
          />
        )}
        {view === "dashboard" && <Dashboard />}
        {view === "profile" && (
          <ProfileForm
            initial={profile || undefined}
            onSave={handleSaveProfile}
            onCancel={() => setView("dashboard")}
          />
        )}
        {view === "finder" && <Finder />}
        {view === "manage" && <ManageGrants />}
      </main>

      {showApiKeyInput && (
        <ApiKeyInput
          onSave={() => setShowApiKeyInput(false)}
          onCancel={() => setShowApiKeyInput(false)}
        />
      )}
    </div>
  );
};

export default App;