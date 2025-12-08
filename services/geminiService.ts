import { GoogleGenAI, Type } from "@google/genai";
import type { NonprofitProfile, GrantRecommendation } from '../types.ts';

function getAiInstance(): GoogleGenAI {
  // Safely access process.env to prevent crashes in environments where process is undefined
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please check your environment variables.");
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
      model: 'gemini-2.5-flash',
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
    if (!jsonString) {
        throw new Error("Received empty response from AI.");
    }
    return JSON.parse(jsonString) as GrantRecommendation[];
  } catch (error) {
    console.error("Error finding grants:", error);
    // Surface the actual error message to the UI
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch grants: ${errorMessage}`);
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
    return response.text || "No suggestions generated.";
  } catch (error) {
    console.error("Error getting formatting help:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to get formatting help: ${errorMessage}`);
  }
}
