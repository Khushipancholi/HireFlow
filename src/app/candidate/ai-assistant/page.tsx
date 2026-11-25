"use client";

import { useState } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import { Sparkles, Send, Bot, User, RefreshCw, AlertCircle, Copy, Check, Lightbulb } from "lucide-react";

export default function CandidateAIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello Alex! I am your HireFlow AI Career Assistant powered by your local Ollama engine. I can help optimize your resume summary, evaluate technical skill gaps for senior roles, or generate mock technical interview questions. What would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setError(null);

    const updated = [...messages, { role: "user", content: userText }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "career-chat",
          payload: { message: userText },
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        setMessages([...updated, { role: "assistant", content: data.reply }]);
      } else {
        const errorMsg = data?.reply || data?.error || "AI service is currently unavailable. Please start Ollama and try again.";
        setError(errorMsg);
        setMessages([
          ...updated,
          {
            role: "assistant",
            content: `⚠️ ${errorMsg}`,
          },
        ]);
      }
    } catch {
      const errorMsg = "AI service is currently unavailable. Please start Ollama and try again.";
      setError(errorMsg);
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: `⚠️ ${errorMsg}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const quickPrompts = [
    "Generate 3 mock interview questions for Next.js & PostgreSQL",
    "Identify skill gaps for a Senior Full Stack Engineer role",
    "Draft a high-impact summary for a modern full-stack resume",
    "Explain architectural trade-offs between Server Actions and API Routes",
  ];

  return (
    <>
      <PortalHeader
        title="AI Career Assistant"
        description="Interactive career coaching and interview preparation powered by local Ollama AI"
        roleBadge="Candidate"
      />

      <main className="p-6 lg:p-8 flex-1 flex flex-col max-w-[1100px] mx-auto w-full">
        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-md flex flex-col overflow-hidden min-h-[580px]">
          {/* Top Assistant Status Bar */}
          <div className="p-4 px-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Ollama Career Intelligence</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Model: llama3 &bull; Private On-Device
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    role: "assistant",
                    content: "Conversation history cleared. What career or interview topic would you like to prepare for?",
                  },
                ]);
                setError(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors p-1.5 rounded-lg hover:bg-slate-200/50"
              title="Reset Conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-xl whitespace-pre-line relative group ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
                      : "bg-slate-100 text-slate-800 rounded-tl-xs"
                  }`}
                >
                  {m.content}
                  {m.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(m.content, idx)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 w-fit">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Ollama is processing response locally...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setInput(q)}
                className="text-[11px] font-medium px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-xs transition-colors"
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 px-6 border-t border-slate-200 flex gap-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for resume optimization, interview practice, or career roadmaps..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
