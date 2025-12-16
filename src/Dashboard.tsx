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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Grant["status"] | "All">("All");

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
        return `${base} bg-gray-500 text-white`;
      case "Submitted":
        return `${base} bg-blue-600 text-white`;
      case "Approved":
        return `${base} bg-green-600 text-white`;
      default:
        return base;
    }
  };

  // Apply search + filter
  const filteredGrants = grants.filter((grant) => {
    const matchesSearch =
      grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : grant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

      {/* Search + Filter controls */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <input
          type="text"
          placeholder="Search grants..."
          className="border rounded p-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded p-2 md:w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Grant["status"] | "All")}
        >
          <option value="All">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {filteredGrants.length === 0 ? (
        <p className="text-gray-500">No grants match your search/filter.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {filteredGrants.map((grant) => (
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