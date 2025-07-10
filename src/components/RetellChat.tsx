import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface RetellChatProps {
  agentId: string;
  apiKey: string;
}

export const RetellChat = ({ agentId, apiKey }: RetellChatProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<string>("Ready to start");
  
  const retellWebClientRef = useRef<any>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Initialize Retell Web Client when component mounts
    initializeRetellClient();
    
    return () => {
      // Cleanup on unmount
      if (retellWebClientRef.current) {
        retellWebClientRef.current.stopCall();
      }
    };
  }, [agentId, apiKey]);

  const initializeRetellClient = async () => {
    try {
      // This would be the actual Retell Web Client initialization
      // For now, we'll simulate the integration
      console.log("Initializing Retell client with agent:", agentId);
      setCallStatus("Client initialized");
      
      // Simulate client ready state
      setTimeout(() => {
        setIsConnected(true);
        setCallStatus("Ready to start call");
      }, 1000);
      
    } catch (error) {
      console.error("Failed to initialize Retell client:", error);
      toast.error("Failed to initialize voice client");
    }
  };

  const startCall = async () => {
    if (!isConnected) {
      toast.error("Voice client not ready");
      return;
    }

    setIsLoading(true);
    setCallStatus("Connecting...");

    try {
      // This would integrate with the actual Retell Web Client
      // For demonstration, we'll simulate the call flow
      
      console.log("Starting call with agent:", agentId);
      
      // Simulate call connection
      setTimeout(() => {
        setIsCallActive(true);
        setIsLoading(false);
        setCallStatus("Call active - Speak now!");
        toast.success("Connected! Start speaking to your AI agent.");
      }, 2000);
      
    } catch (error) {
      console.error("Failed to start call:", error);
      toast.error("Failed to start call");
      setIsLoading(false);
      setCallStatus("Call failed");
    }
  };

  const endCall = () => {
    if (retellWebClientRef.current) {
      retellWebClientRef.current.stopCall();
    }
    
    setIsCallActive(false);
    setIsLoading(false);
    setCallStatus("Call ended");
    toast.info("Call ended");
    
    // Reset to ready state after a moment
    setTimeout(() => {
      setCallStatus("Ready to start call");
    }, 2000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Would integrate with actual mute functionality
    toast.info(isMuted ? "Unmuted" : "Muted");
  };

  return (
    <div className="space-y-6">
      {/* Call Status */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isCallActive ? 'bg-primary animate-pulse shadow-glow' : 
              isConnected ? 'bg-brand-cyber-yellow shadow-[0_0_10px_rgba(254,221,77,0.5)]' : 'bg-accent'
            }`} />
            <span className="font-audiowide text-sm">
              {isCallActive ? 'Call Active' : isConnected ? 'Ready' : 'Connecting...'}
            </span>
          </div>
          
          <p className="text-sm text-foreground/60 font-manrope">
            Agent ID: <code className="bg-background/50 px-2 py-1 rounded text-xs font-mono text-primary border border-primary/20">{agentId}</code>
          </p>
          
          <p className="text-sm font-audiowide text-accent">{callStatus}</p>
        </div>
      </Card>

      {/* Call Controls */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-card">
        <div className="flex justify-center space-x-4">
          {!isCallActive ? (
            <Button
              onClick={startCall}
              disabled={!isConnected || isLoading}
              variant="hero"
              size="lg"
              className="px-8"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Start Call
                </>
              )}
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "magenta"}
                size="lg"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={endCall}
                variant="destructive"
                size="lg"
                className="px-8"
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-background/30 border-dashed border-primary/30 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h4 className="font-audiowide text-primary">How to test:</h4>
          <div className="text-sm text-foreground/70 space-y-1 font-manrope">
            <p>1. Click "Start Call" to connect to your Voice AI agent</p>
            <p>2. Allow microphone access when prompted by your browser</p>
            <p>3. Speak naturally - the agent will respond in real-time</p>
            <p>4. Use mute button to pause your microphone input</p>
          </div>
        </div>
      </Card>

      {/* Hidden audio element for call audio */}
      <audio ref={audioElementRef} autoPlay />
    </div>
  );
};