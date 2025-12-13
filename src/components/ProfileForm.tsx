import React, { useState, useEffect } from "react";
import type { NonprofitProfile } from "../types";
import ProfileForm from "../components/ProfileForm";

const STORAGE_KEY = "nonprofit_profile";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<NonprofitProfile>({
    orgName: "",
    taxId: "",
    mission: "",
    goals: "",
    needs: "",
    address: "",
    contactName: "",
    contactPhone: "",
    email: "",
    website: "",
  });

  // Load saved profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        console.warn("Invalid profile JSON in localStorage");
      }
    }
  }, []);

  const handleSaveProfile = (updatedProfile: NonprofitProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    alert("✅ Profile saved successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Nonprofit Profile</h2>
      <ProfileForm
        profile={profile}
        onSave={handleSaveProfile}
        onBack={() => console.log("Back to dashboard")}
      />
    </div>
  );
};

export default Profile;