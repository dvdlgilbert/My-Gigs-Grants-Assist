// src/ManageGrants.tsx
import React, { useState } from "react";

interface Grant {
  id: string;
  name: string;
  amount: string;
  description: string;
  status: "Draft" | "Submitted" | "Approved";
}

const ManageGrants: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null);

  const addMockGrant = () => {
    const newGrant: Grant = {
      id: Date.now().toString(),
      name: "New Mock Grant",
      amount: "$0",
      description: "Draft grant write-up...",
      status: "Draft",
    };
    setGrants([...grants, newGrant]);
  };

  const saveGrant = (updated: Grant) => {
    setGrants(grants.map(g => g.id === updated.id ? updated : g));
    setEditingGrant(null);
  };

  const deleteGrant = (id: string) => {
    setGrants(grants.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Manage Grants</h2>
      <button
        className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        onClick={addMockGrant}
      >
        + New Mock Grant
      </button>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {grants.map(grant => (
          <div key={grant.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-bold">{grant.name}</h3>
            <p className="text-gray-600">{grant.amount}</p>
            <p className="mt-2">{grant.description}</p>
            <p className="mt-2 text-sm text-gray-500">Status: {grant.status}</p>
            <div className="mt-3 flex gap-3">
              <button
                className="px-3 py-1 bg-brand-accent text-white rounded hover:bg-brand-dark"
                onClick={() => setEditingGrant(grant)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => deleteGrant(grant.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingGrant && (
        <div className="border rounded p-4 shadow mt-6 bg-gray-50">
          <h3 className="text-xl font-bold">Editing {editingGrant.name}</h3>
          <textarea
            className="mt-2 w-full border rounded p-2"
            rows={5}
            value={editingGrant.description}
            onChange={e =>
              setEditingGrant({ ...editingGrant, description: e.target.value })
            }
          />
          <div className="flex gap-3 mt-3">
            <button
              className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
              onClick={() => saveGrant(editingGrant)}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
              onClick={() => setEditingGrant(null)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
              onClick={() => alert(`AI drafting text for ${editingGrant.name}`)}
            >
              AI Write Assist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGrants;