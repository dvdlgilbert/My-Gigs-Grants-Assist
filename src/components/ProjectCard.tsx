import React from "react";

interface ProjectCardProps {
  title: string;
  funder: string;
  onOpen: () => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, funder, onOpen, onDelete }) => {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">Funder: {funder}</p>

      <div className="flex space-x-2 mt-3">
        <button
          onClick={onOpen}
          className="bg-brand-primary text-white px-3 py-1 rounded-md text-sm hover:bg-brand-secondary"
        >
          Open
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;