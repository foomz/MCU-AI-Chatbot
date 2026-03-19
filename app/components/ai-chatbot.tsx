"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useEffect and useRef
import { apiFetch } from "@/lib/api/client"; 
import { API_ROUTES } from "@/lib/api/routes"; 

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean; // Add typing state
}

interface ChatResponse {
  success: boolean;
  prompt: string;
  response: string;
  timestamp: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm the MCU AI Assistant. I'm here to help you with information about Manila Central University. Ask me about our academic programs, admission requirements, campus facilities, student life, or any other questions about MCU!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      const response = await apiFetch<ChatResponse>(API_ROUTES.chatPrompt, {
        method: "POST",
        body: JSON.stringify({ prompt: currentInput }),
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.response,
        timestamp: new Date(),
        isTyping: true, // Start with typing animation
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Typewriter component for AI responses
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (indexRef.current < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      }, 1); // Adjust speed here (lower = faster)

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [text, displayedText, onComplete]);

  return (
    <span className="leading-relaxed whitespace-pre-wrap break-words">
      {displayedText}
      {indexRef.current < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

  // Handle typewriter completion
  const handleTypingComplete = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto rounded-2xl shadow-xl border border-blue-100 bg-white">
      {/* Chat Header */}
    <div className="bg-[#491464] text-white p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">🤖</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base sm:text-lg truncate">MCU AI Assistant</h3>
            <p className="text-blue-100 text-xs sm:text-sm">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50 min-h-0">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 rounded-2xl text-sm sm:text-base ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                }`}
              >
                {message.type === "assistant" && message.isTyping ? (
                  <TypewriterText 
                    text={message.content}
                    onComplete={() => handleTypingComplete(message.id)}
                  />
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                )}
                <p
                  className={`text-xs mt-2 ${
                    message.type === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-xs text-gray-500">MCU AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Section - Fixed at bottom */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100">
        <form onSubmit={sendMessage} className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about MCU..."
              disabled={loading}
              className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#491464] text-white text-sm sm:text-base rounded-xl hover:bg-[#3a0f4a] focus:ring-2 focus:ring-[#491464] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex-shrink-0"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => setInput("What programs does MCU offer?")}
              disabled={loading}
              className="text-xs px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              Programs
            </button>
            <button
              type="button"
              onClick={() => setInput("How do I apply to MCU?")}
              disabled={loading}
              className="text-xs px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              Admissions
            </button>
            <button
              type="button"
              onClick={() => setInput("What facilities are available on campus?")}
              disabled={loading}
              className="text-xs px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              Facilities
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}