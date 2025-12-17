// src/ProfileForm.tsx
import React, { useEffect, useState } from "react";

export interface OrgProfile {
  organizationName: string;
  taxId: string;
  mission: string;
  goals: string;
  financialObjectives: string;
  supportObjectives: string;
  contactName: string;
  phoneNumber: string;
  address: string;
  email: string;
  website: string;
}

interface ProfileFormProps {
  initial?: OrgProfile;
  onSave: (data: OrgProfile) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initial, onSave, onCancel }) => {
  const emptyProfile: OrgProfile = {
    organizationName: "",
    taxId: "",
    mission: "",
    goals: "",
    financialObjectives: "",
    supportObjectives: "",
    contactName: "",
    phoneNumber: "",
    address: "",
    email: "",
    website: "",
  };

  const [profile, setProfile] = useState<OrgProfile>(initial || emptyProfile);
  const [initialProfile, setInitialProfile] = useState<OrgProfile>(initial || emptyProfile);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orgProfile");
      if (raw) {
        const parsed: OrgProfile = JSON.parse(raw);
        setProfile(parsed);
        setInitialProfile(parsed);
      }
    } catch (e) {
      console.error("Failed to parse profile:", e);
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (field: keyof OrgProfile, value: string) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem("orgProfile", JSON.stringify(profile));
    setInitialProfile(profile);
    setIsDirty(false);
    onSave(profile);
  };

  const handleResetToSaved = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Do you want to discard them and revert to the last saved profile?"
      );
      if (!confirmLeave) return;
    }
    setProfile(initialProfile);
    setIsDirty(false);
    onCancel();
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Organization Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Organization Name</label>
          <input
            type="text"
            value={profile.organizationName}
            onChange={(e) => handleChange("organizationName", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Tax ID</label>
          <input
            type="text"
            value={profile.taxId}
            onChange={(e) => handleChange("taxId", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Mission</label>
          <textarea
            value={profile.mission}
            onChange={(e) => handleChange("mission", e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium">Goals</label>
          <textarea
            value={profile.goals}
            onChange={(e) => handleChange("goals", e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium">Financial Objectives</label>
          <textarea
            value={profile.financialObjectives}
            onChange={(e) => handleChange("financialObjectives", e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium">Support Objectives</label>
          <textarea
            value={profile.supportObjectives}
            onChange={(e) => handleChange("supportObjectives", e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium">Point of Contact Name</label>
          <input
            type="text"
            value={profile.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            value={profile.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Email Address</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Website</label>
          <input
            type="text"
            value={profile.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3 items-center">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
        >
          Save Profile
        </button>
        <button
          onClick={handleResetToSaved}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Revert to Last Saved
        </button>
        {isDirty && (
          <span className="text-sm text-yellow-700">
            Unsaved changes — remember to save.
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;