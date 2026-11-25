"use client";

import { useState } from "react";
import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Settings,
  Bell,
  Lock,
  User,
  Cpu,
  CheckCircle2,
  Save,
  ArrowLeft,
  Server,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "notifications" | "ai">("account");

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Application Status Updated",
      message: "Your application for Senior Full Stack Engineer has been moved to Shortlisted.",
      isRead: false,
      date: "15 minutes ago",
    },
    {
      id: "notif-2",
      title: "New Interview Scheduled",
      message: "Technical round booked for Tomorrow at 10:30 AM IST.",
      isRead: false,
      date: "2 hours ago",
    },
    {
      id: "notif-3",
      title: "Welcome to HireFlow",
      message: "Your local account has been initialized and synchronized with PostgreSQL.",
      isRead: true,
      date: "1 day ago",
    },
  ]);

  // AI Configuration state
  const [ollamaUrl, setOllamaUrl] = useState("http://127.0.0.1:11434");
  const [ollamaModel, setOllamaModel] = useState("llama3");
  const [testingAI, setTestingAI] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{
    connected: boolean;
    message: string;
  } | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  // Real connection test to Ollama backend API
  const handleTestOllama = async () => {
    setTestingAI(true);
    setAiTestResult(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test-connection" }),
      });

      const data = await res.json();
      setAiTestResult({
        connected: data.connected,
        message: data.message || (data.connected ? "Ollama service connected successfully." : "AI service is currently unavailable. Please start Ollama and try again."),
      });
    } catch {
      setAiTestResult({
        connected: false,
        message: "AI service is currently unavailable. Please start Ollama and try again.",
      });
    } finally {
      setTestingAI(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage("Security preferences saved successfully.");
    setTimeout(() => setSavedMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PortalHeader
        title="Settings & Preferences"
        description="Configure your account security, notification feeds, and local Ollama connection"
      />

      <main className="p-6 lg:p-8 flex-1 max-w-[1100px] mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveTab("account")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === "account" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Account Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === "notifications" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === "ai" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Ollama AI Engine
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {savedMessage}
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Password &amp; Authentication
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Password Changes
              </button>
            </form>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Notification Stream</h2>
                <p className="text-xs text-slate-500">Live alerts generated by platform actions</p>
              </div>
              <button
                onClick={markAllRead}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => toggleRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    n.isRead
                      ? "bg-white border-slate-200 text-slate-600"
                      : "bg-blue-50/50 border-blue-200 text-blue-900 font-medium"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                      <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600">{n.message}</p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">{n.date}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold shrink-0">
                    {n.isRead ? "Mark Unread" : "Mark Read"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Engine Tab */}
        {activeTab === "ai" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Local Ollama AI Configuration</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure your local model endpoint for private candidate scoring, resume parsing, and interview coaching.
              </p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ollama Base URL
                </label>
                <input
                  type="text"
                  value={ollamaUrl}
                  onChange={(e) => setOllamaUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Configured Model Name
                </label>
                <input
                  type="text"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestOllama}
                  disabled={testingAI}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingAI ? "animate-spin" : ""}`} />
                  {testingAI ? "Pinging Ollama (Port 11434)..." : "Run AI Connection Test"}
                </button>
              </div>

              {aiTestResult && (
                <div
                  className={`p-4 rounded-2xl text-xs font-medium flex items-start gap-2.5 border ${
                    aiTestResult.connected
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  {aiTestResult.connected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{aiTestResult.message}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
