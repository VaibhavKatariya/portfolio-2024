interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: "user" | "model";
  parts: ChatPart[];
}

const getHistory = (): ChatMessage[] => {
  if (typeof window !== "undefined") {
    const storedHistory = sessionStorage.getItem("chatHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  }
  return [];
};

const saveHistory = (history: ChatMessage[]) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("chatHistory", JSON.stringify(history));
  }
};

export const sendMessageToGemini = async (userInput: string): Promise<string> => {
  const history = getHistory();

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userInput,
      history,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to communicate with chat service");
  }

  const data = await response.json();
  const botResponse = data.text;

  // Persist the conversation turn in session storage
  const updatedHistory: ChatMessage[] = [
    ...history,
    { role: "user", parts: [{ text: userInput }] },
    { role: "model", parts: [{ text: botResponse }] },
  ];
  saveHistory(updatedHistory);

  return botResponse;
};
