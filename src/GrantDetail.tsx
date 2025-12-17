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
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      const grants: Grant[] = JSON.parse(raw);
      const found = grants.find((g) => g.id === id);
      if (found) setGrant(found);
    }
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

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

  const handleChange = (field: keyof Grant, value: string) => {
    if (grant && grant.status === "draft") {
      setIsDirty(true);
      saveGrant({ ...grant, [field]: value });
    }
  };

  const handleSaveDraft = () => {
    if (grant) {
      saveGrant({ ...grant, status: "draft" });
      setIsDirty(false);
    }
  };

  const handleSubmit = () => {
    if (grant) {
      saveGrant({ ...grant, status: "submitted" });
      setIsDirty(false);
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

  const handleAIWriteAssist = () => {
    if (grant && grant.status === "draft") {
      const aiSuggestion =
        "This grant proposal emphasizes measurable community impact and sustainable outcomes.";
      saveGrant({
        ...grant,
        description: grant.description
          ? grant.description + " " + aiSuggestion
          : aiSuggestion,
      });
      setIsDirty(true);
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Do you want to leave without saving?"
      );
      if (!confirmLeave) return;
    }
    navigate("/manage");
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
      <h2 className="text-2xl font-bold mb-4">
        {grant.title || "(Untitled Grant)"}
      </h2>
      <p className="mb-4 font-semibold">Status: {grant.status}</p>

      {grant.status === "draft" && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              value={grant.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              value={grant.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full border rounded px-2 py-1"
              rows={5}
            />
            <button
              onClick={handleAIWriteAssist}
              className="mt-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              AI Write Assist
            </button>
          </div>
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="ml-2 px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          >
            Mark as Submitted
          </button>
        </div>
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
        <p className="text-green-700 font-semibold">
          ✅ This grant has been approved.
        </p>
      )}

      {grant.status === "rejected" && (
        <p className="text-red-700 font-semibold">
          ❌ This grant has been rejected.
        </p>
      )}

      <div className="mt-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Manage Grants
        </button>
      </div>
    </div>
  );
};

export default GrantDetail;