import React, { useState } from "react";
import { findGrants } from "../services/geminiService";
import type { NonprofitProfile, GrantRecommendation } from "../types";
import ApiKeyInput from "../components/ApiKeyInput";

interface GrantFinderProps {
  profile: NonprofitProfile;
  onCreateProject: (title?: string, funder?: string) => void;
  grants: GrantRecommendation[];
  setGrants: React.Dispatch<React.SetStateAction<GrantRecommendation[]>>;
  useMock: boolean;
  onClear: () => void;
}

const GrantFinder: React.FC<GrantFinderProps> = ({
  profile,
  onCreateProject,
  grants,
  setGrants,
  useMock,
  onClear,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("gemini_api_key")
  );
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Save mode preference
      localStorage.setItem("use_mock", JSON.stringify(useMock));

      // Check for API key if not in mock mode
      if (!useMock && !apiKey) {
        setShowApiKeyInput(true);
        setLoading(false);
        return;
      }

      const results = await findGrants(profile);
      const limited = results.slice(
        0,
        Math.max(5, Math.min(7, results.length || 6))
      );
      setGrants(limited);
    } catch (err: any) {
      setError(err.message || "Failed to fetch grant recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Grant Recommendations</h2>
        <span className="text-sm text-slate-600">
          Mode: <strong>{useMock ? "Mock" : "Real"}</strong>
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={performSearch}
          disabled={loading}
          className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-secondary"
        >
          {loading ? "Searching..." : "Initiate Grant Search"}
        </button>
        <button
          onClick={performSearch}
          disabled={loading}
          className="bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300"
        >
          {loading ? "Searching..." : "Find More Grants"}
        </button>
        {grants.length > 0 && (
          <button
            onClick={onClear}
            className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-300"
          >
            Clear Results
          </button>
        )}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {grants.length === 0 ? (
        <div className="border rounded-lg shadow-sm p-6 bg-white">
          <p className="text-slate-700">
            No grant recommendations yet. Click “Initiate Grant Search” to fetch
            suggestions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grants.map((grant, idx) => (
            <div
              key={`${grant.funderName}-${grant.grantName}-${idx}`}
              className="border rounded-lg shadow-md p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">{grant.funderName}</h3>
                <p className="text-md font-semibold">{grant.grantName}</p>
                <p className="text-sm text-slate-700 mt-2">{grant.description}</p>
                <p className="text-sm text-slate-600 mt-2">
                  <strong>Reason:</strong> {grant.matchReason}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    onCreateProject(grant.grantName, grant.funderName)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Create Project
                </button>
                <a
                  href={grant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  Application Page
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showApiKeyInput && (
  <ApiKeyInput
    onSave={(key: string) => {
      localStorage.setItem("gemini_api_key", key);
      setApiKey(key);
      setShowApiKeyInput(false);
    }}
    onCancel={() => setShowApiKeyInput(false)}
  />
)}
    </div>
  );
};

export default GrantFinder;