// src/Finder.tsx
import React, { useState } from "react";

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

  const runSearch = async (append = false) => {
    if (!profile) {
      setError("Please create your organization profile first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Placeholder: Replace with real AI/web search call
      const mockResults: GrantResult[] = [
        {
          id: Date.now().toString() + "-1",
          name: "Community Development Grant",
          amount: "$15,000",
          description: `Supports nonprofits aligned with mission: ${profile.mission}`,
          url: "https://grantstation.com/funding-opportunities/community-development",
        },
        {
          id: Date.now().toString() + "-2",
          name: "Education Innovation Fund",
          amount: "$25,000",
          description: `For organizations focused on goals: ${profile.goals}`,
          url: "https://grantstation.com/funding-opportunities/education-innovation",
        },
        {
          id: Date.now().toString() + "-3",
          name: "Health Equity Grant",
          amount: "$10,000",
          description: `Addresses needs: ${profile.needs}`,
          url: "https://grantstation.com/funding-opportunities/health-equity",
        },
      ];
      setResults(append ? [...results, ...mockResults] : mockResults);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const runWritingAssist = (grant: GrantResult) => {
    // Placeholder: Replace with AI text generation call
    alert(
      `Drafting application text for ${grant.name} using your profile:\n\nMission: ${profile.mission}\nGoals: ${profile.goals}\nNeeds: ${profile.needs}`
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Grant Finder</h2>
      <p className="text-gray-700">
        Search for grants tailored to your organization profile.
      </p>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={() => runSearch(false)}
          disabled={loading}
        >
          {loading ? "Searching..." : "Run AI Search"}
        </button>
        <button
          className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
          onClick={() => runSearch(true)}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search for More Grants"}
        </button>
      </div>

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