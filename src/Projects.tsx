import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

interface Project {
  id: number;
  title: string;
  funder: string;
}

export default function Projects({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "Community Outreach Program", funder: "Local Foundation" },
    { id: 2, title: "Youth Education Initiative", funder: "National Grant Fund" },
  ]);

  const handleOpen = (id: number) => {
    // Later we can pass the project ID into ProjectWorkspace
    onNavigate("workspace");
  };

  const handleDelete = (id: number) => {
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
            title={project.title}
            funder={project.funder}
            onOpen={() => handleOpen(project.id)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
}