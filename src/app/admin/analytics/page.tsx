"use client";

import { useState } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const funnelData = [
    { stage: "Applications Received", count: 318, percentage: 100, color: "bg-blue-600" },
    { stage: "AI Screened & Parsed", count: 284, percentage: 89, color: "bg-indigo-600" },
    { stage: "Recruiter Shortlisted", count: 86, percentage: 27, color: "bg-violet-600" },
    { stage: "Interviews Conducted", count: 42, percentage: 13, color: "bg-purple-600" },
    { stage: "Job Offers Extended", count: 18, percentage: 5.6, color: "bg-emerald-600" },
  ];

  const handleExport = () => {
    alert("Exporting analytics report as CSV from local PostgreSQL dataset...");
  };

  return (
    <>
      <PortalHeader
        title="Platform Analytics & Funnels"
        description="Comprehensive hiring pipeline efficiency and system telemetry"
        roleBadge="System Administrator"
      />

      <main className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
              <option value="1y">All Time</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" /> Export CSV Report
          </button>
        </div>

        {/* Funnel Analysis Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">End-to-End Recruitment Funnel</h2>
            <p className="text-xs text-slate-500">
              Progression rates calculated across all active jobs on localhost
            </p>
          </div>

          <div className="space-y-4">
            {funnelData.map((stage) => (
              <div key={stage.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{stage.stage}</span>
                  <span className="text-slate-500 font-mono">
                    {stage.count} candidates ({stage.percentage}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Demanded Skills Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Most In-Demand Skills</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: "Next.js & React", pct: 92 },
                { name: "TypeScript", pct: 88 },
                { name: "PostgreSQL & Prisma", pct: 79 },
                { name: "Ollama / Local LLMs", pct: 64 },
                { name: "Docker & Cloud Deployments", pct: 51 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className="font-bold text-blue-600">{s.pct}% of postings</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Time-to-Hire Efficiency</h3>
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center space-y-1">
              <span className="text-3xl font-extrabold text-blue-600">11.4 Days</span>
              <p className="text-xs text-slate-600">Average duration from application to offer</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated Ollama screening reduced initial resume review latency by 68% compared to manual review cycles.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

