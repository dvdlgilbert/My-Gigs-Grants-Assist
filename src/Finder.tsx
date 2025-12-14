import React, { useState, useEffect } from "react";
import { fetchGrants, GrantResult } from "./utils/api";

const Finder: React.FC = () => {
  const [results, setResults] = useState<GrantResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const grants = await fetchGrants();
        setResults(grants);
      } catch (err: any) {
        setError(err.message || "Failed to fetch grants");
      }

      setLoading(false);
    };

    loadData();
  }, []); // ✅ runs once on mount

  return (
    <div>
      <h2>Finder</h2>

      {loading && <p>Loading results...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((r) => (
          <li key={r.id}>
            {r.name} — ${r.amount}
          </li>
        ))}
      </ul>

      {!loading && results.length === 0 && !error && (
        <p>No results found. Try switching API mode or saving a key.</p>
      )}
    </div>
  );
};

export default Finder;