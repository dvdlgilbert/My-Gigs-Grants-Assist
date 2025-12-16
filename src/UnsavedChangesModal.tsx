// src/UnsavedChangesModal.tsx
import React from "react";

interface UnsavedChangesModalProps {
  onStay: () => void;
  onLeave: () => void;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({ onStay, onLeave }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-red-600">Unsaved Changes</h2>
        <p className="mt-3 text-gray-700">
          You have unsaved changes. If you leave this page, your edits will be lost.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onStay}
          >
            Stay Here
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onLeave}
          >
            Leave Without Saving
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesModal;