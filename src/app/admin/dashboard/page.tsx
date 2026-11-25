import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Users,
  Briefcase,
  FileText,
  ShieldCheck,
  Server,
  Activity,
  ArrowRight,
  Database,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Platform Users", value: "142", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Jobs", value: "24", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Applications", value: "318", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Ollama Models", value: "llama3", icon: Server, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const auditEvents = [
    {
      id: "ev-1",
      action: "USER_AUTHENTICATED",
      user: "alex.candidate@hireflow.local",
      ip: "127.0.0.1",
      time: "2 mins ago",
    },
    {
      id: "ev-2",
      action: "JOB_PUBLISHED",
      user: "sarah.recruiter@hireflow.local",
      ip: "127.0.0.1",
      time: "15 mins ago",
    },
    {
      id: "ev-3",
      action: "OLLAMA_RESUME_PARSED",
      user: "system_daemon",
      ip: "localhost:11434",
      time: "40 mins ago",
    },
    {
      id: "ev-4",
      action: "INTERVIEW_SCHEDULED",
      user: "sarah.recruiter@hireflow.local",
      ip: "127.0.0.1",
      time: "1 hour ago",
    },
  ];

  return (
    <>
      <PortalHeader
        title="Admin Control Center"
        description="System health, audit logging, and platform telemetry"
        roleBadge="System Administrator"
      />

      <main className="p-6 md:p-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* System Health Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" /> Infrastructure Node Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">Next.js Web Server</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-slate-500">Port 3000 &bull; 0 ms Latency</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">PostgreSQL Database</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-slate-500">Port 5432 &bull; Connection Pool Active</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">Local Ollama AI Node</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-slate-500">Port 11434 &bull; Model: llama3</p>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Security & Action Audit Logs</h2>
              <p className="text-xs text-slate-500">Persisted in AuditLog PostgreSQL table</p>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Manage Accounts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Action Event</th>
                  <th className="px-6 py-3.5">Actor Identity</th>
                  <th className="px-6 py-3.5">Network Origin</th>
                  <th className="px-6 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800 text-[11px]">
                      {ev.action}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{ev.user}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">{ev.ip}</td>
                    <td className="px-6 py-4 text-slate-400 text-right">{ev.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

