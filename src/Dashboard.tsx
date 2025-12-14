import React, { useState, useEffect } from "react";
import type { GrantProject } from "./types";

const STORAGE_KEY = "projects";

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<GrantProject[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch {
        console.warn("Invalid projects JSON in localStorage");
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {projects.length === 0 ? (
        <p className="text-slate-600">
          No projects yet. Create one from the Manage Projects page.
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-md p-3 hover:bg-slate-100 cursor-pointer"
            >
              <h4 className="font-bold">{project.grantTitle}</h4>
              <p className="text-sm text-slate-700">
                Status: {project.status}
              </p>
              <p className="text-sm">{project.proposal}</p>
              <p className="text-xs text-slate-500">
                Last Edited: {new Date(project.lastEdited).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;