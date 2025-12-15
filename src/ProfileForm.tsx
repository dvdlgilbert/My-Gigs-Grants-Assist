// src/ProfileForm.tsx
import React, { useState } from "react";

export interface OrgProfile {
  orgName: string;
  mission: string;
  goals: string;
  needs: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  taxId: string;
}

interface ProfileFormProps {
  initial?: OrgProfile;
  onSave: (data: OrgProfile) => void;
  onCancel: () => void;
  saved?: boolean; // <-- new prop
  onDismissBanner?: () => void; // <-- new prop
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initial,
  onSave,
  onCancel,
  saved,
  onDismissBanner,
}) => {
  const [form, setForm] = useState<OrgProfile>({
    orgName: initial?.orgName || "",
    mission: initial?.mission || "",
    goals: initial?.goals || "",
    needs: initial?.needs || "",
    address: initial?.address || "",
    contactName: initial?.contactName || "",
    contactEmail: initial?.contactEmail || "",
    contactPhone: initial?.contactPhone || "",
    website: initial?.website || "",
    taxId: initial?.taxId || "",
  });

  const [dirty, setDirty] = useState(false);

  const update = (field: keyof OrgProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [field]: e.target.value });
    setDirty(true);
  };

  const save = () => {
    onSave(form);
    setDirty(false);
  };

  const cancel = () => {
    if (dirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Do you want to discard them?"
      );
      if (!confirmLeave) return;
    }
    onCancel();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Organization Profile</h2>

      {/* Success banner controlled by App */}
      {saved && (
        <div className="flex items-center justify-between p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <span>✅ Profile saved successfully!</span>
          <button
            className="text-green-700 font-bold ml-4"
            onClick={onDismissBanner}
          >
            ✕
          </button>
        </div>
      )}

      {/* form fields ... same as before */}
      {/* ... */}

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
          onClick={save}
        >
          Save Profile
        </button>
        <button
          className="px-4 py-2 bg-white border rounded hover:bg-gray-50"
          onClick={cancel}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;