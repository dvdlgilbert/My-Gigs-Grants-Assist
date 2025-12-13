import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile({ onBack }: { onBack?: () => void }) {
  // State for all fields
  const [orgName, setOrgName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [mission, setMission] = useState("");
  const [goals, setGoals] = useState("");
  const [fundingObjectives, setFundingObjectives] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Load saved profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setOrgName(parsed.orgName || "");
      setTaxId(parsed.taxId || "");
      setMission(parsed.mission || "");
      setGoals(parsed.goals || "");
      setFundingObjectives(parsed.fundingObjectives || "");
      setContactName(parsed.contactName || "");
      setAddress(parsed.address || "");
      setPhone(parsed.phone || "");
      setEmail(parsed.email || "");
      setWebsite(parsed.website || "");
    }
  }, []);

  // Save profile to localStorage whenever fields change
  useEffect(() => {
    const profileData = {
      orgName,
      taxId,
      mission,
      goals,
      fundingObjectives,
      contactName,
      address,
      phone,
      email,
      website,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [orgName, taxId, mission, goals, fundingObjectives, contactName, address, phone, email, website]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !contactName || !email) {
      alert("Please fill in Organization Name, Contact Name, and Email before saving.");
      return;
    }
    alert("Profile saved successfully!");
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="profile-container">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Organization Section */}
        <fieldset>
          <legend>Organization</legend>
          <label>
            Organization Name
            <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
          </label>
          <label>
            Tax ID
            <input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
          </label>
          <label>
            Mission
            <textarea value={mission} onChange={(e) => setMission(e.target.value)} />
          </label>
          <label>
            Goals
            <textarea value={goals} onChange={(e) => setGoals(e.target.value)} />
          </label>
          <label>
            Funding Objectives
            <textarea value={fundingObjectives} onChange={(e) => setFundingObjectives(e.target.value)} />
          </label>
        </fieldset>

        {/* Contact Section */}
        <fieldset>
          <legend>Contact</legend>
          <label>
            Contact Name
            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </label>
          <label>
            Address
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <label>
            Phone Number
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label>
            Email Address
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Website
            <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
        </fieldset>

        <div className="profile-buttons">
          <button type="submit">Save Profile</button>
          <button type="button" onClick={handleBack}>Back to Dashboard</button>
        </div>
      </form>
    </div>
  );
}