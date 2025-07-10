import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User } from "lucide-react";

interface Transcript {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

interface ConversationTranscriptProps {
  transcripts: Transcript[];
}

export const ConversationTranscript = ({ transcripts }: ConversationTranscriptProps) => {
  return (
    <Card className="h-96 bg-gradient-card backdrop-blur-sm border border-primary/20 shadow-card">
      <div className="p-4 border-b border-primary/20">
        <h3 className="font-audiowide text-primary">Live Conversation</h3>
        <p className="text-sm text-foreground/60 font-manrope">Real-time transcript</p>
      </div>
      
      <ScrollArea className="h-80 p-4">
        <div className="space-y-4">
          {transcripts.length === 0 ? (
            <div className="text-center text-foreground/60 font-manrope py-8">
              <p>Conversation will appear here when you start talking...</p>
            </div>
          ) : (
            transcripts.map((transcript, index) => (
              <div key={index} className="space-y-2">
                <div className={`flex items-start gap-3 ${
                  transcript.role === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transcript.role === 'agent' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {transcript.role === 'agent' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] ${
                    transcript.role === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block p-3 rounded-lg font-manrope ${
                      transcript.role === 'agent'
                        ? 'bg-primary/10 text-foreground border border-primary/20'
                        : 'bg-accent/10 text-foreground border border-accent/20'
                    }`}>
                      {transcript.content}
                    </div>
                    
                    <p className="text-xs text-foreground/50 mt-1 font-mono">
                      {transcript.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};