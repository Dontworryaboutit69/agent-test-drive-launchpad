import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RetellChat } from "@/components/RetellChat";
import { ArrowLeft, Settings, Share2, Copy } from "lucide-react";
import { toast } from "sonner";

const Demo = () => {
  const [searchParams] = useSearchParams();
  const [agentId, setAgentId] = useState("");
  const [apiKey, setApiKey] = useState("key_8df001c67b7aaa1c91c4401c580d");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const urlAgentId = searchParams.get("agent");
    if (urlAgentId) {
      setAgentId(urlAgentId);
    }
  }, [searchParams]);

  const shareUrl = () => {
    const url = `${window.location.origin}/demo?agent=${agentId}`;
    navigator.clipboard.writeText(url);
    toast.success("Demo URL copied to clipboard!");
  };

  const copyAgentId = () => {
    navigator.clipboard.writeText(agentId);
    toast.success("Agent ID copied to clipboard!");
  };

  if (!agentId) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-8 transition-colors font-manrope">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Card className="p-8 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow text-center">
              <h1 className="text-2xl font-audiowide mb-4 text-primary">No Agent ID Provided</h1>
              <p className="text-foreground/70 mb-6 font-manrope">
                Please provide an agent ID in the URL or enter one below to start the demo.
              </p>
              
              <div className="space-y-4">
                <Input
                  placeholder="Enter Agent ID..."
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && agentId.trim()) {
                      window.location.href = `/demo?agent=${agentId.trim()}`;
                    }
                  }}
                  className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary font-manrope"
                />
                <Button
                  onClick={() => {
                    if (agentId.trim()) {
                      window.location.href = `/demo?agent=${agentId.trim()}`;
                    }
                  }}
                  disabled={!agentId.trim()}
                  variant="hero"
                  className="w-full"
                >
                  Launch Demo
                </Button>
              </div>
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

          <div className="flex items-center gap-3">
            <Button
              onClick={shareUrl}
              variant="neon"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
              Share Demo
            </Button>
            
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="outline"
              size="sm"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Demo Header */}
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow">
            <div className="text-center space-y-4">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/9f080a38-d1b4-4473-8c2e-f32b994e43d6.png" 
                  alt="RevSquared AI Logo" 
                  className="h-16 w-auto drop-shadow-[0_0_20px_rgba(0,229,214,0.3)]"
                />
              </div>
              
              <h1 className="text-3xl font-audiowide bg-gradient-neon bg-clip-text text-transparent">
                Voice AI Agent Demo
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-foreground/60 font-manrope">Agent ID:</span>
                <code className="bg-background/50 px-2 py-1 rounded text-sm font-mono text-primary border border-primary/20">
                  {agentId}
                </code>
                <Button
                  onClick={copyAgentId}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              
              <p className="text-foreground/70 font-manrope">
                Start a voice conversation with your custom AI agent. Click the button below to begin testing.
              </p>
            </div>
          </Card>

          {/* Settings Panel */}
          {showSettings && (
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-magenta animate-fade-in">
              <h3 className="font-audiowide mb-4 text-accent">Demo Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-audiowide mb-2 block text-primary">Retell API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="key_..."
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary font-manrope"
                  />
                  <p className="text-xs text-foreground/60 mt-1 font-manrope">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-audiowide mb-2 block text-accent">Agent ID</label>
                  <Input
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    placeholder="agent_..."
                    className="bg-background/50 backdrop-blur-sm border-accent/30 focus:border-accent font-manrope"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Chat Interface */}
          <RetellChat agentId={agentId} apiKey={apiKey} />
        </div>
      </div>
    </div>
  );
};

export default Demo;