import React, { useState } from "react";
import type { GrantProject } from "./types";
import ProfileForm from "./components/ProfileForm";

interface ProjectsProps {
  onNavigate: React.Dispatch<React.SetStateAction<string>>;
  onSelect: React.Dispatch<React.SetStateAction<GrantProject | null>>;
}

const Projects: React.FC<ProjectsProps> = ({ onNavigate, onSelect }) => {
const STORAGE_KEY = "projects";
const [projects, setProjects] = useState<GrantProject[]>(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
});
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleCreateProject = () => {
    if (!newProjectTitle.trim()) return;

    const newProject: GrantProject = {
      id: Date.now().toString(),
      grantTitle: newProjectTitle,
      funder: "Unknown", // or collect from form
      status: "Draft",
      proposal: newProjectDescription,
      lastEdited: new Date().toISOString(),
};

const updatedProjects = [...projects, newProject];
  setProjects(updatedProjects);

  // ✅ Persist to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));

  setNewProjectTitle("");
  setNewProjectDescription("");
  setShowNewProjectForm(false);

  // Select the newly created project and navigate to workspace
  onSelect(newProject);
  onNavigate("workspace");
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>

      {/* Create New Project Button */}
      {!showNewProjectForm && (
        <button
          onClick={() => setShowNewProjectForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create New Project
        </button>
      )}

      {/* New Project Form */}
      {showNewProjectForm && (
        <div className="mt-4 border rounded-md p-4 bg-slate-50">
          <h3 className="text-lg font-semibold mb-2">New Project</h3>
          <input
            type="text"
            placeholder="Project Title"
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
          />
          <textarea
            placeholder="Project Description"
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Project
            </button>
            <button
              onClick={() => setShowNewProjectForm(false)}
              className="bg-slate-300 px-4 py-2 rounded-md hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Project List */}
      <div className="mt-6 space-y-3">
        {projects.length === 0 && (
          <p className="text-slate-600">No projects yet. Create one to get started.</p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-md p-3 hover:bg-slate-100 cursor-pointer"
            onClick={() => {
              onSelect(project);
              onNavigate("workspace");
            }}
          >
           <h4 className="font-bold">{project.grantTitle}</h4>
<p className="text-sm text-slate-700">{project.proposal}</p>
<p className="text-xs text-slate-500">
  Last Edited: {new Date(project.lastEdited).toLocaleString()}
</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;