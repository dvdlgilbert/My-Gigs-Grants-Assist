import React, { useState } from "react";
import "./Profile.css";

export default function Profile({ onBack }: { onBack?: () => void }) {
  // Organization fields
  const [orgName, setOrgName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [mission, setMission] = useState("");
  const [goals, setGoals] = useState("");
  const [fundingObjectives, setFundingObjectives] = useState("");

  // Contact fields
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    console.log(profileData);
    alert("Profile saved (currently just logged to console).");
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
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Enter organization name"
            />
          </label>

          <label>
            Tax ID
            <input
              type="text"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              placeholder="Enter tax ID"
            />
          </label>

          <label>
            Mission
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Describe your mission"
            />
          </label>

          <label>
            Goals
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="List your goals"
            />
          </label>

          <label>
            Funding Objectives
            <textarea
              value={fundingObjectives}
              onChange={(e) => setFundingObjectives(e.target.value)}
              placeholder="Describe funding objectives"
            />
          </label>
        </fieldset>

        {/* Contact Section */}
        <fieldset>
          <legend>Contact</legend>

          <label>
            Contact Name
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Enter contact name"
            />
          </label>

          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </label>

          <label>
            Website
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
            />
          </label>
        </fieldset>

        <div className="profile-buttons">
          <button type="submit">Save Profile</button>
          <button type="button" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}