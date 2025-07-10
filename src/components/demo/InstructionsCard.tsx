import { Card } from "@/components/ui/card";

export const InstructionsCard = () => {
  return (
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
  );
};