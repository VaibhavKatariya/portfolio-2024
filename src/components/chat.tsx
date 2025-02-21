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


  useEffect(() => {
    const savedHistory = sessionStorage.getItem("chatHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setMessages(parsedHistory.map((entry: { role: string; parts: { text: string }[] }) => ({
        role: entry.role,
        text: entry.parts[0].text,
      })));
    }
  }, []);



  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    // Optimistically update UI
    const newMessages = [...messages, { role: "user", text: userInput }];
    setMessages(newMessages);

    // Send message to Gemini
    const botResponse = await sendMessageToGemini(userInput);
    setMessages([...newMessages, { role: "model", text: botResponse }]);
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem("chatHistory");
  }

  return (
    isVisible && (
      <Accordion type="single" collapsible className="relative z-40">
        <AccordionItem value="item-1" className="fixed bottom-8 right-8 w-80 rounded-md border bg-background">
          <AccordionTrigger className="border-b px-6">
            <ChatHeader />
          </AccordionTrigger>
          <AccordionContent className="flex max-h-96 min-h-80 flex-col justify-between p-0">
            <ChatMessages messages={messages} />
            <ChatInput clearChat={clearChat} onSendMessage={handleSendMessage} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
}
