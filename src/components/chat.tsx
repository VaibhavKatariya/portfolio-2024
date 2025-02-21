"use client";

import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useChatbot } from "@/contexts/ChatContext";
import { sendMessageToGemini } from "@/utils/geminiApi";

export default function Chat() {
  const { isVisible } = useChatbot();
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = sessionStorage.getItem("chatHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(parsedHistory.map((entry: { role: string; parts: { text: string }[] }) => ({
          role: entry.role,
          text: entry.parts[0].text,
        })));
      } catch (err) {
        console.error("Error loading chat history:", err);
        setError("Failed to load chat history.");
      }
    }
  }, []);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    setError(null);

    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);

    try {
      const botResponse = await sendMessageToGemini(userInput);
      setMessages([...newMessages, { role: "model", text: botResponse }]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null); 
    sessionStorage.removeItem("chatHistory");
  };

  return (
    isVisible && (
      <Accordion type="single" collapsible className="relative z-40">
        <AccordionItem value="item-1" className="fixed bottom-8 right-8 w-80 rounded-md border bg-background">
          <AccordionTrigger className="border-b px-6">
            <ChatHeader />
          </AccordionTrigger>
          <AccordionContent className="flex max-h-96 min-h-80 flex-col justify-between p-0">
            <ChatMessages messages={messages} error={error} /> 
            <ChatInput clearChat={clearChat} onSendMessage={handleSendMessage} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
