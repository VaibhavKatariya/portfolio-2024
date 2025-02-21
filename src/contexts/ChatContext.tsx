"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const ChatContext = createContext({
  isVisible: true,
  toggleChatbot: () => {},
});

export const useChatbot = () => useContext(ChatContext);

interface Props {
  children: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  // Load the stored preference from localStorage
  useEffect(() => {
    const storedPreference = localStorage.getItem("chatbotVisibility");
    if (storedPreference !== null) {
      setIsVisible(storedPreference === "true");
    }
  }, []);

  const toggleChatbot = () => {
    setIsVisible((prev) => {
      const newState = !prev;
      localStorage.setItem("chatbotVisibility", newState.toString());
      return newState;
    });
  };

  return (
    <ChatContext.Provider value={{ isVisible, toggleChatbot }}>
      {children}
    </ChatContext.Provider>
  );
}
