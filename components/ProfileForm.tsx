
import React, { useState } from 'react';
import type { NonprofitProfile } from '../types';

interface ProfileFormProps {
  profile: NonprofitProfile;
  onSave: (profile: NonprofitProfile) => void;
}

const InputField: React.FC<{ label: string; id: keyof NonprofitProfile; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; }> = ({ label, id, value, onChange, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <input
            type="text"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
    </div>
);

const TextAreaField: React.FC<{ label: string; id: keyof NonprofitProfile; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number; }> = ({ label, id, value, onChange, rows = 4 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            rows={rows}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        />
    </div>
);


const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<NonprofitProfile>(profile);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Nonprofit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Organization Name" id="orgName" value={formData.orgName} onChange={handleChange} required />
            <InputField label="501(c)(3) Tax ID" id="taxId" value={formData.taxId} onChange={handleChange} required />
        </div>
        <TextAreaField label="Mission Statement" id="mission" value={formData.mission} onChange={handleChange} />
        <TextAreaField label="Organizational Goals" id="goals" value={formData.goals} onChange={handleChange} />
        <TextAreaField label="Current Needs / Funding Gaps" id="needs" value={formData.needs} onChange={handleChange} />
        
        <h2 className="text-xl font-semibold text-slate-700 pt-4 border-t border-slate-200">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Point of Contact" id="contactName" value={formData.contactName} onChange={handleChange} />
            <InputField label="Contact Phone" id="contactPhone" value={formData.contactPhone} onChange={handleChange} />
            <InputField label="Website" id="website" value={formData.website} onChange={handleChange} />
            <InputField label="Address" id="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="flex justify-end items-center gap-4 pt-4">
            {showSuccess && <p className="text-green-600">Profile saved successfully!</p>}
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                Save Profile
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
