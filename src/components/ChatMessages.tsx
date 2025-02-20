import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatMessages() {

  // Scroll to new messages automatically
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  return (
    <div className="h-full overflow-y-auto p-3" ref={scrollRef}>
      <div className="flex h-full flex-col items-center justify-center mt-16 gap-2">
        <Bot />
        <p className="font-medium">Send a message to start the chat!</p>
        <p className="text-center text-xs text-muted-foreground">
          You can ask the bot anything about me and it will help to find the
          relevant information!
        </p>
      </div>

      {/* loading */}
      {/* <div className="flex items-center justify-center">
        <Loader2 className="mr-1.5 size-3 animate-spin text-muted-foreground" />
        <p className="text-center text-xs text-muted-foreground">
          Thinking...
        </p>
      </div> */}

      {/* error */}
      {/* {error && (
        <p className="text-center text-xs text-rose-500">
          Something went wrong. Please try again!
        </p>
      )} */}
    </div>
  );
}
