// src/Home.tsx
import React from "react";

interface HomeProps {
  profilePresent: boolean;
  onCreateProfile: () => void;
  onGoDashboard: () => void;
  onShowApiKey: () => void; // <-- add this
}

const Home: React.FC<HomeProps> = ({
  profilePresent,
  onCreateProfile,
  onGoDashboard,
  onShowApiKey,
}) => {
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

      {/* API Key Management only on Homepage */}
      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-2">API Key Management</h3>
        <button
          className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
          onClick={onShowApiKey}
        >
          Enter API Key
        </button>
        <p className="mt-4">
          Don’t have a key?{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-brand-primary underline hover:text-brand-dark"
          >
            Get one here
          </a>
        </p>
      </section>
    </div>
  );
};

export default Home;