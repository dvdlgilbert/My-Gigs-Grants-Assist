// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ManageGrants from "./ManageGrants";
import GrantDetail from "./GrantDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-brand-primary text-white p-4">
          <h1 className="text-2xl font-bold">My Gigs Grants Assist</h1>
        </header>

        <main className="p-6">
          <Routes>
            {/* Default route goes to Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard overview */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Manage grants (create/edit/delete) */}
            <Route path="/manage" element={<ManageGrants />} />

            {/* Grant detail view */}
            <Route path="/grant/:id" element={<GrantDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;