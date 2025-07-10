import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GenerateDemoUrl } from "@/components/GenerateDemoUrl";
import { ApiKeyInstructions } from "@/components/ApiKeyInstructions";
import { MessageCircle, Zap, Users, ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-cyber-yellow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 container mx-auto px-4 py-10 md:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <img 
              src="/lovable-uploads/9f080a38-d1b4-4473-8c2e-f32b994e43d6.png" 
              alt="RevSquared AI Logo" 
              className="h-20 md:h-32 w-auto drop-shadow-[0_0_20px_rgba(0,229,214,0.5)]"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/30 shadow-glow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-audiowide text-primary">Voice AI Demo Generator</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-audiowide font-bold mb-4 md:mb-6 bg-gradient-neon bg-clip-text text-transparent drop-shadow-lg px-4">
            Create Demo Links
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl">For Your AI Agents</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-manrope px-4">
            Generate instant demo URLs for your Retell AI agents. Share with clients for 
            <span className="text-primary font-semibold"> professional voice testing</span>.
          </p>
        </div>


        {/* Demo URL Generator */}
        <div className="max-w-2xl mx-auto mb-16 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          <GenerateDemoUrl />
        </div>


        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <p className="text-foreground/70 mb-4 font-manrope">
            <span className="text-primary font-audiowide">Old school cool.</span> 
            <span className="text-accent font-audiowide"> New school smart.</span>
          </p>
        </div>
      </div>
    </div>
  );
};