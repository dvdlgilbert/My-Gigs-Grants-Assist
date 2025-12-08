import React, { useState } from 'react';
import { findGrants } from '../services/geminiService.ts';
import type { NonprofitProfile, GrantRecommendation } from '../types.ts';
import { LightBulbIcon, PlusIcon } from './Icons.tsx';

interface GrantFinderProps {
  profile: NonprofitProfile;
  onCreateProject: (title: string, funder: string) => void;
}

const GrantFinder: React.FC<GrantFinderProps> = ({ profile, onCreateProject }) => {
  const [recommendations, setRecommendations] = useState<GrantRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindGrants = async (excludeCurrent: boolean = false) => {
    if (!profile.mission || !profile.orgName) {
      setError("Please complete your nonprofit profile before searching for grants.");
      return;
    }
    setIsLoading(true);
    setError(null);
    if (!excludeCurrent) {
      setRecommendations([]);
    }

    try {
      const grantsToExclude = excludeCurrent ? recommendations : [];
      const results = await findGrants(profile, grantsToExclude);
      setRecommendations(prev => excludeCurrent ? [...prev, ...results] : results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const isProfileComplete = profile.orgName && profile.mission && profile.goals && profile.needs;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <LightBulbIcon className="mx-auto h-12 w-12 text-brand-primary" />
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">AI Grant Finder</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">Discover grant opportunities tailored to your organization's mission.</p>
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => handleFindGrants(false)}
            disabled={isLoading || !isProfileComplete}
            className="rounded-md bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching..." : "Find Matching Grants"}
          </button>
          {recommendations.length > 0 && (
             <button
              onClick={() => handleFindGrants(true)}
              disabled={isLoading}
              className="rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Find Different Grants"}
            </button>
          )}
        </div>
        {!isProfileComplete && <p className="mt-4 text-sm text-yellow-600">Your profile is incomplete. Please fill out your organization's name, mission, goals, and needs to get the best results.</p>}
      </div>

      {error && <div className="mt-8 text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}

      <div className="mt-10">
        {isLoading && recommendations.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-brand-dark">{rec.funderName}</h3>
                <p className="text-sm font-semibold text-slate-700">{rec.grantName}</p>
                <p className="text-sm text-slate-500 mt-2">{rec.description}</p>
                <p className="text-sm text-slate-800 mt-4"><strong className="font-semibold">Why it's a match:</strong> {rec.matchReason}</p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a href={rec.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 px-3 text-sm font-medium rounded-md text-brand-primary bg-brand-secondary hover:bg-sky-100">
                  Visit Website
                </a>
                <button 
                  onClick={() => onCreateProject(rec.grantName, rec.funderName)}
                  title={`Create new project for ${rec.grantName}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrantFinder;
