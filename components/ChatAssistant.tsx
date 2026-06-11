"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader } from "lucide-react";
import { fakeChatResponses, defaultChatResponse } from "@/lib/mockData";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  lectureFiles: string[];
}

function formatBoldText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-purple-300 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatAssistant({ lectureFiles }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! I'm your Course Assistant. Ask me anything about the uploaded lectures — I'll answer based on the content.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    for (const entry of fakeChatResponses) {
      if (entry.keywords.some((kw) => lower.includes(kw))) {
        return entry.response;
      }
    }
    // Mention uploaded lectures in fallback
    const lectureList = lectureFiles.slice(0, 3).join(", ");
    return `${defaultChatResponse}\n\nUploaded files include: ${lectureList}${lectureFiles.length > 3 ? `, and ${lectureFiles.length - 3} more.` : "."}`;
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(
      () => {
        const aiMsg: Message = {
          id: Date.now() + 1,
          role: "assistant",
          text: getResponse(trimmed),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      },
      900 + Math.random() * 600,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What is A* Search?",
    "Explain neural networks",
    "What is supervised learning?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#06040f]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Course Assistant</h3>
            <p className="text-emerald-400 text-xs">Online</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">
          Ask questions based on your uploaded lectures
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 chat-bubble-enter ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mt-1">
              {msg.role === "assistant" ? (
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-lg w-7 h-7 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              ) : (
                <div className="bg-white/10 border border-white/15 p-1.5 rounded-lg w-7 h-7 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-gray-300" />
                </div>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-white/[0.05] border border-white/[0.08] text-gray-300"
                  : "bg-gradient-to-br from-purple-600/80 to-blue-600/70 text-white border border-purple-500/30"
              }`}
            >
              {formatBoldText(msg.text)}
              <p className="text-white/25 text-[10px] mt-1 select-none">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5 chat-bubble-enter">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 rounded-lg w-7 h-7 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 flex items-center gap-1.5">
              <Loader className="w-3 h-3 text-purple-400 animate-spin" />
              <span className="text-gray-400 text-xs">Analyzing lectures...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 pb-2">
          <p className="text-gray-600 text-[10px] uppercase tracking-wider mb-1.5">
            Try asking:
          </p>
          <div className="flex flex-col gap-1">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
                className="text-left text-purple-400 text-xs hover:text-purple-300 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/15 rounded-lg px-2.5 py-1.5 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex-shrink-0 p-4 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your lectures..."
            className="input-dark flex-1 px-3.5 py-2.5 text-xs"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="btn-primary px-3 py-2.5 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
