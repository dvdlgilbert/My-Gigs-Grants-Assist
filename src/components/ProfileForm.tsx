import React, { useState } from "react";
import type { NonprofitProfile } from "../types";


export interface ProfileFormProps {
  profile: NonprofitProfile;
  onSave: (profile: NonprofitProfile) => void;
  onBack: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave, onBack }) => {
  const [formData, setFormData] = useState<NonprofitProfile>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 border rounded-md bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Nonprofit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Example field */}
        <div>
          <label className="block text-sm font-semibold mb-1">Organization Name</label>
          <input
            type="text"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
        {/* … include the rest of your fields here … */}

        <div className="flex space-x-2 mt-4">
          <button
            type="submit"
            className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-secondary"
          >
            Save Profile
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-slate-200 px-4 py-2 rounded-md hover:bg-slate-300"
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;