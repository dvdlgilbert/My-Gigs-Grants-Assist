import React, { useState } from "react";
import type { GrantProject } from "../types";

export interface ProjectWorkspaceProps {
  project: GrantProject;
  onClose?: () => void;
  onUpdate?: (updated: GrantProject) => void;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ project, onClose, onUpdate }) => {
  // Local state for editing
  const [proposal, setProposal] = useState(project.proposal);
  const [status, setStatus] = useState<GrantProject["status"]>(project.status);

  const handleSave = () => {
    const updated: GrantProject = {
      ...project,
      proposal,
      status,
      lastEdited: new Date().toISOString(),
    };
    if (onUpdate) onUpdate(updated); // push changes up to App/Dashboard
    if (onClose) onClose(); // close workspace after saving
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-md shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {project.grantTitle} — {project.funder}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded-md bg-slate-200 hover:bg-slate-300"
            >
              Close
            </button>
          )}
        </div>

        {/* Status selector */}
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as GrantProject["status"])}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Awarded">Awarded</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        {/* Proposal editor */}
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">Proposal</label>
          <textarea
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
            rows={10}
          />
        </div>

        {/* Last edited */}
        <p className="text-xs text-slate-500 mt-2">
          Last edited: {new Date(project.lastEdited).toLocaleString()}
        </p>

        {/* Save button */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm hover:bg-brand-secondary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;