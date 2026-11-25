"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Building,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Send,
  FileText,
} from "lucide-react";

export default function CandidateJobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
    }, 600);
  };

  return (
    <>
      <PortalHeader
        title="Job Opportunity Details"
        description={`Viewing specification for reference: ${jobId}`}
        roleBadge="Candidate"
      />

      <main className="p-6 md:p-8 space-y-6 max-w-5xl">
        <Link
          href="/candidate/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Jobs
        </Link>

        {/* Main Header Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Full-Time Engineering
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3" /> 94% Local AI Match
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900">
              Senior Full Stack Engineer
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Building className="w-4 h-4 text-slate-400" />
                HireFlow Core Systems
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                Bangalore / Remote
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                $120,000 - $150,000 / yr
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            {applied ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" /> Application Submitted
              </div>
            ) : (
              <a
                href="#apply-form"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                Apply for Position
              </a>
            )}
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Role Overview</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a Senior Full Stack Engineer at HireFlow, you will lead the core recruitment architecture. You will design and implement resilient API endpoints, optimize PostgreSQL data queries, integrate local Ollama AI endpoints for automated candidate screening, and build fluid frontend experiences.
              </p>

              <h2 className="text-base font-bold text-slate-900 pt-2">Key Requirements</h2>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>4+ years building full-stack applications with Next.js, React, and TypeScript.</li>
                <li>Deep experience with PostgreSQL, Prisma schema design, and query optimization.</li>
                <li>Hands-on knowledge with local and cloud AI models (Ollama, Llama-3, LangChain).</li>
                <li>Demonstrated ability in role-based authorization and secure SaaS systems.</li>
              </ul>
            </div>

            {/* Application Submission Form */}
            <div id="apply-form" className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-1">Submit Application</h2>
              <p className="text-xs text-slate-500 mb-4">
                Alex Rivera (alex.candidate@hireflow.local) • Resume Version 1.2
              </p>

              {applied ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-emerald-900 text-sm">Application Sent!</h3>
                  <p className="text-xs text-emerald-700">
                    Your profile and primary resume have been dispatched to the recruiting team.
                  </p>
                  <Link
                    href="/candidate/applications"
                    className="inline-block mt-2 text-xs font-bold text-blue-600 hover:underline"
                  >
                    View in My Applications →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cover Note (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Highlight relevant experience and why you are excited for this role..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Submitting Application..." : "Confirm & Apply Now"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Sidebar: AI Match Breakdown */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Match Analysis
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
                <span className="text-3xl font-extrabold text-blue-600">94%</span>
                <p className="text-xs font-semibold text-blue-900 mt-0.5">High Profile Alignment</p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-800">Matched Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-800">Recommended Next Step</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Prepare for architectural design questions regarding local Ollama concurrency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

