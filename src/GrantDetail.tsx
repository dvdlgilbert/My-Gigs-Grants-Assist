// src/GrantDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Grant {
  id: string;
  title: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

const GrantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [grant, setGrant] = useState<Grant | null>(null);

  // Load grant from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      const grants: Grant[] = JSON.parse(raw);
      const found = grants.find((g) => g.id === id);
      if (found) setGrant(found);
    }
  }, [id]);

  // Save grant back to localStorage
  const saveGrant = (updated: Grant) => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      const grants: Grant[] = JSON.parse(raw);
      const idx = grants.findIndex((g) => g.id === updated.id);
      if (idx !== -1) {
        grants[idx] = updated;
        localStorage.setItem("grants", JSON.stringify(grants));
      }
    }
    setGrant(updated);
  };

  const handleSubmit = () => {
    if (grant) {
      saveGrant({ ...grant, status: "submitted" });
    }
  };

  const handleApprove = () => {
    if (grant) {
      saveGrant({ ...grant, status: "approved" });
    }
  };

  const handleReject = () => {
    if (grant) {
      saveGrant({ ...grant, status: "rejected" });
    }
  };

  if (!grant) {
    return (
      <div className="p-6">
        <p className="text-red-600">Grant not found.</p>
        <button
          onClick={() => navigate("/manage")}
          className="mt-4 px-4 py-2 bg-brand-primary text-white rounded"
        >
          Back to Manage Grants
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{grant.title}</h2>
      <p className="mb-4">{grant.description}</p>
      <p className="mb-4 font-semibold">Status: {grant.status}</p>

      {/* Actions based on status */}
      {grant.status === "draft" && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        >
          Submit Grant
        </button>
      )}

      {grant.status === "submitted" && (
        <div className="flex gap-4">
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}

      {grant.status === "approved" && (
        <p className="text-green-700 font-semibold">✅ This grant has been approved.</p>
      )}

      {grant.status === "rejected" && (
        <p className="text-red-700 font-semibold">❌ This grant has been rejected.</p>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate("/manage")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Manage Grants
        </button>
      </div>
    </div>
  );
};

export default GrantDetail;