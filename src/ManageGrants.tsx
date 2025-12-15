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
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      setGrants(JSON.parse(raw));
    }
  }, []);

  const persistGrants = (updated: Grant[]) => {
    setGrants(updated);
    localStorage.setItem("grants", JSON.stringify(updated));
  };

  const addMockGrant = () => {
    const newGrant: Grant = {
      id: Date.now().toString(),
      name: "New Mock Grant",
      amount: "$0",
      description: "Draft grant write-up...",
      status: "Draft",
    };
    persistGrants([...grants, newGrant]);
  };

  const saveGrant = (updated: Grant) => {
    const updatedList = grants.map((g) => (g.id === updated.id ? updated : g));
    persistGrants(updatedList);
    setEditingGrant(null);
  };

  const deleteGrant = (id: string) => {
    const updatedList = grants.filter((g) => g.id !== id);
    persistGrants(updatedList);
  };

  const runWritingAssist = (grant: Grant) => {
    // Placeholder: Replace with AI text generation call
    alert(
      `AI drafting text for ${grant.name}...\n\nCurrent description:\n${grant.description}`
    );
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
        {grants.map((grant) => (
          <div key={grant.id} className="border rounded p-4 shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{grant.name}</h3>
              <button
                className="px-2 py-1 bg-brand-accent text-white rounded hover:bg-brand-dark text-sm"
                onClick={() => runWritingAssist(grant)}
              >
                AI Write Assist
              </button>
            </div>
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
          <input
            className="mt-2 w-full border rounded p-2"
            value={editingGrant.name}
            onChange={(e) =>
              setEditingGrant({ ...editingGrant, name: e.target.value })
            }
          />
          <input
            className="mt-2 w-full border rounded p-2"
            value={editingGrant.amount}
            onChange={(e) =>
              setEditingGrant({ ...editingGrant, amount: e.target.value })
            }
          />
          <textarea
            className="mt-2 w-full border rounded p-2"
            rows={5}
            value={editingGrant.description}
            onChange={(e) =>
              setEditingGrant({ ...editingGrant, description: e.target.value })
            }
          />
          <select
            className="mt-2 w-full border rounded p-2"
            value={editingGrant.status}
            onChange={(e) =>
              setEditingGrant({
                ...editingGrant,
                status: e.target.value as Grant["status"],
              })
            }
          >
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
          </select>
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
              onClick={() => runWritingAssist(editingGrant)}
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