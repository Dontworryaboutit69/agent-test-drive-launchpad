import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRetellCall } from "@/hooks/useRetellCall";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { CallControls } from "@/components/demo/CallControls";
import { NotesSection } from "@/components/demo/NotesSection";
import { InstructionsCard } from "@/components/demo/InstructionsCard";

const Demo = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [isMuted, setIsMuted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const { isConnected, isCallActive, callStatus, startCall: originalStartCall, endCall: originalEndCall } = useRetellCall({
    agentId: agentId || '',
    onCallStart: () => {
      setIsStarting(false);
      toast.success("Connected to your AI agent!");
    },
    onCallEnd: () => {
      setIsStarting(false);
      toast.info("Call ended");
    },
    onError: (error) => {
      setIsStarting(false);
      toast.error(`Call error: ${error}`);
    }
  });

  const handleStartCall = async () => {
    if (isStarting || isCallActive) return;
    setIsStarting(true);
    await originalStartCall();
  };

  const handleEndCall = async () => {
    await originalEndCall();
    setIsStarting(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Unmuted" : "Muted");
  };

  if (!agentId) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-8 transition-colors font-manrope">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Card className="p-8 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow">
              <h1 className="text-2xl font-audiowide mb-4 text-primary">Invalid Demo Link</h1>
              <p className="text-foreground/70 mb-6 font-manrope">
                This demo link appears to be invalid. Please check the URL or contact support.
              </p>
              
              <Link to="/">
                <Button variant="hero" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <DemoHeader agentId={agentId} />

        <div className="max-w-4xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Call Controls */}
            <div className="space-y-6">
              <CallControls
                isCallActive={isCallActive}
                isConnected={isConnected}
                isStarting={isStarting}
                callStatus={callStatus}
                isMuted={isMuted}
                agentId={agentId}
                onStartCall={handleStartCall}
                onEndCall={handleEndCall}
                onToggleMute={toggleMute}
              />

              <InstructionsCard />
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <NotesSection 
                notes={notes}
                setNotes={setNotes}
                agentId={agentId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;