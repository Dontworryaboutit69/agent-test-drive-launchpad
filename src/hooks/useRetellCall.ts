import { useState, useCallback, useRef } from "react";

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

  const createWebCall = async (agentId: string) => {
    // This should be called from your backend to protect API key
    // For demo purposes, we'll simulate this call
    try {
      // In production, this would be: 
      // const response = await fetch('/api/create-web-call', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ agent_id: agentId })
      // });
      
      // For now, simulate successful web call creation
      return {
        access_token: `demo_token_${Date.now()}`,
        call_id: `call_${Date.now()}`,
        agent_id: agentId
      };
    } catch (error) {
      console.error('Failed to create web call:', error);
      throw new Error('Failed to create web call');
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
      
      setCallStatus("Requesting microphone access...");
      
      // Step 2: Request microphone access
      try {
        await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 16000
          } 
        });
        console.log("Microphone access granted");
      } catch (micError) {
        throw new Error("Microphone access denied. Please allow microphone access and try again.");
      }

      setCallStatus("Connecting to agent...");
      
      // Step 3: Initialize and start the call
      // In production with real SDK:
      // const { RetellWebClient } = await import("retell-client-js-sdk");
      // retellWebClientRef.current = new RetellWebClient();
      // 
      // retellWebClientRef.current.on("conversationStarted", () => {
      //   setIsConnected(true);
      //   setIsCallActive(true);
      //   setCallStatus("Connected - Start speaking!");
      //   onCallStart?.();
      // });
      //
      // retellWebClientRef.current.on("conversationEnded", () => {
      //   setIsCallActive(false);
      //   setIsConnected(false);
      //   onCallEnd?.();
      // });
      //
      // retellWebClientRef.current.on("update", (update) => {
      //   if (update.transcript) {
      //     update.transcript.forEach((item) => {
      //       onTranscript?.({
      //         role: item.role,
      //         content: item.content,
      //         timestamp: new Date(item.timestamp)
      //       });
      //     });
      //   }
      // });
      //
      // await retellWebClientRef.current.startCall({
      //   accessToken: webCallResponse.access_token,
      // });

      // For demo purposes, simulate successful connection
      setTimeout(() => {
        setIsConnected(true);
        setIsCallActive(true);
        setCallStatus("Connected - Start speaking!");
        onCallStart?.();
        
        // Simulate initial greeting
        setTimeout(() => {
          onTranscript?.({
            role: 'agent',
            content: "Hello! I'm your AI assistant. How can I help you today?",
            timestamp: new Date()
          });
        }, 1000);
        
        // Simulate periodic responses
        const responses = [
          "I understand. Can you tell me more about that?",
          "That's interesting. What would you like to know?", 
          "I'm here to help. Is there anything specific I can assist you with?",
          "Thank you for that information. How else can I help?"
        ];
        
        let responseIndex = 0;
        const responseInterval = setInterval(() => {
          if (!retellWebClientRef.current?.isCallActive) {
            clearInterval(responseInterval);
            return;
          }
          
          onTranscript?.({
            role: 'agent',
            content: responses[responseIndex % responses.length],
            timestamp: new Date()
          });
          
          responseIndex++;
        }, 10000);
        
        // Store interval ref for cleanup
        retellWebClientRef.current = { 
          isCallActive: true,
          responseInterval,
          endCall: () => {
            clearInterval(responseInterval);
            retellWebClientRef.current.isCallActive = false;
          }
        };
        
      }, 2000);
      
      console.log("Call started successfully with agent:", agentId);
      
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus("Failed to connect");
      onError?.(error instanceof Error ? error.message : "Unknown error");
    }
  }, [agentId, onCallStart, onTranscript, onError]);

  const endCall = useCallback(async () => {
    try {
      if (retellWebClientRef.current) {
        // In production: await retellWebClientRef.current.stopCall();
        retellWebClientRef.current.endCall?.();
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