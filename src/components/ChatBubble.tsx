import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import { RetellChat } from "./RetellChat";

interface ChatBubbleProps {
  agentId: string;
  apiKey: string;
}

export const ChatBubble = ({ agentId, apiKey }: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          variant="chat"
          size="lg"
          className="w-16 h-16 rounded-full shadow-glow animate-float"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="bg-gradient-card backdrop-blur-sm border shadow-glow animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">AI Agent Demo</h3>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4">
          <RetellChat agentId={agentId} apiKey={apiKey} />
        </div>
      </Card>
    </div>
  );
};