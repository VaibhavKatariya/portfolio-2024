import { Bot } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

interface Message {
  role: string;
  text: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  // Scroll to new messages automatically
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-3" ref={scrollRef}>
      {messages.length > 0 ? (
        <div className="flex flex-col space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[75%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 self-start dark:bg-zinc-800"
              }`}
            >
              <Markdown
                components={{
                  a: ({ href, ...props }) => (
                    <Link
                      href={href ?? ""}
                      className="underline underline-offset-2"
                      {...props}
                    />
                  ),
                  p: (props) => <p className="mt-3 first:mt-0" {...props} />,
                  ul: (props) => (
                    <ul
                      className="mt-3 list-inside list-disc first:mt-0"
                      {...props}
                    />
                  ),
                }}
              >
                {msg.text}
              </Markdown>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center mt-16 gap-2">
          <Bot />
          <p className="font-medium">Send a message to start the chat!</p>
          <p className="text-center text-xs text-muted-foreground">
            You can ask the bot anything about me and it will help find the
            relevant information!
          </p>
        </div>
      )}
    </div>
  );
}
