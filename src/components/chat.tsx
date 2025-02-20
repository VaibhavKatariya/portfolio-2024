"use client";

import ChatHeader from "./ChatHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Chat() {
  return (
    <Accordion type="single" collapsible className="relative z-40">
      <AccordionItem
        value="item-1"
        className="fixed bottom-8 right-8 w-80 rounded-md border bg-background"
      >
        <AccordionTrigger className="border-b px-6">
          <ChatHeader />
        </AccordionTrigger>
        <AccordionContent className="flex max-h-96 min-h-80 flex-col justify-between p-0">
          {/* Chat input and message goes here */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
