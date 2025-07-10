import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Key, Shield } from "lucide-react";

export const ApiKeyInstructions = () => {
  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-glow max-w-2xl mx-auto mb-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-audiowide text-primary">Setup Required</h2>
        </div>
        
        <p className="text-foreground/80 font-manrope">
          To enable seamless demo calls, you need to add your Retell API key to Supabase secrets.
        </p>
        
        <div className="bg-background/50 p-4 rounded-lg border border-primary/20 text-left">
          <h3 className="font-audiowide text-primary mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Steps to complete setup:
          </h3>
          <ol className="text-sm text-foreground/70 space-y-1 font-manrope ml-6">
            <li>1. Go to your Supabase project dashboard</li>
            <li>2. Navigate to Settings → Edge Functions → Secrets</li>
            <li>3. Add a new secret with name: <code className="bg-primary/20 px-1 rounded text-primary">RETELL_API_KEY</code></li>
            <li>4. Paste your Retell API key as the value</li>
            <li>5. Save and deploy your edge functions</li>
          </ol>
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Supabase Dashboard
          </Button>
        </div>
        
        <p className="text-xs text-foreground/60 font-manrope">
          Once configured, demo links will work seamlessly for your clients without requiring API key input.
        </p>
      </div>
    </Card>
  );
};