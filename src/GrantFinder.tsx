import React, { useState, useEffect } from "react";
import { findGrants } from "./services/geminiService";
import type { NonprofitProfile, GrantRecommendation } from "./types";
import ProfileForm from "./components/ProfileForm"; // ✅ use your existing form

const STORAGE_KEY = "nonprofit_profile";

const GrantFinder: React.FC = () => {
  const [profile, setProfile] = useState<NonprofitProfile>({
    orgName: "",
    taxId: "",
    mission: "",
    goals: "",
    needs: "",
    address: "",
    contactName: "",
    contactPhone: "",
    email: "",
    website: "",
  });

  const [results, setResults] = useState<GrantRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  // 🔑 Load saved profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        console.warn("Invalid profile JSON in localStorage");
      }
    }
  }, []);

  const handleSaveProfile = async (updatedProfile: NonprofitProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    setShowForm(false);
    setLoading(true);
    setError(null);

    try {
      const recs = await findGrants(updatedProfile);
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
      <p>Enter your nonprofit profile to discover funding opportunities.</p>

      {showForm ? (
        <ProfileForm
          profile={profile}
          onSave={handleSaveProfile}
          onBack={() => setShowForm(false)}
        />
      ) : (
        <div className="results mt-4 space-y-3">
          {loading && <p>Searching for grants...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {results.length === 0 && !loading && (
            <p>No grants found. Try adjusting your profile.</p>
          )}
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
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default GrantFinder;