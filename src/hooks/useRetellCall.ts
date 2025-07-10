import { useState, useCallback, useRef, useEffect } from "react";

const RETELL_API_KEY = "key_8df001c67b7aaa1c91c4401c580d";

interface UseRetellCallParams {
  agentId: string;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onTranscript?: (transcript: { role: 'agent' | 'user'; content: string; timestamp: Date }) => void;
  onError?: (error: string) => void;
}

export const useRetellCall = ({ 
  agentId, 
  onCallStart, 
  onCallEnd, 
  onTranscript,
  onError 
}: UseRetellCallParams) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<string>("Ready to start");
  const retellWebClientRef = useRef<any>(null);

  useEffect(() => {
    // Load Retell SDK dynamically
    const loadRetellSDK = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/retell-client-js-sdk@2.0.10/dist/retell-client-js-sdk.umd.js';
        script.onload = () => {
          console.log('Retell SDK loaded successfully');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Retell SDK:', error);
      }
    };

    loadRetellSDK();
  }, []);

  const createWebCall = async (agentId: string) => {
    try {
      // Create web call using Retell API
      const response = await fetch('https://api.retellai.com/v2/create-web-call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agentId,
          metadata: {
            demo_call: true,
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Create web call failed:', response.status, errorData);
        throw new Error(`Failed to create web call: ${response.status} ${response.statusText}`);
      }

      const callData = await response.json();
      console.log('Web call created successfully:', callData);
      return callData;
      
    } catch (error) {
      console.error('Error creating web call:', error);
      throw error;
    }
  };

  const startCall = useCallback(async () => {
    if (!agentId) {
      onError?.("No agent ID provided");
      return;
    }

    try {
      setCallStatus("Creating web call...");
      
      // Step 1: Create web call to get access token
      const webCallResponse = await createWebCall(agentId);
      
      setCallStatus("Initializing audio...");
      
      // Step 2: Initialize Retell Web Client
      if (typeof window !== 'undefined' && (window as any).RetellWebClient) {
        const RetellWebClient = (window as any).RetellWebClient;
        retellWebClientRef.current = new RetellWebClient();

        // Set up event listeners
        retellWebClientRef.current.on("conversationStarted", () => {
          console.log("Conversation started");
          setIsConnected(true);
          setIsCallActive(true);
          setCallStatus("Connected - Start speaking!");
          onCallStart?.();
        });

        retellWebClientRef.current.on("conversationEnded", ({ code, reason }: { code: number; reason: string }) => {
          console.log("Conversation ended:", code, reason);
          setIsCallActive(false);
          setIsConnected(false);
          setCallStatus("Call ended");
          onCallEnd?.();
        });

        retellWebClientRef.current.on("error", (error: any) => {
          console.error("Retell client error:", error);
          setCallStatus("Call failed");
          onError?.(`Call error: ${error.message || error}`);
        });

        retellWebClientRef.current.on("update", (update: any) => {
          console.log("Call update:", update);
          
          // Handle transcript updates
          if (update.transcript && Array.isArray(update.transcript)) {
            update.transcript.forEach((item: any) => {
              if (item.content && item.role) {
                onTranscript?.({
                  role: item.role as 'agent' | 'user',
                  content: item.content,
                  timestamp: new Date()
                });
              }
            });
          }
        });

        setCallStatus("Connecting to agent...");

        // Step 3: Start the call with access token
        await retellWebClientRef.current.startCall({
          accessToken: webCallResponse.access_token,
          sampleRate: 24000,
          enableUpdate: true,
        });

        console.log("Call started successfully with agent:", agentId);
        
      } else {
        throw new Error("Retell SDK not loaded. Please refresh the page and try again.");
      }
      
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus("Failed to connect");
      setIsConnected(false);
      setIsCallActive(false);
      
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      onError?.(errorMessage);
    }
  }, [agentId, onCallStart, onTranscript, onError]);

  const endCall = useCallback(async () => {
    try {
      if (retellWebClientRef.current) {
        await retellWebClientRef.current.stopCall();
      }
      
      setIsCallActive(false);
      setIsConnected(false);
      setCallStatus("Call ended");
      onCallEnd?.();
      
      // Reset after a moment
      setTimeout(() => {
        setCallStatus("Ready to start");
      }, 2000);
      
    } catch (error) {
      console.error('Failed to end call:', error);
      onError?.(error instanceof Error ? error.message : "Unknown error");
    }
  }, [onCallEnd, onError]);

  return {
    isConnected,
    isCallActive,
    callStatus,
    startCall,
    endCall
  };
};