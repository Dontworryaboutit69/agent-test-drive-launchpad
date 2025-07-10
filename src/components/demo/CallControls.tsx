import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";

interface CallControlsProps {
  isCallActive: boolean;
  isConnected: boolean;
  isStarting: boolean;
  callStatus: string;
  isMuted: boolean;
  agentId: string;
  onStartCall: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
}

export const CallControls = ({
  isCallActive,
  isConnected,
  isStarting,
  callStatus,
  isMuted,
  agentId,
  onStartCall,
  onEndCall,
  onToggleMute
}: CallControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isCallActive ? 'bg-primary animate-pulse shadow-glow' : 
              isConnected ? 'bg-brand-cyber-yellow shadow-[0_0_10px_rgba(254,221,77,0.5)]' : 
              callStatus.includes('Loading') ? 'bg-blue-500 animate-spin' : 'bg-accent'
            }`} />
            <span className="font-audiowide text-sm">
              {isCallActive ? 'Call Active' : isConnected ? 'Ready' : 'Initializing...'}
            </span>
          </div>
          
          <p className="text-sm font-audiowide text-accent">{callStatus}</p>
        </div>
      </Card>

      {/* Call Controls */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-card">
        <div className="flex justify-center space-x-4">
          {!isCallActive ? (
            <Button
              onClick={onStartCall}
              disabled={!agentId || isStarting || isCallActive}
              variant="hero"
              size="lg"
              className="px-8"
            >
              <Phone className="w-5 h-5" />
              {isStarting ? 'Starting...' : 'Start Call'}
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button
                onClick={onToggleMute}
                variant={isMuted ? "destructive" : "magenta"}
                size="lg"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={onEndCall}
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
        
        {/* Debug info - remove this later */}
        <div className="text-center mt-4 text-xs text-foreground/50">
          Debug: isCallActive={isCallActive ? 'true' : 'false'}, isStarting={isStarting ? 'true' : 'false'}
        </div>
      </Card>
    </div>
  );
};