import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";
import type { GrantProject } from "./types";

export default function Projects({
  onNavigate,
  onSelect,
}: {
  onNavigate: (view: string) => void;
  onSelect: (project: GrantProject) => void;
}) {
  const [projects, setProjects] = useState<GrantProject[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      // Seed with dummy projects if none exist
      const seed: GrantProject[] = [
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
      ];
      setProjects(seed);
      localStorage.setItem("projects", JSON.stringify(seed));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleOpen = (project: GrantProject) => {
    onSelect(project);
    onNavigate("workspace");
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