"use client";

import { useState } from "react";
import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import { Building, Calendar, ArrowRight, Trash2, CheckCircle2, Clock, XCircle, Sparkles } from "lucide-react";

export default function CandidateApplicationsPage() {
  const [filter, setFilter] = useState("ALL");
  const [applications, setApplications] = useState([
    {
      id: "app-1",
      title: "Senior Full Stack Engineer",
      company: "HireFlow Core Systems",
      appliedDate: "Nov 3, 2026",
      status: "SHORTLISTED",
      matchScore: 94,
      interviewScheduled: "Nov 6, 2026 • 10:30 AM IST",
    },
    {
      id: "app-2",
      title: "AI Solutions Architect",
      company: "Cognitive AI Labs",
      appliedDate: "Nov 1, 2026",
      status: "REVIEWING",
      matchScore: 88,
      interviewScheduled: null,
    },
    {
      id: "app-3",
      title: "Backend Platform Engineer",
      company: "CloudScale Infra",
      appliedDate: "Oct 28, 2026",
      status: "SUBMITTED",
      matchScore: 82,
      interviewScheduled: null,
    },
  ]);

  const handleWithdraw = (id: string) => {
    if (confirm("Are you sure you want to withdraw this application?")) {
      setApplications(applications.map((a) => (a.id === id ? { ...a, status: "WITHDRAWN" } : a)));
    }
  };

  const filteredApps = applications.filter((a) => (filter === "ALL" ? true : a.status === filter));

  return (
    <>
      <PortalHeader
        title="My Applications"
        description="Track all submitted job applications and interview updates"
        roleBadge="Candidate"
      />

      <main className="p-6 md:p-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "SUBMITTED", "REVIEWING", "SHORTLISTED", "WITHDRAWN"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === status
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">No applications match this filter.</p>
            </div>
          ) : (
            filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-base font-bold text-slate-900">{app.title}</h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === "SHORTLISTED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : app.status === "REVIEWING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : app.status === "WITHDRAWN"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {app.matchScore}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {app.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Applied: {app.appliedDate}
                    </span>
                  </div>

                  {app.interviewScheduled && (
                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      Interview: {app.interviewScheduled}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {app.status !== "WITHDRAWN" && (
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                    >
                      Withdraw
                    </button>
                  )}
                  <Link
                    href={`/candidate/jobs/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Job <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}

