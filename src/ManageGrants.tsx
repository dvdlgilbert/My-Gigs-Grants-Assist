import React, { useState } from "react";
import GrantFinder from "./GrantFinder";
import AIHelper from "./AIHelper";
import "./ManageGrants.css";

const ManageGrants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"finder" | "ai">("finder");

  return (
    <div className="manage-grants-container">
      <h2>Manage Grants</h2>
      <p>Discover funding opportunities and get AI assistance for your proposals.</p>

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