import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRetellCall } from "@/hooks/useRetellCall";
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff, Settings } from "lucide-react";
import { toast } from "sonner";

const Demo = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [isMuted, setIsMuted] = useState(false);
  const [notes, setNotes] = useState("");
  const [apiKey, setApiKey] = useState(localStorage.getItem('retell-api-key') || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem('retell-api-key'));

  const { isConnected, isCallActive, callStatus, startCall, endCall } = useRetellCall({
    agentId: agentId || '',
    onCallStart: () => {
      toast.success("Connected to your AI agent!");
    },
    onCallEnd: () => {
      toast.info("Call ended");
    },
    onError: (error) => {
      toast.error(`Call error: ${error}`);
    }
  });

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Unmuted" : "Muted");
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your Retell API key");
      return;
    }
    localStorage.setItem('retell-api-key', apiKey);
    setShowApiKeyInput(false);
    toast.success("API key saved locally");
  };

  const clearApiKey = () => {
    localStorage.removeItem('retell-api-key');
    setApiKey("");
    setShowApiKeyInput(true);
    toast.info("API key cleared");
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

          {/* API Key Setup */}
          {showApiKeyInput && (
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-orange-500/20 shadow-card mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-400" />
                  <h3 className="text-lg font-audiowide text-orange-400">API Key Required</h3>
                </div>
                
                <p className="text-sm text-foreground/70 font-manrope">
                  Enter your Retell API key to test the voice agent. The key will be stored locally in your browser.
                </p>
                
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="Enter your Retell API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1 bg-background/50 border-orange-500/20 focus:border-orange-400"
                  />
                  <Button onClick={saveApiKey} variant="outline">
                    Save
                  </Button>
                </div>
                
                <p className="text-xs text-foreground/50 font-manrope">
                  ⚠️ This stores the API key in your browser's localStorage for testing only. For production, use a secure backend.
                </p>
              </div>
            </Card>
          )}

          {!showApiKeyInput && (
            <Card className="p-4 bg-gradient-card backdrop-blur-sm border border-green-500/20 shadow-card mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-audiowide text-green-400">API Key Configured</span>
                </div>
                <Button onClick={clearApiKey} variant="outline" size="sm">
                  Change Key
                </Button>
              </div>
            </Card>
          )}

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
                      onClick={startCall}
                      disabled={!agentId || callStatus.includes('Loading')}
                      variant="hero"
                      size="lg"
                      className="px-8"
                    >
                      <Phone className="w-5 h-5" />
                      {callStatus.includes('Loading') ? 'Loading...' : 'Start Call'}
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
                  <h4 className="font-audiowide text-primary">Setup Required:</h4>
                  <div className="text-sm text-foreground/70 space-y-1 font-manrope">
                    <p>1. Create a backend endpoint that calls Retell's create-web-call API</p>
                    <p>2. Use your Retell API key in the backend (never in frontend)</p>
                    <p>3. Update the createWebCall function to call your backend</p>
                    <p>4. Then test the agent with real voice calls</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Notes Section */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card">
                <div className="space-y-4">
                  <h3 className="text-lg font-audiowide text-primary">Notes & Feedback</h3>
                  <p className="text-sm text-foreground/60 font-manrope">
                    Write down any feedback, suggestions, or notes while testing the agent
                  </p>
                  
                  <Textarea
                    placeholder="Type your notes here while speaking with the agent..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[300px] resize-none bg-background/50 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/40 font-manrope"
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-foreground/40 font-manrope">
                      {notes.length} characters
                    </span>
                    
                    <Button
                      onClick={() => setNotes("")}
                      variant="outline"
                      size="sm"
                      disabled={!notes.trim()}
                    >
                      Clear Notes
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;