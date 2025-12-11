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
        {/* Organization Name + Tax ID side by side */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Organization Name</label>
            <input
              type="text"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Tax ID</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm"
            />
          </div>
        </div>

        {/* Mission */}
        <div>
          <label className="block text-sm font-semibold mb-1">Mission</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
            rows={3}
          />
        </div>

        {/* Goals */}
        <div>
          <label className="block text-sm font-semibold mb-1">Goals</label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
            rows={3}
          />
        </div>

        {/* Needs */}
        <div>
          <label className="block text-sm font-semibold mb-1">Needs</label>
          <textarea
            name="needs"
            value={formData.needs}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
            rows={3}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Contact Name</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-semibold mb-1">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold mb-1">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        {/* Buttons */}
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