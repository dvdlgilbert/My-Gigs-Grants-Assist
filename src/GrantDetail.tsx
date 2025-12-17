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

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      const grants: Grant[] = JSON.parse(raw);
      const found = grants.find((g) => g.id === id);
      if (found) setGrant(found);
    }
  }, [id]);

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
      saveGrant({ ...grant, [field]: value });
    }
  };

  const handleSaveDraft = () => {
    if (grant) {
      // Just save, keep status as draft
      saveGrant({ ...grant, status: "draft" });
    }
  };

  const handleSubmit = () => {
    if (grant) {
      // Mark as formally submitted
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
    }
  };

  if (!grant) {
    return (
      <div className="p-6">
        <p className="text-red-600">Grant not found.</p>
        <button
          on