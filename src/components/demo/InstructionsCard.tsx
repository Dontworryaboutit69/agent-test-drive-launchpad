import { Card } from "@/components/ui/card";
export const InstructionsCard = () => {
  return <Card className="p-4 bg-background/30 border-dashed border-primary/30 backdrop-blur-sm">
      <div className="text-center space-y-2">
        <h4 className="font-audiowide text-primary">Setup Required:</h4>
        <div className="text-sm text-foreground/70 space-y-1 font-manrope">
          <p>1. Press Start Call</p>
          <p>2. Test your agent and add notes in the box for feedback</p>
          <p>
        </p>
          <p>4. Then test the agent with real voice calls</p>
        </div>
      </div>
    </Card>;
};