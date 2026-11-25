"use client";

import { useState } from "react";
import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Calendar,
} from "lucide-react";

export default function RecruiterApplicantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [candidates, setCandidates] = useState([
    {
      id: "app-1",
      name: "Alex Rivera",
      job: "Senior Full Stack Engineer",
      email: "alex.candidate@hireflow.local",
      aiScore: 94,
      experience: "5 Years",
      status: "SHORTLISTED",
      appliedAt: "Nov 3, 2026",
    },
    {
      id: "app-2",
      name: "Maya Chen",
      job: "AI / Machine Learning Engineer",
      email: "maya.chen@example.com",
      aiScore: 91,
      experience: "4 Years",
      status: "REVIEWING",
      appliedAt: "Nov 2, 2026",
    },
    {
      id: "app-3",
      name: "David Kim",
      job: "Junior Backend Developer",
      email: "david.kim@example.com",
      aiScore: 78,
      experience: "2 Years",
      status: "SUBMITTED",
      appliedAt: "Nov 1, 2026",
    },
    {
      id: "app-4",
      name: "Sophia Martinez",
      job: "Senior Full Stack Engineer",
      email: "sophia.m@example.com",
      aiScore: 85,
      experience: "6 Years",
      status: "REVIEWING",
      appliedAt: "Oct 30, 2026",
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const filtered = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.job.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <PortalHeader
        title="Candidate Applicants"
        description="Review submissions, screen qualifications, and manage pipeline progression"
        roleBadge="Recruiter"
      />

      <main className="p-6 md:p-8 space-y-6">
        {/* Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate name or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Applicant</th>
                  <th className="px-6 py-3.5">Position</th>
                  <th className="px-6 py-3.5">AI Match</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Applied Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-slate-400 text-[11px]">{c.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{c.job}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <Sparkles className="w-3.5 h-3.5" /> {c.aiScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          c.status === "SHORTLISTED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : c.status === "REVIEWING"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : c.status === "REJECTED"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{c.appliedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => updateStatus(c.id, "SHORTLISTED")}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="Shortlist Candidate"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, "REJECTED")}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                          title="Reject Candidate"
                        >
                          Reject
                        </button>
                        <Link
                          href={`/recruiter/applicants/${c.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Full Profile & Resume"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
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

