import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background border-t">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message... (Hindi, Marathi, or English)"
        disabled={disabled}
        className="flex-1"
      />
      <Button 
        type="button" 
        variant="outline" 
        size="icon"
        disabled={disabled}
        className="shrink-0"
      >
        <Mic className="w-4 h-4" />
      </Button>
      <Button 
        type="submit" 
        disabled={disabled || !message.trim()}
        className="shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};