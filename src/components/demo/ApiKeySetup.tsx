import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { toast } from "sonner";

interface ApiKeySetupProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  showApiKeyInput: boolean;
  setShowApiKeyInput: (show: boolean) => void;
}

export const ApiKeySetup = ({ 
  apiKey, 
  setApiKey, 
  showApiKeyInput, 
  setShowApiKeyInput 
}: ApiKeySetupProps) => {
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

  if (showApiKeyInput) {
    return (
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
    );
  }

  return (
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
  );
};