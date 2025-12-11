import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import GrantFinder from "./components/GrantFinder";
import ProjectWorkspace from "./components/ProjectWorkspace";
import ProfileForm from "./components/ProfileForm";
import Settings from "./components/Settings"; // ✅ new Settings component
import type { NonprofitProfile, GrantProject, AppView, GrantRecommendation } from "./types";

const App: React.FC = () => {
  const [profile, setProfile] = useState<NonprofitProfile | null>(null);
  const emptyProfile = {} as NonprofitProfile;

  const [projects, setProjects] = useState<GrantProject[]>([]);
  const [activeProject, setActiveProject] = useState<GrantProject | null>(null);

  const [view, setView] = useState<AppView>("DASHBOARD");

  // ✅ Persisted grant recommendations
  const [grants, setGrants] = useState<GrantRecommendation[]>(() => {
    const saved = localStorage.getItem("grant_results");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("grant_results", JSON.stringify(grants));
  }, [grants]);

  // ✅ Simple toggle flag for mock vs real mode
  const [useMock, setUseMock] = useState<boolean>(() => {
    const saved = localStorage.getItem("use_mock");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("use_mock", JSON.stringify(useMock));
  }, [useMock]);

  // --- Handlers ---
  const handleCreateProject = (title?: string, funder?: string) => {
    const newProject: GrantProject = {
      id: crypto.randomUUID(),
      grantTitle: title || "Untitled Project",
      funder: funder || "Unknown Funder",
      status: "Draft",
      proposal: `Draft proposal for ${profile?.orgName ?? "Unknown Org"} (Tax ID: ${profile?.taxId ?? "N/A"})\n\n`,
      lastEdited: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
    setView("DASHBOARD");
  };

  const handleOpenProject = (project: GrantProject) => {
    setActiveProject(project);
    setView("PROJECT");
  };

  const handleDeleteProject = (project: GrantProject) => {
    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    if (activeProject?.id === project.id) {
      setActiveProject(null);
    }
    setView("DASHBOARD");
  };

  const clearGrants = () => {
    setGrants([]);
    localStorage.removeItem("grant_results");
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <header className="bg-blue-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Nonprofit Grant Assistant
        </h1>
        <div className="flex items-center space-x-3">
          {/* ✅ Mock/Real toggle */}
          <button
            onClick={() => setUseMock((prev) => !prev)}
            className="bg-slate-200 px-3 py-1 rounded-md hover:bg-slate-300 text-sm"
          >
            Mode: <strong>{useMock ? "Mock" : "Real"}</strong>
          </button>
          {useMock && (
            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
              Use Mock Mode for Training
            </span>
          )}
          {/* ✅ Settings button in header */}
          <button
            onClick={() => setView("SETTINGS")}
            className="bg-slate-200 px-3 py-1 rounded-md hover:bg-slate-300 text-sm"
          >
            Settings
          </button>
        </div>
      </header>

      <main className="p-4">
        {/* Navigation */}
        <div className="flex flex-col space-y-2 mb-6">
          <button
            onClick={() => setView("DASHBOARD")}
            className="px-3 py-2 bg-slate-200 text-left rounded-md hover:bg-slate-300"
          >
            Dashboard
          </button>
          <button
            onClick={() => setView("PROFILE")}
            className="px-3 py-2 bg-slate-200 text-left rounded-md hover:bg-slate-300"
          >
            Nonprofit Profile
          </button>
          <button
            onClick={() => {
              if (!profile) {
                alert("⚠️ Please create a nonprofit profile before using Grant Finder.");
                setView("PROFILE");
              } else {
                setView("FINDER");
              }
            }}
            className="px-3 py-2 bg-slate-200 text-left rounded-md hover:bg-slate-300"
          >
            Grant Finder
          </button>
        </div>

        {/* Views */}
        {view === "DASHBOARD" && (
          <Dashboard
            projects={projects}
            onOpenProject={handleOpenProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {view === "PROFILE" && (
          <ProfileForm
            profile={profile ?? emptyProfile}
            onSave={(p) => {
              setProfile(p);
              setView("DASHBOARD");
            }}
            onBack={() => setView("DASHBOARD")}
          />
        )}

        {view === "FINDER" && profile && (
          <GrantFinder
            profile={profile}
            onCreateProject={handleCreateProject}
            grants={grants}
            setGrants={setGrants}
            useMock={useMock}
            onClear={clearGrants}
          />
        )}

        {view === "PROJECT" && activeProject && (
          <ProjectWorkspace
            project={activeProject}
            onClose={() => setView("DASHBOARD")}
            onUpdate={(updated) => {
              setProjects((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              );
              setActiveProject(updated);
            }}
          />
        )}

        {view === "SETTINGS" && (
          <Settings onBack={() => setView("DASHBOARD")} />
        )}
      </main>
    </div>
  );
};

export default App;
