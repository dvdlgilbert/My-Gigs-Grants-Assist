// src/ManageGrants.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Grant {
  id: string;
  title?: string;
  description?: string;
  status: "draft" | "submitted" | "approved" | "rejected";
}

const ManageGrants: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("title");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("grants");
      if (raw) setGrants(JSON.parse(raw));
    } catch (err) {
      console.error("Failed to parse grants:", err);
      setGrants([]);
    }
  }, []);

  const saveGrants = (updated: Grant[]) => {
    setGrants(updated);
    localStorage.setItem("grants", JSON.stringify(updated));
  };

  const handleCreateNew = () => {
    const newGrant: Grant = {
      id: Date.now().toString(),
      title: "",
      description: "",
      status: "draft",
    };
    const updated = [...grants, newGrant];
    saveGrants(updated);
    // Navigate to editable grant form
    navigate(`/grant/${newGrant.id}`);
  };

  const handleEdit = (id: string) => {
    // Navigate to editable grant form
    navigate(`/grant/${id}`);
  };

  const handleDelete = (id: string) => {
    const updated = grants.filter((g) => g.id !== id);
    saveGrants(updated);
  };

  const filteredGrants = grants.filter((g) =>
    filter === "all" ? true : g.status === filter
  );

  const sortedGrants = [...filteredGrants].sort((a, b) => {
    if (sort === "title") {
      const titleA = a.title || "";
      const titleB = b.title || "";
      return titleA.localeCompare(titleB);
    } else if (sort === "status") {
      const order = ["draft", "submitted", "approved", "rejected"];
      return order.indexOf(a.status) - order.indexOf(b.status);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Grants</h2>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        >
          + New Grant
        </button>
      </div>

      <div className="flex gap-6 mb-6">
        <label>
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label>
          Sort:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="title">Title (A–Z)</option>
            <option value="status">Status</option>
          </select>
        </label>
      </div>

      {sortedGrants.length === 0 ? (
        <p>No grants found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sortedGrants.map((grant) => (
            <div
              key={grant.id}
              className="border rounded shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {grant.title && grant.title.trim() !== "" ? grant.title : "(Untitled Grant)"}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {grant.description && grant.description.trim() !== ""
                    ? grant.description
                    : "No description provided."}
                </p>
                <p className="text-sm font-medium mb-4">Status: {grant.status}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {grant.status === "draft" && (
                  <button
                    onClick={() => handleEdit(grant.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(grant.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/grant/${grant.id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGrants;