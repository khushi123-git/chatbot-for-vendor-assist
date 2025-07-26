import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { processChatMessage } from "@/services/chatService";
import { ShoppingCart, MessageCircle } from "lucide-react";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "नमस्ते! मैं आपका supplier assistant हूँ। आपको कौन सी सब्जी या सामान चाहिए?\n\nHello! I'm your supplier assistant. What vegetables or items do you need?\n\nनमस्कार! मी तुमचा supplier assistant आहे. तुम्हाला कोणती भाजी किंवा सामान हवी?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await processChatMessage(messageText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        suppliers: response.suppliers,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-chat-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Supplier Assistant</h1>
            <p className="text-sm opacity-90">Find trusted suppliers for your street food business</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-chat-bot flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-chat-bot-foreground" />
              </div>
              <Card className="bg-chat-bot text-chat-bot-foreground p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;
