import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
  agentId: string;
}

export const NotesSection = ({ notes, setNotes, agentId }: NotesSectionProps) => {
  const handleSubmitFeedback = () => {
    if (!notes.trim()) {
      toast.error("Please write some notes before submitting");
      return;
    }
    toast.success("Feedback submitted successfully!");
    // Here you could send the notes to a backend or email service
    console.log("Submitted feedback:", { agentId, notes, timestamp: new Date() });
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card">
      <div className="space-y-4">
        <h3 className="text-lg font-audiowide text-primary">Notes & Feedback</h3>
        <p className="text-sm text-foreground/60 font-manrope">
          Write down any feedback, suggestions, or notes while testing the agent
        </p>
        
        <Textarea
          placeholder="Type your notes here while speaking with the agent..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[300px] resize-none bg-background/50 border-primary/20 focus:border-primary text-foreground placeholder:text-foreground/40 font-manrope"
        />
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-foreground/40 font-manrope">
            {notes.length} characters
          </span>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setNotes("")}
              variant="outline"
              size="sm"
              disabled={!notes.trim()}
            >
              Clear Notes
            </Button>
            
            <Button
              onClick={handleSubmitFeedback}
              variant="hero"
              size="sm"
              disabled={!notes.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};