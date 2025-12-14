import React, { useState } from "react";

interface ApiKeyInputProps {
  onSave: (key: string) => void;
  onCancel?: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave, onCancel }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSave = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem("gemini_api_key", apiKey);
    onSave(apiKey);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-md shadow-md p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Enter Gemini API Key</h3>
        <input
          type="text"
          placeholder="Paste your API key here"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Key
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-slate-300 px-4 py-2 rounded-md hover:bg-slate-400"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;