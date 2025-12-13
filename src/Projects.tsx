import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";
import type { GrantProject } from "./types"; // adjust path if your types file is elsewhere

export default function Projects({ onNavigate, onSelect }: { onNavigate: (view: string) => void; onSelect: (project: GrantProject) => void }) {
  const [projects, setProjects] = useState<GrantProject[]>([
    {
      id: "1",
      grantTitle: "Community Outreach Program",
      funder: "Local Foundation",
      proposal: "",
      status: "Draft",
      lastEdited: new Date().toISOString(),
    },
    {
      id: "2",
      grantTitle: "Youth Education Initiative",
      funder: "National Grant Fund",
      proposal: "",
      status: "Draft",
      lastEdited: new Date().toISOString(),
    },
  ]);

  const handleOpen = (project: GrantProject) => {
    onSelect(project);       // store selected project in App state
    onNavigate("workspace"); // navigate to workspace view
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <p>Manage your grant projects below.</p>

      <div className="projects-list">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.grantTitle}
            funder={project.funder}
            onOpen={() => handleOpen(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
}