import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConversationTranscript } from "@/components/ConversationTranscript";
import { useRetellCall } from "@/hooks/useRetellCall";
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

interface Transcript {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

const Demo = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [isMuted, setIsMuted] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);

  const { isConnected, isCallActive, callStatus, startCall, endCall } = useRetellCall({
    agentId: agentId || '',
    onCallStart: () => {
      toast.success("Connected to your AI agent!");
    },
    onCallEnd: () => {
      toast.info("Call ended");
    },
    onTranscript: (transcript) => {
      setTranscripts(prev => [...prev, transcript]);
    },
    onError: (error) => {
      toast.error(`Call error: ${error}`);
    }
  });

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
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors font-manrope">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/9f080a38-d1b4-4473-8c2e-f32b994e43d6.png" 
              alt="RevSquared AI Logo" 
              className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,229,214,0.3)]"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Demo Header */}
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow mb-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-audiowide bg-gradient-neon bg-clip-text text-transparent">
                Voice AI Agent Demo
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-foreground/60 font-manrope">Agent ID:</span>
                <code className="bg-background/50 px-2 py-1 rounded text-sm font-mono text-primary border border-primary/20">
                  {agentId}
                </code>
              </div>
              
              <p className="text-foreground/70 font-manrope">
                Click "Start Call" below to begin your conversation with this AI agent
              </p>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Call Controls */}
            <div className="space-y-6">
              {/* Status Card */}
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
                  
                  <p className="text-sm font-audiowide text-accent">{callStatus}</p>
                </div>
              </Card>

              {/* Call Controls */}
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-card">
                <div className="flex justify-center space-x-4">
                  {!isCallActive ? (
                    <Button
                      onClick={startCall}
                      disabled={!agentId}
                      variant="hero"
                      size="lg"
                      className="px-8"
                    >
                      <Phone className="w-5 h-5" />
                      Start Call
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
                  <h4 className="font-audiowide text-primary">How to use:</h4>
                  <div className="text-sm text-foreground/70 space-y-1 font-manrope">
                    <p>1. Click "Start Call" to connect to the AI agent</p>
                    <p>2. Allow microphone access when prompted</p>
                    <p>3. Speak naturally - the agent will respond instantly</p>
                    <p>4. Watch the live transcript on the right</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Live Transcript */}
            <ConversationTranscript transcripts={transcripts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;