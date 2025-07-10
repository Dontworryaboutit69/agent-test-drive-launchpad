import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Zap, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const [agentId, setAgentId] = useState("");
  const navigate = useNavigate();

  const handleStartDemo = () => {
    if (agentId.trim()) {
      navigate(`/demo?agent=${agentId.trim()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStartDemo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/80" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border shadow-card">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI Agent Demo Platform</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Test Your AI Agents
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Instantly</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience your custom AI agents in real-time. Just paste your agent ID and start chatting - no setup required.
          </p>
        </div>

        {/* Demo Input */}
        <div className="max-w-md mx-auto mb-16 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Enter Agent ID</label>
                <Input
                  placeholder="e.g. agent_abc123..."
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              <Button 
                onClick={handleStartDemo}
                disabled={!agentId.trim()}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Start Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-muted-foreground">
              Voice and text conversations directly in your browser. No phone calls needed.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Setup</h3>
            <p className="text-muted-foreground">
              Just paste your agent ID and start testing immediately. Zero configuration required.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-Client</h3>
            <p className="text-muted-foreground">
              Multiple clients can test different agents simultaneously without interference.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <p className="text-muted-foreground mb-4">
            Ready to demo? Share this link with your agent ID:
          </p>
          <code className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border text-sm">
            {window.location.origin}/demo?agent=YOUR_AGENT_ID
          </code>
        </div>
      </div>
    </div>
  );
};