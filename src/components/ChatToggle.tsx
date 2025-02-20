"use client";

import { useChatbot } from "@/contexts/ChatContext";
import { Bot, BotOff } from "lucide-react";
import { Button } from "./ui/button";


export default function ChatToggle() {
  const { isVisible, toggleChatbot } = useChatbot();

  function handelToggle() {
    toggleChatbot();
  }

  return (
    <Button size="icon" variant="ghost" onClick={handelToggle}>
      {isVisible ? <BotOff className="size-6" /> : <Bot className="size-6" />}
      <span className="sr-only">Chat Toggle</span>
    </Button>
  );
}
