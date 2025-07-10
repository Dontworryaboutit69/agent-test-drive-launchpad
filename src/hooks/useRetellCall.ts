import { useState, useCallback } from "react";

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

  const startCall = useCallback(async () => {
    try {
      setCallStatus("Creating call...");
      
      // Create phone call using Retell API
      const response = await fetch('https://api.retellai.com/create-phone-call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_number: null, // Web call
          to_number: null,   // Web call
          agent_id: agentId,
          metadata: {
            demo_call: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create call: ${response.statusText}`);
      }

      const callData = await response.json();
      
      setCallStatus("Connecting to agent...");
      setIsCallActive(true);
      onCallStart?.();
      
      // Here we would integrate with Retell's web client
      // For now, simulate the connection
      setTimeout(() => {
        setIsConnected(true);
        setCallStatus("Connected - Start speaking!");
        
        // Simulate some transcripts for demo
        setTimeout(() => {
          onTranscript?.({ 
            role: 'agent', 
            content: "Hello! How can I help you today?", 
            timestamp: new Date() 
          });
        }, 1000);
      }, 2000);
      
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus("Failed to connect");
      onError?.(error instanceof Error ? error.message : "Unknown error");
    }
  }, [agentId, onCallStart, onTranscript, onError]);

  const endCall = useCallback(async () => {
    try {
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