import { useState, useCallback, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import { createWebCall } from "@/services/retellService";

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
  const retellWebClientRef = useRef<RetellWebClient | null>(null);

  const startCall = useCallback(async () => {
    if (!agentId) {
      onError?.("No agent ID provided");
      return;
    }

    try {
      setCallStatus("Connecting to agent...");
      console.log("🚀 Starting call with agent:", agentId);
      
      // Initialize Retell Web Client
      retellWebClientRef.current = new RetellWebClient();
      
      // Set up event listeners
      retellWebClientRef.current.on("conversationStarted", () => {
        console.log("✅ Conversation started");
        setIsConnected(true);
        setIsCallActive(true);
        setCallStatus("Connected - Speaking with agent");
        onCallStart?.();
      });

      retellWebClientRef.current.on("conversationEnded", ({ code, reason }) => {
        console.log("🛑 Conversation ended:", { code, reason });
        setIsCallActive(false);
        setIsConnected(false);
        setCallStatus("Call ended");
        onCallEnd?.();
      });

      retellWebClientRef.current.on("error", (error) => {
        console.error("❌ Retell error:", error);
        setCallStatus("Call failed");
        setIsConnected(false);
        setIsCallActive(false);
        onError?.(error.message || "Call failed");
      });

      retellWebClientRef.current.on("update", (update) => {
        // Handle transcript updates
        if (update.transcript) {
          for (const transcript of update.transcript) {
            onTranscript?.({
              role: transcript.role,
              content: transcript.content,
              timestamp: new Date(transcript.timestamp)
            });
          }
        }
      });

      // Get access token from backend service
      setCallStatus("Getting access token...");
      const callResponse = await createWebCall(agentId);
      
      setCallStatus("Starting call...");
      await retellWebClientRef.current.startCall({
        accessToken: callResponse.access_token
      });
      
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      setCallStatus("Failed to connect");
      setIsConnected(false);
      setIsCallActive(false);
      
      let errorMessage = "Failed to connect to agent. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      onError?.(errorMessage);
    }
  }, [agentId, onCallStart, onTranscript, onError]);

  const endCall = useCallback(async () => {
    try {
      console.log("🛑 Ending call...");
      
      if (retellWebClientRef.current) {
        retellWebClientRef.current.stopCall();
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
      console.error('❌ Failed to end call:', error);
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