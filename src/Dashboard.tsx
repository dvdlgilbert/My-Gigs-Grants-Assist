import React, { useState, useEffect } from "react";
import { fetchGrants, GrantResult } from "./utils/api";

const Dashboard: React.FC = () => {
  const [grants, setGrants] = useState<GrantResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchGrants();
        setGrants(data);
      } catch (err: any) {
        setError(err.message || "Failed to load grants");
      }

      setLoading(false);
    };

    loadData();
  }, []); // ✅ runs once when Dashboard mounts

  return (
    <div>
      <h2>Dashboard</h2>

      {loading && <p>Loading grants...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Grant Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {grants.map((grant) => (
            <tr key={grant.id}>
              <td>{grant.name}</td>
              <td>${grant.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && grants.length === 0 && !error && (
        <p>No grants available. Try switching API mode or saving a key.</p>
      )}
    </div>
  );
};

export default Dashboard;