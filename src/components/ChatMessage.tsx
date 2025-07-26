import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import { SupplierCard, Supplier } from "./SupplierCard";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suppliers?: Supplier[];
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarImage src={message.isUser ? undefined : "/bot-avatar.png"} />
        <AvatarFallback className={message.isUser ? "bg-chat-user text-chat-user-foreground" : "bg-chat-bot text-chat-bot-foreground"}>
          {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex-1 max-w-[80%] ${message.isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <Card className={`p-3 ${
          message.isUser 
            ? 'bg-chat-user text-chat-user-foreground ml-auto' 
            : 'bg-chat-bot text-chat-bot-foreground'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </Card>
        
        {message.suppliers && message.suppliers.length > 0 && (
          <div className="mt-3 w-full">
            {message.suppliers.map((supplier, index) => (
              <SupplierCard key={index} supplier={supplier} />
            ))}
          </div>
        )}
        
        <span className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};