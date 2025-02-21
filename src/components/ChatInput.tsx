import { useState } from "react";
import { SendHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatInput({ clearChat, onSendMessage }: { clearChat: () => void; onSendMessage: (message: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput(""); 
    }
  };

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-1 border-t px-2 py-3">
      <Button title="Clear chat" variant="outline" className="px-3 py-2" type="button" onClick={handleClearChat}>
        <Trash className="size-4 text-rose-500" />
      </Button>
      <Input
        autoFocus
        placeholder="Ask something..."
        className="bg-muted"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button title="Send message" variant="default" className="px-3 py-2" type="submit">
        <SendHorizontal className="size-4" />
      </Button>
    </form>
  );
}
