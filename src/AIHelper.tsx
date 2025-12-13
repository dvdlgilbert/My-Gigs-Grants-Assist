import React, { useState } from "react";

const AIHelper: React.FC = () => {
  const [draft, setDraft] = useState("");

  const handleEdit = () => {
    // TODO: Integrate AI editing (suggest improvements, polish language, align with funder requirements)
    alert("AI editing would refine this draft:\n\n" + draft);
  };

  return (
    <div className="ai-helper">
      <h3>AI Helper</h3>
      <p>Paste or write your proposal draft below. AI will help refine it.</p>
      <textarea
        rows={10}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Paste your proposal draft here..."
      />
      <button onClick={handleEdit}>Refine with AI</button>
    </div>
  );
};

export default AIHelper;