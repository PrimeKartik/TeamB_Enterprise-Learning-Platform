import {
  createContext,
  useContext,
  useState,
} from "react";

import { chatbotApi } from "../api/chatbotApi";

const ChatbotContext = createContext();

export function ChatbotProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setError("");

      const userMessage = {
        id: Date.now(),
        sender: "user",
        text: message,
      };

      setMessages((prev) => [...prev, userMessage]);

      const res = await chatbotApi.chat({
        message,
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);

      return res.data;
    } catch (err) {
      setError("Unable to get AI response.");

      const errorMessage = {
        id: Date.now(),
        sender: "bot",
        text: "Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        loading,
        error,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export const useChatbotContext = () =>
  useContext(ChatbotContext);