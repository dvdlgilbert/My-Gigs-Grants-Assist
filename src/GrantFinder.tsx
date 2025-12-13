import React, { useState } from "react";

const GrantFinder: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // TODO: Wire to external grant APIs (e.g., Grants.gov, Foundation Directory)
    alert(`Searching for grants related to: ${query}`);
  };

  return (
    <div className="grant-finder">
      <h3>Grant Finder</h3>
      <p>Search for potential funding opportunities for your nonprofit projects.</p>
      <input
        type="text"
        placeholder="Enter keywords (e.g., education, housing)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GrantFinder;