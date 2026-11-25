"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  Sparkles,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface SidebarProps {
  role: "candidate" | "recruiter" | "admin";
}

export default function PortalSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const candidateLinks: NavItem[] = [
    { name: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
    { name: "Browse Jobs", href: "/candidate/jobs", icon: Briefcase },
    { name: "My Applications", href: "/candidate/applications", icon: FileText },
    { name: "My Profile", href: "/candidate/profile", icon: User },
    { name: "Resume Management", href: "/candidate/resume", icon: FileText },
    { name: "AI Assistant", href: "/candidate/ai-assistant", icon: Sparkles, badge: "AI" },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const recruiterLinks: NavItem[] = [
    { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
    { name: "Manage Jobs", href: "/recruiter/jobs", icon: Briefcase },
    { name: "Create Job", href: "/recruiter/jobs/create", icon: PlusCircle },
    { name: "Applicants", href: "/recruiter/applicants", icon: Users },
    { name: "Interviews", href: "/recruiter/interviews", icon: Calendar },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Analytics & Reports", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const links =
    role === "candidate"
      ? candidateLinks
      : role === "recruiter"
      ? recruiterLinks
      : adminLinks;

  const roleTitle =
    role === "candidate"
      ? "Candidate Portal"
      : role === "recruiter"
      ? "Recruiter Suite"
      : "Admin Console";

  return (
    <aside
      className={`border-r border-slate-200/90 bg-white flex flex-col justify-between shrink-0 min-h-screen sticky top-0 transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-200/80 flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              HF
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <span className="font-bold text-base tracking-tight text-slate-900 block leading-tight truncate">
                  Hire<span className="text-blue-600">Flow</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block truncate">
                  {roleTitle}
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors hidden sm:block"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Portal Switcher (Hidden when collapsed) */}
        {!collapsed && (
          <div className="p-3 mx-3 my-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3" /> Quick Switch
            </p>
            <div className="grid grid-cols-3 gap-1 text-[11px] font-medium text-center">
              <Link
                href="/candidate/dashboard"
                className={`py-1 rounded-md transition-colors ${
                  role === "candidate" ? "bg-white text-blue-600 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Candidate
              </Link>
              <Link
                href="/recruiter/dashboard"
                className={`py-1 rounded-md transition-colors ${
                  role === "recruiter" ? "bg-white text-indigo-600 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Recruiter
              </Link>
              <Link
                href="/admin/dashboard"
                className={`py-1 rounded-md transition-colors ${
                  role === "admin" ? "bg-white text-violet-600 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Admin
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="px-3 py-2 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Card */}
      <div className="p-3 border-t border-slate-200/80">
        <div className={`flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
              {role === "candidate" ? "AR" : role === "recruiter" ? "SJ" : "AD"}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {role === "candidate" ? "Alex Rivera" : role === "recruiter" ? "Sarah Jenkins" : "Root Admin"}
                </p>
                <p className="text-[10px] text-slate-500 capitalize">{role}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Link
              href="/login"
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
