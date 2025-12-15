// src/Dashboard.tsx
import React, { useEffect, useState } from "react";

interface Grant {
  id: string;
  name: string;
  amount: string;
  description: string;
  status: "Draft" | "Submitted" | "Approved";
}

const Dashboard: React.FC = () => {
  const [grants, setGrants] = useState<Grant[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("grants");
    if (raw) {
      setGrants(JSON.parse(raw));
    }
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-gray-700">
        Overview of your saved and managed grants.
      </p>

      {grants.length === 0 ? (
        <p className="text-gray-500">No grants created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {grants.map((grant) => (
            <div key={grant.id} className="border rounded p-4 shadow">
              <h3 className="text-xl font-bold">{grant.name}</h3>
              <p className="text-gray-600">{grant.amount}</p>
              <p className="mt-2">{grant.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Status: {grant.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;