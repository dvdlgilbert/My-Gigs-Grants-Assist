import React, { useState, useEffect } from "react";

interface ApiKeyInputProps {
  onSave: () => void; // callback to notify parent when key is saved/cleared
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  // Load any existing key from localStorage on mount
  useEffect(() => {
    const existingKey = localStorage.getItem("gemini_api_key");
    if (existingKey) {
      setApiKey(existingKey);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim().length === 0) {
      alert("API key cannot be empty.");
      return;
    }
    localStorage.setItem("gemini_api_key", apiKey.trim());
    setSaved(true);
    onSave();
  };

  const handleClear = () => {
    localStorage.removeItem("gemini_api_key");
    setApiKey("");
    setSaved(false);
    onSave();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">Gemini API Key</label>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your Gemini API key"
        className="w-full border rounded-md p-2 text-sm"
      />

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleSave}
          className="bg-brand-primary text-white px-3 py-1 rounded-md text-sm hover:bg-brand-secondary"
        >
          Save Key
        </button>
        {saved && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
          >
            Clear Key
          </button>
        )}
      </div>

      {saved && (
        <p className="text-green-600 text-sm">✅ API key saved successfully.</p>
      )}
    </div>
  );
};

export default ApiKeyInput;