// src/Home.tsx
import React from "react";

interface HomeProps {
  profilePresent: boolean;
  onCreateProfile: () => void;
  onGoDashboard: () => void;
}

const Home: React.FC<HomeProps> = ({ profilePresent, onCreateProfile, onGoDashboard }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Welcome to My Gigs - Grants Assist</h2>
      <p className="text-gray-700">
        Build your organization profile, find matching grants, and manage applications with AI assistance.
      </p>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={onCreateProfile}
        >
          {profilePresent ? "Edit Profile" : "Create Profile"}
        </button>
        <button
          className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
          onClick={onGoDashboard}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Home;