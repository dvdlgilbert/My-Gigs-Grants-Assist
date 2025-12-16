// src/Dashboard.tsx
import React, { useEffect, useState } from "react";

interface Grant {
  id: string;
  name: string;
  amount: string;
  description: string;
  status: "Draft" | "Submitted" | "Approved";
}

const Dashboard: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);

  const loadGrants = () => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      setGrants(JSON.parse(raw));
    } else {
      setGrants([]);
    }
  };

  useEffect(() => {
    loadGrants();
  }, []);

  const statusBadge = (status: Grant["status"]) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Draft":
        return `${base} bg-gray-300 text-gray-800`;
      case "Submitted":
        return `${base} bg-blue-300 text-blue-800`;
      case "Approved":
        return `${base} bg-green-300 text-green-800`;
      default:
        return base;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-gray-700">Overview of your saved and managed grants.</p>

      <button
        className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        onClick={loadGrants}
      >
        Refresh Grants
      </button>

      {grants.length === 0 ? (
        <p className="text-gray-500">No grants created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {grants.map((grant) => (
            <div key={grant.id} className="border rounded p-4 shadow">
              <h3 className="text-xl font-bold">{grant.name}</h3>
              <p className="text-gray-600">{grant.amount}</p>
              <p className="mt-2">{grant.description}</p>
              <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                Status: <span className={statusBadge(grant.status)}>{grant.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;