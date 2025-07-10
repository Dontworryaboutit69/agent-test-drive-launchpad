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

  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Load Retell SDK dynamically
    const loadRetellSDK = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if SDK is already loaded
        if ((window as any).RetellWebClient) {
          console.log('Retell SDK already available');
          setSdkLoaded(true);
          resolve();
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/retell-client-js-sdk@latest/dist/index.umd.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('Retell SDK script loaded');
          // Wait a bit for the global to be available
          setTimeout(() => {
            if ((window as any).RetellWebClient) {
              console.log('Retell SDK available and ready');
              setSdkLoaded(true);
              resolve();
            } else {
              console.error('Retell SDK loaded but RetellWebClient not available');
              reject(new Error('SDK loaded but not accessible'));
            }
          }, 100);
        };
        
        script.onerror = (error) => {
          console.error('Failed to load Retell SDK script:', error);
          reject(new Error('Failed to load SDK script'));
        };
        
        console.log('Loading Retell SDK...');
        document.head.appendChild(script);
      });
    };

    loadRetellSDK().catch((error) => {
      console.error('SDK loading failed:', error);
      onError?.('Failed to load voice client. Please refresh the page and try again.');
    });
  }, [onError]);

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

    if (!sdkLoaded) {
      console.log('SDK not loaded yet, current state:', sdkLoaded);
      onError?.("Voice client is still loading. Please wait a moment and try again.");
      return;
    }

    console.log('Starting call with agent:', agentId, 'SDK loaded:', sdkLoaded);

    try {
      setCallStatus("Creating web call...");
      
      // Step 1: Create web call to get access token
      const webCallResponse = await createWebCall(agentId);
      
      setCallStatus("Initializing audio...");
      
      // Step 2: Initialize Retell Web Client
      if (typeof window !== 'undefined' && (window as any).RetellWebClient) {
        const RetellWebClient = (window as any).RetellWebClient;
        retellWebClientRef.current = new RetellWebClient();

        console.log('Retell Web Client initialized successfully');

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
        throw new Error("Retell SDK not available. Please refresh the page and ensure you have internet connection.");
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
  }, [agentId, onCallStart, onTranscript, onError, sdkLoaded]);

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
    callStatus: sdkLoaded ? callStatus : "Loading SDK...",
    startCall,
    endCall
  };
};