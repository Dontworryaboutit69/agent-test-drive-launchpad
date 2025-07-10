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
      <div className="min-h-screen bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/80" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Card className="p-8 bg-gradient-card backdrop-blur-sm border shadow-card text-center">
              <h1 className="text-2xl font-bold mb-4">No Agent ID Provided</h1>
              <p className="text-muted-foreground mb-6">
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
                  Start Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/80" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <Button
              onClick={shareUrl}
              variant="secondary"
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
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Agent Demo
              </h1>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Agent ID:</span>
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
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
              
              <p className="text-muted-foreground">
                Start a voice conversation with your AI agent below. Click the call button to begin testing.
              </p>
            </div>
          </Card>

          {/* Settings Panel */}
          {showSettings && (
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card animate-fade-in">
              <h3 className="font-semibold mb-4">Demo Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Retell API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="key_..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Agent ID</label>
                  <Input
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    placeholder="agent_..."
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