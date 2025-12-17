// src/ProfileForm.tsx
import React, { useEffect, useState } from "react";

// Exported interface so it can be imported elsewhere
export interface OrgProfile {
  name: string;
  email: string;
  organization: string;
}

const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<OrgProfile>({
    name: "",
    email: "",
    organization: "",
  });
  const [initialProfile, setInitialProfile] = useState<OrgProfile>({
    name: "",
    email: "",
    organization: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("profile");
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
    setIsDirty(
      updated.name !== initialProfile.name ||
        updated.email !== initialProfile.email ||
        updated.organization !== initialProfile.organization
    );
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setInitialProfile(profile);
    setIsDirty(false);
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
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block font-medium">Organization</label>
          <input
            type="text"
            value={profile.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
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