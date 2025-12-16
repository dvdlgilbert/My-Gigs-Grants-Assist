// src/ManageGrants.tsx
import React, { useState, useEffect } from "react";

interface Grant {
  id: string;
  name: string;
  amount: string;
  description: string;
  status: "Draft" | "Submitted" | "Approved";
}

const ManageGrants: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [newGrant, setNewGrant] = useState<Grant>({
    id: "",
    name: "",
    amount: "",
    description: "",
    status: "Draft",
  });

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) setGrants(JSON.parse(raw));
  }, []);

  const saveGrants = (updated: Grant[]) => {
    setGrants(updated);
    localStorage.setItem("grants", JSON.stringify(updated));
  };

  const addGrant = () => {
    if (!newGrant.name) return;
    const grant = { ...newGrant, id: Date.now().toString() };
    const updated = [...grants, grant];
    saveGrants(updated);
    setNewGrant({ id: "", name: "", amount: "", description: "", status: "Draft" });
  };

  const updateGrant = (id: string, field: keyof Grant, value: string) => {
    const updated = grants.map((g) =>
      g.id === id ? { ...g, [field]: value } : g
    );
    saveGrants(updated);
  };

  const deleteGrant = (id: string) => {
    const updated = grants.filter((g) => g.id !== id);
    saveGrants(updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Manage Grants</h2>

      {/* Add new grant */}
      <div className="border p-4 rounded space-y-2">
        <input
          type="text"
          placeholder="Grant name"
          className="border rounded p-2 w-full"
          value={newGrant.name}
          onChange={(e) => setNewGrant({ ...newGrant, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amount"
          className="border rounded p-2 w-full"
          value={newGrant.amount}
          onChange={(e) => setNewGrant({ ...newGrant, amount: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border rounded p-2 w-full"
          value={newGrant.description}
          onChange={(e) => setNewGrant({ ...newGrant, description: e.target.value })}
        />
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={addGrant}
        >
          Add Grant
        </button>
      </div>

      {/* Existing grants */}
      <div className="space-y-4">
        {grants.map((grant) => (
          <div key={grant.id} className="border rounded p-4 shadow space-y-2">
            <input
              type="text"
              value={grant.name}
              disabled={grant.status === "Submitted"}
              className="border rounded p-2 w-full"
              onChange={(e) => updateGrant(grant.id, "name", e.target.value)}
            />
            <input
              type="text"
              value={grant.amount}
              disabled={grant.status === "Submitted"}
              className="border rounded p-2 w-full"
              onChange={(e) => updateGrant(grant.id, "amount", e.target.value)}
            />
            <textarea
              value={grant.description}
              disabled={grant.status === "Submitted"}
              className="border rounded p-2 w-full"
              onChange={(e) => updateGrant(grant.id, "description", e.target.value)}
            />
            <p className="text-sm text-gray-500">Status: {grant.status}</p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => deleteGrant(grant.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGrants;