// src/Finder.tsx
import React, { useState, useEffect } from "react";

interface GrantResult {
  id: string;
  name: string;
  amount: string;
  description: string;
  url: string;
}

const Finder: React.FC = () => {
  const [results, setResults] = useState<GrantResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load org profile from localStorage
  const profileRaw = localStorage.getItem("orgProfile");
  const profile = profileRaw ? JSON.parse(profileRaw) : null;

  const runSearch = async () => {
    if (!profile) {
      setError("Please create your organization profile first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Placeholder: Replace with real AI/Grant API call
      // For now, simulate results based on profile mission/goals
      const mockResults: GrantResult[] = [
        {
          id: "1",
          name: "Community Development Grant",
          amount: "$15,000",
          description: `Supports nonprofits aligned with mission: ${profile.mission}`,
          url: "https://example.com/apply/community-grant",
        },
        {
          id: "2",
          name: "Education Innovation Fund",
          amount: "$25,000",
          description: `For organizations focused on goals: ${profile.goals}`,
          url: "https://example.com/apply/education-fund",
        },
        {
          id: "3",
          name: "Health Equity Grant",
          amount: "$10,000",
          description: `Addresses needs: ${profile.needs}`,
          url: "https://example.com/apply/health-equity",
        },
      ];
      setResults(mockResults);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const runWritingAssist = (grant: GrantResult) => {
    // Placeholder: Replace with AI writing assistance call
    alert(`Drafting application text for ${grant.name} using your profile...`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Grant Finder</h2>
      <p className="text-gray-700">
        Search for grants tailored to your organization profile.
      </p>

      <button
        className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        onClick={runSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Run AI Search"}
      </button>

      {error && <div className="text-red-600">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {results.map((grant) => (
          <div key={grant.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-bold">{grant.name}</h3>
            <p className="text-gray-600">{grant.amount}</p>
            <p className="mt-2">{grant.description}</p>
            <div className="mt-3 flex gap-3">
              <a
                href={grant.url}
                target="_blank"
                rel="noreferrer"
                className="text-brand-primary underline hover:text-brand-dark"
              >
                Apply Now
              </a>
              <button
                className="px-3 py-1 bg-brand-accent text-white rounded hover:bg-brand-dark"
                onClick={() => runWritingAssist(grant)}
              >
                AI Writing Assist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finder;