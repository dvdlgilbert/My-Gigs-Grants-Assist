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
  taxId: string; // 501(c)(3) EIN
}

interface ProfileFormProps {
  initial?: OrgProfile;
  onSave: (data: OrgProfile) => void;
  onCancel: () => void; // Back to Dashboard
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initial, onSave, onCancel }) => {
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
  const [saved, setSaved] = useState(false);

  const update = (field: keyof OrgProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [field]: e.target.value });
    setDirty(true);
    setSaved(false); // hide banner when editing again
  };

  const save = () => {
    onSave(form);
    setDirty(false);
    setSaved(true); // show success banner
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

      {/* Success banner with dismiss button */}
      {saved && (
        <div className="flex items-center justify-between p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <span>✅ Profile saved successfully!</span>
          <button
            className="text-green-700 font-bold ml-4"
            onClick={() => setSaved(false)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form fields */}
        <div>
          <label className="block text-sm text-gray-600">Organization Name</label>
          <input className="mt-1 w-full border rounded p-2" value={form.orgName} onChange={update("orgName")} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Website</label>
          <input className="mt-1 w-full border rounded p-2" value={form.website} onChange={update("website")} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Mission</label>
          <textarea className="mt-1 w-full border rounded p-2" rows={3} value={form.mission} onChange={update("mission")} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Goals</label>
          <textarea className="mt-1 w-full border rounded p-2" rows={3} value={form.goals} onChange={update("goals")} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Needs</label>
          <textarea className="mt-1 w-full border rounded p-2" rows={3} value={form.needs} onChange={update("needs")} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600">Address</label>
          <input className="mt-1 w-full border rounded p-2" value={form.address} onChange={update("address")} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Primary Contact Name</label>
          <input className="mt-1 w-full border rounded p-2" value={form.contactName} onChange={update("contactName")} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Contact Email</label>
          <input className="mt-1 w-full border rounded p-2" value={form.contactEmail} onChange={update("contactEmail")} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Contact Phone</label>
          <input className="mt-1 w-full border rounded p-2" value={form.contactPhone} onChange={update("contactPhone")} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">IRS EIN (501c3)</label>
          <input className="mt-1 w-full border rounded p-2" value={form.taxId} onChange={update("taxId")} />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark" onClick={save}>
          Save Profile
        </button>
        <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50" onClick={cancel}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;