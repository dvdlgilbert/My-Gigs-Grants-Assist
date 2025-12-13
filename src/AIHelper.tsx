import React, { useState } from "react";
import { refineProposal } from "./services/geminiService";

const AIHelper: React.FC = () => {
  const [draft, setDraft] = useState("");
  const [refined, setRefined] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    try {
      const result = await refineProposal(draft);
      setRefined(result);
    } catch (err) {
      console.error("AI refinement failed:", err);
      setRefined("Error: Could not refine draft. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
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

      <button onClick={handleEdit} disabled={loading}>
        {loading ? "Refining..." : "Refine with AI"}
      </button>

      {refined && (
        <div className="refined-output">
          <h4>AI Suggestions</h4>
          <pre>{refined}</pre>
        </div>
      )}
    </div>
  );
};

export default AIHelper;