import React, { useState } from "react";
import Finder from "./Finder";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import ApiKeyInput from "./components/ApiKeyInput";

function App() {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSaveApiKey = (key: string) => {
    // Already stored in localStorage by ApiKeyInput, but you can add extra logic here
    console.log("API key saved:", key);
    setShowApiKeyInput(false);
  };

  const handleCancelApiKey = () => {
    setShowApiKeyInput(false);
  };

  return (
    <div className="App">
      <h1>My Gigs Grants Assist</h1>

      {/* Navigation or sections */}
      <Finder />
      <Dashboard />
      <ManageGrants />

      <section style={{ marginTop: "2rem" }}>
        <h3>API Key Management</h3>
        <button
          onClick={() => setShowApiKeyInput(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Enter API Key
        </button>

        <p style={{ marginTop: "1rem" }}>
          Don’t have a key?{" "}
          <a
            href="https://your-api-provider.com/signup"
            target="_blank"
            rel="noreferrer"
          >
            Get one here
          </a>
        </p>
      </section>

      {showApiKeyInput && (
        <ApiKeyInput onSave={handleSaveApiKey} onCancel={handleCancelApiKey} />
      )}
    </div>
  );
}

export default App;