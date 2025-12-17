// src/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Grant {
  id: string;
  title?: string;
  description?: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

const Dashboard: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("grants");
      if (raw) {
        setGrants(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to parse grants:", err);
      setGrants([]);
    }
  }, []);

  const countByStatus = (status: Grant["status"]) =>
    grants.filter((g) => g.status?.toLowerCase() === status).length;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded bg-gray-50">
          <p className="font-semibold">Draft Grants</p>
          <p>{countByStatus("draft")}</p>
        </div>
        <div className="p-4 border rounded bg-gray-50">
          <p className="font-semibold">Submitted Grants</p>
          <p>{countByStatus("submitted")}</p>
        </div>
        <div className="p-4 border rounded bg-gray-50">
          <p className="font-semibold">Approved Grants</p>
          <p>{countByStatus("approved")}</p>
        </div>
        <div className="p-4 border rounded bg-gray-50">
          <p className="font-semibold">Rejected Grants</p>
          <p>{countByStatus("rejected")}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/manage")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go to Manage Grants
        </button>
      </div>
    </div>
  );
};

export default Dashboard;