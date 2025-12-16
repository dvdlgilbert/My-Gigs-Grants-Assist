// src/GrantDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AIHelper from "./AIHelper";

interface Grant {
  id: string;
  name: string;
  amount: string;
  description: string;
  status: "Draft" | "Submitted" | "Approved";
}

const GrantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const raw = localStorage.getItem("grants");
  const grants: Grant[] = raw ? JSON.parse(raw) : [];
  const grant = grants.find((g) => g.id === id);

  const statusBadge = (status: Grant["status"]) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Draft":
        return `${base} bg-gray-500 text-white`;
      case "Submitted":
        return `${base} bg-blue-600 text-white`;
      case "Approved":
        return `${base} bg-green-600 text-white`;
      default:
        return base;
    }
  };

  if (!grant) {
    return (
      <div className="p-6">
        <p className="text-red-600">Grant not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-brand-primary text-white rounded"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">{grant.name}</h2>
      <p className="text-gray-600">{grant.amount}</p>
      <p className="mt-2">{grant.description}</p>
      <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
        Status: <span className={statusBadge(grant.status)}>{grant.status}</span>
      </p>

      {/* AI Write Assist */}
      {grant.status === "Draft" && (
        <div className="mt-4">
          <AIHelper
            grant={grant}
            onApply={(newText) => {
              const updated = { ...grant, description: newText };
              const updatedList = grants.map((g) =>
                g.id === grant.id ? updated : g
              );
              localStorage.setItem("grants", JSON.stringify(updatedList));
              navigate(0); // reload detail view
            }}
          />
        </div>
      )}

      {/* Submit button only for Draft */}
      {grant.status === "Draft" && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            const updated = { ...grant, status: "Submitted" };
            const updatedList = grants.map((g) =>
              g.id === grant.id ? updated : g
            );
            localStorage.setItem("grants", JSON.stringify(updatedList));
            navigate(0); // reload detail view
          }}
        >
          Submit Grant
        </button>
      )}

      <button
        className="mt-6 px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default GrantDetail;