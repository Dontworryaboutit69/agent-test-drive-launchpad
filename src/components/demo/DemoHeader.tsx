import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface DemoHeaderProps {
  agentId: string;
}

export const DemoHeader = ({ agentId }: DemoHeaderProps) => {
  return (
    <>
      {/* Navigation Header */}
      <div className="flex justify-center mb-8">
        <img 
          src="/lovable-uploads/9f080a38-d1b4-4473-8c2e-f32b994e43d6.png" 
          alt="RevSquared AI Logo" 
          className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,229,214,0.3)]"
        />
      </div>

      {/* Demo Title Header */}
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
    </>
  );
};