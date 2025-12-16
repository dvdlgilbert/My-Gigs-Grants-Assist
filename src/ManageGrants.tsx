import React, { useState, useEffect } from "react";
import AIHelper from "./AIHelper";
import UnsavedChangesModal from "./UnsavedChangesModal";

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
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      setGrants(JSON.parse(raw));
    }
  }, []);

  const persistGrants = (updated: Grant[]) => {
    const raw = localStorage.getItem("grants");
    const existing: Grant[] = raw ? JSON.parse(raw) : [];
    const merged = [
      ...existing.filter((g) => !updated.find((u) => u.id === g.id)),
      ...updated,
    ];
    setGrants(merged);
    localStorage.setItem("grants", JSON.stringify(merged));
  };

  const addMockGrant = () => {
    const newGrant: Grant = {
      id: Date.now().toString(),
      name: "New Mock Grant",
      amount: "$0",
      description: "Draft grant write-up...",
      status: "Draft",
    };
    persistGrants([newGrant]);
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
            <h3 className="text-xl font-bold">{grant.name}</h3>
            <p className="text-gray-600">{grant.amount}</p>
            <p className="mt-2">{grant.description}</p>
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
              Status: <span className={statusBadge(grant.status)}>{grant.status}</span>
            </p>
            <div className="mt-3 flex gap-3">
              <button
                className="px-3 py-1 bg-brand-accent text-white rounded hover:bg-brand-dark"
                onClick={() => setEditingGrant(grant)}
                disabled={grant.status === "Submitted"} // 🔒 lock editing if submitted
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
            disabled={editingGrant.status === "Submitted"} // 🔒 lock field
          />
          <input
            className="mt-2 w-full border rounded p-2"
            value={editingGrant.amount}
            onChange={(e) =>
              setEditingGrant({ ...editingGrant, amount: e.target.value })
            }
            disabled={editingGrant.status === "Submitted"} // 🔒 lock field
          />
          <textarea
            className="mt-2 w-full border rounded p-2"
            rows={5}
            value={editingGrant.description}
            onChange={(e) =>
              setEditingGrant({ ...editingGrant, description: e.target.value })
            }
            disabled={editingGrant.status === "Submitted"} // 🔒 lock field
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
            disabled={editingGrant.status === "Submitted"} // 🔒 lock field
          >
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
          </select>

          <div className="flex gap-3 mt-3">
            <button
              className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
              onClick={() => saveGrant(editingGrant)}
              disabled={editingGrant.status === "Submitted"} // 🔒 lock save
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
              onClick={() => setShowUnsavedModal(true)}
            >
              Cancel
            </button>
          </div>

          {editingGrant.status === "Draft" && (
            <div className="mt-3">
              <AIHelper
                grant={editingGrant}
                onApply={(newText) =>
                  setEditingGrant({ ...editingGrant, description: newText })
                }
              />
            </div>
          )}

          {showUnsavedModal && (
            <UnsavedChangesModal
              onStay={() => setShowUnsavedModal(false)}
              onLeave={() => {
                setEditingGrant(null);
                setShowUnsavedModal(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageGrants;