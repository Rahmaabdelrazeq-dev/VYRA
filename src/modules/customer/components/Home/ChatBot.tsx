"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  // 1. FIXED: In v6, use 'sendMessage' instead of 'append'
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 2. FIXED: Pass an object with 'text' to sendMessage
    await sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-black">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-neutral-800 transition-all flex items-center gap-2"
      >
        {isOpen ? (
          "✕"
        ) : (
          <span className="text-sm tracking-widest uppercase italic">
            VYRA Concierge
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-white border border-neutral-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-4 border-b border-neutral-100 flex justify-between items-center">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-400">
              Virtual Sommelier
            </span>
            <div
              className={`w-2 h-2 rounded-full ${isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`}
            />
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/30"
          >
            {messages.length === 0 && (
              <p className="text-neutral-400 text-xs italic text-center mt-10">
                Inquire about our olfactory scents...
              </p>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-black text-white rounded-tr-none"
                      : "bg-white border border-neutral-100 text-neutral-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  {/* 3. FIXED: Access text via the 'parts' array */}
                  {m.parts.map((part, index) =>
                    part.type === "text" ? (
                      <span key={index}>{part.text}</span>
                    ) : null,
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={onSendMessage}
            className="p-4 bg-white border-t border-neutral-100"
          >
            <input
              className="w-full text-sm bg-neutral-50 px-4 py-3 rounded-full outline-none focus:ring-1 focus:ring-black"
              value={input}
              placeholder="Ask a question..."
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
          </form>
        </div>
      )}
    </div>
  );
}
