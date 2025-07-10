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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-cyber-yellow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/9f080a38-d1b4-4473-8c2e-f32b994e43d6.png" 
              alt="RevSquared AI Logo" 
              className="h-24 w-auto drop-shadow-[0_0_20px_rgba(0,229,214,0.5)]"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/30 shadow-glow">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-audiowide text-primary">Voice AI Agent Testing Platform</span>
          </div>
          
          <h1 className="text-6xl font-audiowide font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent drop-shadow-lg">
            Test Your AI Agents
            <br />
            <span className="text-5xl">Like It's 2095</span>
          </h1>
          
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-manrope">
            Experience your custom Voice AI agents in real-time. Just paste your agent ID and start the demo - 
            <span className="text-primary font-semibold"> no setup required</span>.
          </p>
        </div>

        {/* Demo Input */}
        <div className="max-w-md mx-auto mb-16 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-audiowide mb-2 block text-primary">Enter Agent ID</label>
                <Input
                  placeholder="e.g. agent_abc123..."
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/30 font-manrope"
                />
              </div>
              <Button 
                onClick={handleStartDemo}
                disabled={!agentId.trim()}
                variant="hero"
                size="lg"
                className="w-full"
              >
                Launch Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
            <MessageCircle className="w-12 h-12 text-primary mb-4 drop-shadow-[0_0_10px_rgba(0,229,214,0.5)]" />
            <h3 className="text-xl font-audiowide mb-2 text-primary">Real-time Voice</h3>
            <p className="text-foreground/70 font-manrope">
              Voice conversations directly in your browser. Experience the future of AI communication.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-accent/20 shadow-card hover:shadow-magenta transition-all duration-300 hover:scale-105">
            <Zap className="w-12 h-12 text-accent mb-4 drop-shadow-[0_0_10px_rgba(229,54,193,0.5)]" />
            <h3 className="text-xl font-audiowide mb-2 text-accent">Instant Setup</h3>
            <p className="text-foreground/70 font-manrope">
              Zero configuration. Just paste your agent ID and experience next-gen automation.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-brand-cyber-yellow/20 shadow-card hover:shadow-[0_0_30px_rgba(254,221,77,0.3)] transition-all duration-300 hover:scale-105">
            <Users className="w-12 h-12 text-brand-cyber-yellow mb-4 drop-shadow-[0_0_10px_rgba(254,221,77,0.5)]" />
            <h3 className="text-xl font-audiowide mb-2 text-brand-cyber-yellow">Multi-Client Ready</h3>
            <p className="text-foreground/70 font-manrope">
              Multiple clients can test different agents simultaneously. Built for scale.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <p className="text-foreground/70 mb-4 font-manrope">
            <span className="text-primary font-audiowide">Old school cool.</span> 
            <span className="text-accent font-audiowide"> New school smart.</span>
          </p>
          <div className="bg-card/50 backdrop-blur-sm px-6 py-4 rounded-lg border border-primary/20 inline-block">
            <p className="text-sm text-foreground/60 mb-2 font-manrope">Share this URL with your agent ID:</p>
            <code className="text-primary font-mono text-sm">
              {window.location.origin}/demo?agent=YOUR_AGENT_ID
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};