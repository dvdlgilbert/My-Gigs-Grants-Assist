// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import ApiKeyInput from "./components/ApiKeyInput";
import Home from "./Home";
import ProfileForm, { OrgProfile } from "./ProfileForm";
import GrantDetail from "./GrantDetail";

// Stubbed real API fetch function — replace with your actual API call
async function fetchRealGrants() {
  try {
    const response = await fetch("/api/grants"); // <-- adjust endpoint
    if (!response.ok) throw new Error("Failed to fetch grants");
    return await response.json();
  } catch (err) {
    console.error("Real API fetch failed:", err);
    return [];
  }
}

const AppShell: React.FC = () => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [profile, setProfile] = useState<OrgProfile | null>(null);
  const [mode, setMode] = useState<"mock" | "real">(
    (localStorage.getItem("mode") as "mock" | "real") || "mock"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("orgProfile");
    if (raw) setProfile(JSON.parse(raw));
  }, []);

  const handleSaveProfile = (data: OrgProfile) => {
    setProfile(data);
    localStorage.setItem("orgProfile", JSON.stringify(data));
    // After saving, go back to dashboard
    navigate("/dashboard");
  };

  const toggleMode = () => {
    const newMode = mode === "mock" ? "real" : "mock";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white bg-brand-primary p-4 rounded">
          My Gigs Grants Assist
        </h1>
        <nav className="flex flex-wrap gap-3 mt-4">
          <Link to="/home" className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Homepage</Link>
          <Link to="/dashboard" className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Dashboard</Link>
          <Link to="/profile" className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Profile</Link>
          <Link to="/finder" className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Finder</Link>
          <Link to="/manage" className="px-4 py-2 bg-white border rounded hover:bg-gray-50">Manage Grants</Link>
          <button
            className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
            onClick={toggleMode}
          >
            {mode === "mock" ? "Switch to Real Mode" : "Switch to Mock Mode"}
          </button>
        </nav>
      </header>

      <main className="bg-white shadow rounded p-4">
        <Routes>
          {/* Default route goes to Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/home"
            element={
              <Home
                profilePresent={!!profile}
                onGoDashboard={() => navigate("/dashboard")}
                onShowApiKey={() => setShowApiKeyInput(true)}
                onGoProfile={() => navigate("/profile")}
              />
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/profile"
            element={
              <ProfileForm
                initial={profile || undefined}
                onSave={handleSaveProfile}
                onCancel={() => navigate("/dashboard")}
              />
            }
          />

          <Route path="/finder" element={<Finder />} />
          <Route path="/manage" element={<ManageGrants />} />

          {/* Grant detail view (Step 4) */}
          <Route path="/grant/:id" element={<GrantDetail />} />

          {/* Fallback for unknown routes */}
          <Route
            path="*"
            element={
              <div className="p-6">
                <p className="text-red-600 font-semibold">Page not found.</p>
                <div className="mt-4 flex gap-3">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    to="/manage"
                    className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
                  >
                    Go to Manage Grants
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
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

const App: React.FC = () => (
  <Router>
    <AppShell />
  </Router>
);

export default App;