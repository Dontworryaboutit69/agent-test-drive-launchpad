// Service to handle Retell API calls
export interface CreateWebCallResponse {
  access_token: string;
  call_id: string;
}

export const createWebCall = async (agentId: string): Promise<CreateWebCallResponse> => {
  console.log("Creating web call for agent:", agentId);
  
  // Get API key from localStorage
  const apiKey = localStorage.getItem('retell-api-key');
  if (!apiKey) {
    throw new Error("Please configure your Retell API key first");
  }
  
  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Retell API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return {
      access_token: data.access_token,
      call_id: data.call_id
    };
    
  } catch (error) {
    console.error("Failed to create web call:", error);
    throw error;
  }
};