// src/utils/api.ts

export interface GrantResult {
  id: number;
  name: string;
  amount: number;
}

// ✅ Helper to check mode (mock vs real)
export const getApiMode = (): boolean => {
  return localStorage.getItem("useRealApi") === "true";
};

// ✅ Helper to get saved API key
export const getApiKey = (): string | null => {
  return localStorage.getItem("apiKey");
};

// ✅ Unified fetch function for grants
export const fetchGrants = async (): Promise<GrantResult[]> => {
  const useRealApi = getApiMode();

  if (useRealApi) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("No API key saved. Please enter one in the API Key page.");
    }

    const response = await fetch(`https://your-real-api.com/search?key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Adjust mapping depending on your API response shape
    return data.items.map((item: any, index: number) => ({
      id: index,
      name: item.name || "Unnamed Grant",
      amount: item.amount || 0,
    }));
  } else {
    // ✅ Mock data
    return [
      { id: 1, name: "Mock Grant A", amount: 5000 },
      { id: 2, name: "Mock Grant B", amount: 10000 },
      { id: 3, name: "Mock Grant C", amount: 7500 },
    ];
  }
};

// ✅ Sync mock records into the real API
export const syncMockGrants = async (mockGrants: GrantResult[]): Promise<void> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("No API key saved. Cannot sync mock grants.");
  }

  for (const grant of mockGrants) {
    try {
      const response = await fetch("https://your-real-api.com/grants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          name: grant.name,
          amount: grant.amount,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to sync grant ${grant.name}: ${response.status}`);
      }
    } catch (err) {
      console.error("Error syncing grant:", err);
    }
  }
};