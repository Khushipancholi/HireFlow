"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, User, Sparkles, Check, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
  roleBadge?: string;
}

export default function PortalHeader({ title, description, roleBadge }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Application Status Updated",
      message: "Your application for Senior Full Stack Engineer has been moved to Shortlisted.",
      time: "15 mins ago",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "New Technical Interview Booked",
      message: "System Architecture interview scheduled for Tomorrow at 10:30 AM IST.",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Ollama Local Engine Connected",
      message: "Local llama3 model verified and ready for semantic resume parsing.",
      time: "1 day ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Title & Badge */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            {roleBadge && (
              <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {roleBadge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-[11px] text-slate-500 hidden md:block truncate max-w-md">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Field */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search portal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Ollama Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ollama AI Ready</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="font-bold text-slate-900 text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline text-[11px]"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border transition-all ${
                      n.isRead
                        ? "bg-slate-50/70 border-slate-100 text-slate-600"
                        : "bg-blue-50/50 border-blue-100 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-xs">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/settings"
                onClick={() => setShowNotifications(false)}
                className="mt-3 block text-center py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors border border-blue-100 text-[11px]"
              >
                Manage Notifications in Settings
              </Link>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <Link
          href="/settings"
          className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          title="Account Preferences"
        >
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
            AR
          </div>
        </Link>
      </div>
    </header>
  );
}
