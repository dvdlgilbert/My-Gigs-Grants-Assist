import { GoogleGenAI, Type } from "@google/genai";
import type { NonprofitProfile, GrantRecommendation } from '../types';

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (!ai) {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      throw new Error("API_KEY environment variable not set. The app cannot contact the AI service.");
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
    throw new Error("Failed to get formatting help from AI. Please check your connection and API key setup.");
  }
}
