// Service to handle Retell API calls
export interface CreateWebCallResponse {
  access_token: string;
  call_id: string;
}

export const createWebCall = async (agentId: string): Promise<CreateWebCallResponse> => {
  // This would normally call your backend API endpoint
  // For demo purposes, we'll return a mock response
  // In production, your backend would call Retell's create-web-call API
  
  console.log("Creating web call for agent:", agentId);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response - in production this would be a real access token from Retell
  return {
    access_token: `mock_access_token_${agentId}_${Date.now()}`,
    call_id: `call_${Date.now()}`
  };
};