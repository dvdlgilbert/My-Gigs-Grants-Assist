// src/AIHelper.tsx
import React, { useState } from "react";
import { refineProposal } from "./services/geminiService";

interface AIHelperProps {
  grant: {
    id: string;
    name: string;
    description: string;
  };
  onApply: (newText: string) => void;
}

const AIHelper: React.FC<AIHelperProps> = ({ grant, onApply }) => {
  const [refined, setRefined] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!grant.description.trim()) return;
    setLoading(true);
    try {
      const result = await refineProposal(grant.description);
      setRefined(result);
    } catch (err) {
      console.error("AI refinement failed:", err);
      setRefined("Error: Could not refine draft. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-helper mt-4">
      <button
        className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-dark"
        onClick={handleEdit}
        disabled={loading}
      >
        {loading ? "Refining..." : "AI Write Assist"}
      </button>

      {refined && (
        <div className="refined-output mt-3 p-3 border rounded bg-gray-50">
          <h4 className="font-semibold">AI Suggestions for {grant.name}</h4>
          <pre className="whitespace-pre-wrap">{refined}</pre>
          <button
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => onApply(refined)}
          >
            Apply Suggestion
          </button>
        </div>
      )}
    </div>
  );
};

export default AIHelper;