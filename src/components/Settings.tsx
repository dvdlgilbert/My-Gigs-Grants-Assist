import React, { useState, useEffect } from "react";

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("gemini_api_key", apiKey.trim());
    alert("✅ Gemini API key saved successfully.");
    onBack();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Gemini API Key
        </label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your Gemini API key here"
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-slate-600 mt-2">
          Don’t have a key?{" "}
          <a
            href="https://ai.google.dev/gemini-api/docs/api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Get your Gemini API key here
          </a>
          .
        </p>
        <p className="text-xs text-slate-500 mt-1">
          The API key is required for <strong>Real Mode</strong>.  
          Use <span className="bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">Mock Mode</span> for training and demos without a key.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Save Key
        </button>
        <button
          onClick={onBack}
          className="bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;