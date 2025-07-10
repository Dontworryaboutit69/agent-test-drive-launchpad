import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const GenerateDemoUrl = () => {
  const [agentId, setAgentId] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const generateUrl = () => {
    if (!agentId.trim()) {
      toast.error("Please enter an agent ID");
      return;
    }
    
    const url = `${window.location.origin}/demo/${agentId.trim()}`;
    setGeneratedUrl(url);
    toast.success("Demo URL generated!");
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.success("URL copied to clipboard!");
  };

  const openDemo = () => {
    window.open(generatedUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow">
        <h2 className="text-2xl font-audiowide mb-4 text-primary">Generate Demo Link</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-audiowide mb-2 block text-foreground/80">
              Retell Agent ID
            </label>
            <Input
              placeholder="agent_abc123xyz..."
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  generateUrl();
                }
              }}
              className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/30 font-manrope"
            />
            <p className="text-xs text-foreground/60 mt-1 font-manrope">
              Enter the agent ID from your Retell AI dashboard
            </p>
          </div>
          
          <Button 
            onClick={generateUrl}
            disabled={!agentId.trim()}
            variant="hero"
            size="lg"
            className="w-full"
          >
            Generate Demo URL
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {generatedUrl && (
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-magenta animate-fade-in">
          <h3 className="font-audiowide mb-4 text-accent">Your Demo URL</h3>
          
          <div className="space-y-4">
            <div className="bg-background/50 p-3 rounded-lg border border-primary/20">
              <code className="text-sm font-mono text-primary break-all">
                {generatedUrl}
              </code>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={copyUrl} variant="neon" className="flex-1">
                <Copy className="w-4 h-4" />
                Copy URL
              </Button>
              
              <Button onClick={openDemo} variant="magenta" className="flex-1">
                <ExternalLink className="w-4 h-4" />
                Test Demo
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-foreground/70 font-manrope">
                Send this URL to your clients for instant AI agent testing
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};