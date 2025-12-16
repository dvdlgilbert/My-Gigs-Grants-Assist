// src/ManageGrants.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Grant {
  id: string;
  title?: string;        // made optional to avoid crashes
  description?: string;  // also optional
  status: "draft" | "submitted" | "approved" | "rejected";
}

const ManageGrants: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("title");

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
      <h2 className="text-2xl font-bold mb-4">Manage Grants</h2>

      {/* Filter & Sort controls */}
      <div className="flex gap-6 mb-4">
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

      {/* Grant list */}
      {sortedGrants.length === 0 ? (
        <p>No grants found.</p>
      ) : (
        <ul className="space-y-3">
          {sortedGrants.map((grant) => (
            <li
              key={grant.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{grant.title || "(Untitled Grant)"}</h3>
                <p className="text-sm text-gray-600">
                  {grant.description || "No description provided."}
                </p>
                <p className="text-sm font-medium">Status: {grant.status}</p>
              </div>
              <Link
                to={`/grant/${grant.id}`}
                className="px-3 py-1 bg-brand-primary text-white rounded hover:bg-brand-dark"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageGrants;