import React, { useState, useEffect } from "react";
import GrantFinder from "./GrantFinder";
import AIHelper from "./AIHelper";
import "./ManageGrants.css";

const ManageGrants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"finder" | "ai">("finder");
  const [useMock, setUseMock] = useState<boolean>(true);

  // Load initial mock/real setting from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("use_mock");
    if (stored !== null) {
      setUseMock(JSON.parse(stored));
    }
  }, []);

  // Save setting whenever it changes
  useEffect(() => {
    localStorage.setItem("use_mock", JSON.stringify(useMock));
  }, [useMock]);

  return (
    <div className="manage-grants-container">
      <h2>Manage Grants</h2>
      <p>Discover funding opportunities and get AI assistance for your proposals.</p>

      {/* Toggle mock vs real mode */}
      <div className="mock-toggle">
        <label>
          <input
            type="checkbox"
            checked={useMock}
            onChange={(e) => setUseMock(e.target.checked)}
          />
          Use Mock Mode
        </label>
      </div>

      {/* Tab navigation */}
      <div className="tabs">
        <button
          className={activeTab === "finder" ? "active" : ""}
          onClick={() => setActiveTab("finder")}
        >
          Grant Finder
        </button>
        <button
          className={activeTab === "ai" ? "active" : ""}
          onClick={() => setActiveTab("ai")}
        >
          AI Helper
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "finder" && <GrantFinder />}
        {activeTab === "ai" && <AIHelper />}
      </div>
    </div>
  );
};

export default ManageGrants;