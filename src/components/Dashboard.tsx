import React from "react";
import ProjectCard from "./ProjectCard";
import type { GrantProject } from "../types";

interface DashboardProps {
  projects: GrantProject[];
  onOpenProject: (project: GrantProject) => void;
  onDeleteProject: (project: GrantProject) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onOpenProject, onDeleteProject }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Management Tools Section */}
      <div className="border rounded-md p-6 bg-slate-50 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Project Management Tools</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          <li>Create new projects from grant recommendations</li>
          <li>Open a project to edit proposals and track status</li>
          <li>Delete projects you no longer need</li>
          <li>Monitor deadlines and last edited timestamps</li>
          <li>Keep all your nonprofit grant work organized in one place</li>
        </ul>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="border rounded-md p-6 bg-white shadow-sm">
            <p className="text-slate-600">
              No active projects yet. Use Grant Finder to create one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.grantTitle}
                funder={project.funder}
                onOpen={() => onOpenProject(project)}
                onDelete={() => onDeleteProject(project)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;