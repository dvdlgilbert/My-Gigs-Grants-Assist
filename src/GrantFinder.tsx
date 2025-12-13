import React, { useState } from "react";
import { findGrants } from "./services/geminiService";
import type { NonprofitProfile, GrantRecommendation } from "./types";

const GrantFinder: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GrantRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // For now, build a simple profile from the query string
      const profile: NonprofitProfile = {
        orgName: "Demo Nonprofit",
        mission: query,
        goals: "Expand services",
        needs: "Funding support",
        address: "123 Main St",
        contactName: "Jane Doe",
        contactPhone: "555-1234",
        email: "demo@example.org",
        website: "https://example.org",
        taxId: "12-3456789",
      };

      const recs = await findGrants(profile);
      setResults(recs);
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grant-finder">
      <h3>Grant Finder</h3>
      <p>Search for potential funding opportunities for your nonprofit projects.</p>

      <input
        type="text"
        placeholder="Enter keywords (e.g., education, housing)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      <div className="results mt-4 space-y-3">
        {results.map((grant, idx) => (
          <div key={idx} className="border rounded-md p-3">
            <h4 className="font-bold">{grant.grantName}</h4>
            <p className="text-sm text-slate-700">Funder: {grant.funderName}</p>
            <p className="text-sm">{grant.description}</p>
            <a
              href={grant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Visit Website
            </a>
            <p className="text-xs text-slate-500 mt-1">{grant.matchReason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantFinder;