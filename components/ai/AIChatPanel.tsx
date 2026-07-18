"use client";

import { KeyboardEvent, useState } from "react";
import { Bot, MessageSquare, Send } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";
import type { ChatMessage } from "@/types/ai.types";

interface AIChatPanelProps {
  diagramCode: string;
}

const SUGGESTIONS = [
  "Explain this diagram",
  "How can I improve it?",
  "Add more detail",
];

export function AIChatPanel({ diagramCode }: AIChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const aiChat = useAIChat();

  const sendMessage = () => {
    const message = inputValue.trim();

    if (!message || aiChat.isPending) {
      return;
    }

    const history = messages;
    const userMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInputValue("");

    aiChat.mutate(
      {
        diagramCode,
        history,
        message,
      },
      {
        onSuccess: (reply) => {
          setMessages((currentMessages) => [
            ...currentMessages,
            { role: "assistant", content: reply },
          ]);
        },
        onError: () => {
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              role: "assistant",
              content: "Sorry, I could not process that request. Please try again.",
            },
          ]);
        },
      },
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="font-semibold text-gray-900">AI Assistant</h2>
        </div>
        <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">
          Powered by Groq
        </span>
      </div>

      {messages.length === 0 && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-xs text-gray-400 mb-2">Try asking:</div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInputValue(suggestion)}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full cursor-pointer hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[300px] max-h-[400px]">
        {messages.length === 0 ? (
          <div className="h-full min-h-[268px] flex flex-col items-center justify-center text-gray-400 text-sm text-center">
            <MessageSquare className="w-8 h-8 mb-3 text-gray-300" />
            Ask AI anything about this diagram
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              {message.role === "user" ? (
                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs text-sm">
                  {message.content}
                </div>
              ) : (
                <div>
                  <Bot className="w-4 h-4 text-gray-400 mb-1 ml-1" />
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs text-sm">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {aiChat.isPending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex items-end">
          <textarea
            rows={1}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this diagram..."
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={aiChat.isPending || !inputValue.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl ml-2 transition-colors disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
