
import { GoogleGenAI, Type } from "@google/genai";
import type { NonprofitProfile, GrantRecommendation } from '../types.ts';

function getAiInstance(): GoogleGenAI {
  // Use localStorage to retrieve the API key, as it's set by the user in the UI.
  const apiKeyFromStorage = localStorage.getItem('gemini-api-key');
  
  if (!apiKeyFromStorage) {
    throw new Error("Gemini API Key not found. Please add your key in the header above to use AI features.");
  }

  // The key is stored as a JSON string (e.g., "\"your_key\""), so it needs to be parsed.
  let apiKey: string;
  try {
    apiKey = JSON.parse(apiKeyFromStorage);
  } catch (e) {
    console.error("Could not parse the API Key from storage:", e);
    throw new Error("Could not read the API Key from storage. Please try entering it again.");
  }

  if (!apiKey) {
    throw new Error("Gemini API Key is empty. Please add your key in the header above to use AI features.");
  }
  
  return new GoogleGenAI({ apiKey });
}

export async function findGrants(profile: NonprofitProfile, excludeGrants: GrantRecommendation[] = []): Promise<GrantRecommendation[]> {
  let exclusionPrompt = '';
  if (excludeGrants.length > 0) {
    const exclusionList = excludeGrants.map(g => `- ${g.grantName} by ${g.funderName}`).join('\n');
    exclusionPrompt = `\n\nPlease provide a new list of different grants. Do NOT include any of the following previously recommended grants:\n${exclusionList}`;
  }

  const prompt = `
    Based on the following nonprofit profile, identify 5-7 potential grant opportunities. 
    For each, provide the funder name, grant name, a brief description, a website URL, and a reason why it's a good match.

    Organization Name: ${profile.orgName}
    Mission: ${profile.mission}
    Goals: ${profile.goals}
    Needs: ${profile.needs}
    ${exclusionPrompt}
    Return the data in a valid JSON array format. Do not include any introductory text or markdown formatting.
  `;

  try {
    const aiClient = getAiInstance();
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              funderName: { type: Type.STRING },
              grantName: { type: Type.STRING },
              description: { type: Type.STRING },
              website: { type: Type.STRING },
              matchReason: { type: Type.STRING },
            },
            required: ["funderName", "grantName", "description", "website", "matchReason"],
          },
        },
      },
    });

    const jsonString = response.text;
    return JSON.parse(jsonString) as GrantRecommendation[];
  } catch (error) {
    console.error("Error finding grants:", error);
    // Re-throw the original error if it's a user-facing one from getAiInstance, 
    // otherwise throw a generic one for network/API issues.
    if (error instanceof Error && error.message.includes("API Key")) {
      throw error;
    }
    throw new Error("Failed to fetch grant recommendations. Please check your connection and API key.");
  }
}

export async function getFormattingHelp(proposalText: string, grantInfo: string): Promise<string> {
  const prompt = `
    Act as a professional grant writing consultant. Review the following grant proposal draft. 
    Provide constructive feedback and suggestions for improvement, focusing on clarity, impact, and alignment with the funder's likely priorities. 
    Rewrite sections where necessary to improve flow and persuasiveness.
    The response should be formatted as clean markdown.

    Funder Information:
    ${grantInfo}

    Proposal Draft:
    ---
    ${proposalText}
    ---
  `;

  try {
    const aiClient = getAiInstance();
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting formatting help:", error);
    if (error instanceof Error && error.message.includes("API Key")) {
      throw error;
    }
    throw new Error("Failed to get formatting help. Please check your connection and API key.");
