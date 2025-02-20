"use client";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useChatbot } from "@/contexts/ChatContext";

export default function Chat() {
  const { isVisible } = useChatbot();

  return (
    isVisible && (
    <Accordion type="single" collapsible className="relative z-40">
      <AccordionItem
        value="item-1"
        className="fixed bottom-8 right-8 w-80 rounded-md border bg-background"
      >
        <AccordionTrigger className="border-b px-6">
          <ChatHeader />
        </AccordionTrigger>
        <AccordionContent className="flex max-h-96 min-h-80 flex-col justify-between p-0">
          <ChatMessages />
          <ChatInput />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    )
  );
}
