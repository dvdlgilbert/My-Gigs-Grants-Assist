import { GoogleGenAI, Type } from "@google/genai";
import type { NonprofitProfile, GrantRecommendation } from '../types.ts';

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (!ai) {
    // Gracefully handle environments where `process` is not defined (e.g., GitHub Pages).
    const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
    
    if (!API_KEY) {
      // This error will now be caught by the calling components and displayed in the UI.
      throw new Error("API key is missing. AI features are unavailable. Please configure your deployment environment.");
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
}


export async function findGrants(profile: NonprofitProfile): Promise<GrantRecommendation[]> {
  const prompt = `
    Based on the following nonprofit profile, identify 5-7 potential grant opportunities. 
    For each, provide the funder name, grant name, a brief description, a website URL, and a reason why it's a good match.

    Organization Name: ${profile.orgName}
    Mission: ${profile.mission}
    Goals: ${profile.goals}
    Needs: ${profile.needs}

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
    const recommendations: GrantRecommendation[] = JSON.parse(jsonString);
    return recommendations;
  } catch (error) {
    console.error("Error finding grants:", error);
    if (error instanceof Error && error.message.includes("API key is missing")) {
      throw error;
    }
    throw new Error("Failed to fetch grant recommendations from AI. Please check your connection and API key setup.");
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
    if (error instanceof Error && error.message.includes("API key is missing")) {
      throw error;
    }
    throw new Error("Failed to get formatting help from AI. Please check your connection and API key setup.");
  }
}
