import React, { useState, useEffect } from "react";
import { fetchGrants, GrantResult, getApiMode, syncMockGrants } from "./utils/api";

const STORAGE_KEY = "mockGrants";

const ManageGrants: React.FC = () => {
  const [grants, setGrants] = useState<(GrantResult & { source?: string; synced?: boolean })[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editAmount, setEditAmount] = useState<number>(0);

  const [filter, setFilter] = useState<"all" | "mock" | "real">("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!getApiMode()) {
          // Mock mode → load from localStorage if available
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            setGrants(JSON.parse(saved));
          } else {
            const data = await fetchGrants();
            const tagged = data.map((g) => ({ ...g, source: "mock" }));
            setGrants(tagged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tagged));
          }
        } else {
          // Real mode → fetch API and merge mock
          const data = await fetchGrants();
          const taggedReal = data.map((g) => ({ ...g, source: "real" }));

          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const mockRecords: GrantResult[] = JSON.parse(saved);
            const taggedMock = mockRecords.map((g) => ({ ...g, source: "mock" }));

            // ✅ Sync mock records into real API
            await syncMockGrants(mockRecords);

            // Mark them as synced
            const syncedMock = taggedMock.map((g) => ({ ...g, synced: true }));

            setGrants([...syncedMock, ...taggedReal]);
          } else {
            setGrants(taggedReal);
          }
        }
      } catch (err: any) {
        setError(err.message || "Failed to load grants");
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Persist mock grants whenever they change
  useEffect(() => {
    if (!getApiMode()) {
      const mockOnly = grants.filter((g) => g.source === "mock");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOnly));
    }
  }, [grants]);

  const handleDelete = (id: number) => {
    setGrants((prev) => prev.filter((g) => g.id !== id));
  };

  const handleEdit = (grant: GrantResult & { source?: string }) => {
    setEditingId(grant.id);
    setEditName(grant.name);
    setEditAmount(grant.amount);
  };

  const handleSave = () => {
    setGrants((prev) =>
      prev.map((g) =>
        g.id === editingId ? { ...g, name: editName, amount: editAmount } : g
      )
    );
    setEditingId(null);
  };

  const handleNewGrant = () => {
    const newGrant: GrantResult & { source?: string } = {
      id: Date.now(),
      name: "New Mock Grant",
      amount: 0,
      source: "mock",
    };
    setGrants((prev) => [newGrant, ...prev]);
    setEditingId(newGrant.id);
    setEditName(newGrant.name);
    setEditAmount(newGrant.amount);
  };

  const filteredGrants =
    filter === "all" ? grants : grants.filter((g) => g.source === filter);

  return (
    <div>
      <h2>Manage Grants</h2>

      {loading && <p>Loading grants...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filter controls */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="mock">Mock Only</option>
          <option value="real">Real Only</option>
        </select>
      </div>

      {/* New Grant button (only in mock mode) */}
      {!getApiMode() && (
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={handleNewGrant}>+ New Mock Grant</button>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        {filteredGrants.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Grant Name</th>
                <th>Amount</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrants.map((grant) => (
                <tr key={grant.id}>
                  <td>
                    {editingId === grant.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      grant.name
                    )}
                  </td>
                  <td>
                    {editingId === grant.id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(Number(e.target.value))}
                      />
                    ) : (
                      `$${grant.amount}`
                    )}
                  </td>
                  <td>
                    {grant.source === "mock" ? (
                      <span style={{ color: "orange", fontWeight: "bold" }}>Mock</span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>Real</span>
                    )}
                  </td>
                  <td>
                    {grant.source === "mock" && grant.synced ? (
                      <span style={{ color: "blue", fontWeight: "bold" }}>Synced</span>
                    ) : grant.source === "mock" ? (
                      <span style={{ color: "gray" }}>Local Only</span>
                    ) : (
                      <span style={{ color: "green" }}>Live</span>
                    )}
                  </td>
                  <td>
                    {editingId === grant.id ? (
                      <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(grant)}>Edit</button>
                        <button onClick={() => handleDelete(grant.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading &&
          !error && <p>No grants available. Try switching API mode or saving a key.</p>
        )}
      </div>
    </div>
  );
};

export default ManageGrants;