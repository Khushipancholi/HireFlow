"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  MapPin,
  Save,
  MessageSquare,
} from "lucide-react";

export default function ApplicantDetailsPage() {
  const params = useParams();
  const applicantId = params?.id as string;

  const [status, setStatus] = useState("SHORTLISTED");
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([
    "Strong system architecture background. Handled Next.js concurrency cleanly in previous projects.",
    "Recommend scheduling Round 1 Technical Interview for next week.",
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      setNotesList([...notesList, note.trim()]);
      setNote("");
    }
  };

  return (
    <>
      <PortalHeader
        title="Applicant Detailed Profile"
        description={`Reviewing application ref: ${applicantId}`}
        roleBadge="Recruiter"
      />

      <main className="p-6 md:p-8 space-y-6 max-w-5xl">
        <Link
          href="/recruiter/applicants"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Applicants
        </Link>

        {/* Profile Summary Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0">
              AR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">Alex Rivera</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Applied for <span className="font-semibold text-slate-800">Senior Full Stack Engineer</span>
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1 text-slate-600">
                  <Mail className="w-3.5 h-3.5" /> alex.candidate@hireflow.local
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5" /> Bangalore, India
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatus("SHORTLISTED")}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Shortlist
            </button>
            <button
              onClick={() => setStatus("REJECTED")}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
            <Link
              href="/recruiter/interviews"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule Interview
            </Link>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Resume & Experience</h2>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer">
                  Download Stored PDF
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Skills Assessment
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Tailwind CSS", "Ollama"].map(
                    (s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                        {s}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Professional Experience
                </h3>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <p className="font-bold text-slate-900">Lead Full Stack Engineer &bull; CloudScale Solutions</p>
                  <p className="text-slate-500 text-[11px]">2022 — Present &bull; 4 years</p>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    Architected high-throughput SaaS pipelines, reducing latency by 45%. Designed multi-tenant PostgreSQL schemas with Prisma migrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Hiring Team Collaboration Notes
              </h2>

              <div className="space-y-2">
                {notesList.map((n, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    {n}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add an internal note about this applicant..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Post Note
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: AI Analysis */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Candidate Screening
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-4xl font-extrabold text-emerald-600">94%</span>
                <p className="text-xs font-semibold text-emerald-900 mt-1">Excellent Fit Score</p>
              </div>

              <div className="text-xs space-y-2 text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-800">Ollama Recommendation:</p>
                <p>
                  Alex exceeds the 3+ year threshold for TypeScript and PostgreSQL. Recommend conducting Round 1 System Design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

