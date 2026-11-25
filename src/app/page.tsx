"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  Search,
  FileText,
  BarChart3,
  Calendar,
  Lock,
  Cpu,
  ChevronDown,
  UserCheck,
  Zap,
  Building,
  Target,
  Sliders,
  DollarSign,
  Layers,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dashboard preview switcher tab
  const [activeTab, setActiveTab] = useState<"recruiter" | "candidate" | "ai">("recruiter");

  const faqs = [
    {
      q: "How does HireFlow use local Ollama AI for candidate screening?",
      a: "HireFlow connects directly to your local Ollama instance (defaulting to llama3 on port 11434). Resumes and job descriptions are processed on your machine, calculating match scores and generating interview questions without sending sensitive data to third-party cloud APIs.",
    },
    {
      q: "Does HireFlow store real data in a database?",
      a: "Yes. All users, job openings, applications, interview schedules, recruiter notes, and notifications are persistently stored in a local PostgreSQL database managed through Prisma ORM.",
    },
    {
      q: "Can I use HireFlow as both a job seeker and a recruiter?",
      a: "Yes. HireFlow features dedicated role-based portals for Candidates, Recruiters, and Platform Administrators. You can select your role during registration or test different portals using the navigation switchers.",
    },
    {
      q: "What happens if Ollama is not running on my machine?",
      a: "HireFlow features graceful AI error handling. If Ollama is offline or unreachable, the application informs you with a clear status message while all other core functionality (job applications, dashboard metrics, interview scheduling, profile management) continues to operate normally.",
    },
    {
      q: "Is any paid cloud service or Vercel subscription required?",
      a: "No. HireFlow is engineered as a fully working local application that runs on Windows at http://localhost:3000 using local PostgreSQL and local Ollama.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ============================================================ */}
        {/* 1. HERO SECTION (2-COLUMN BALANCED DESKTOP LAYOUT)           */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden pt-12 pb-18 md:pt-20 md:pb-26 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/80">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-semibold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                  Enterprise Recruitment SaaS Platform
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                  Smarter Hiring. <br />
                  Better Careers. <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    Powered by AI.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  HireFlow unifies candidate sourcing, automated resume parsing, intelligent candidate matching, structured interview workflows, and real-time recruitment analytics in one private, enterprise-grade system.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all text-sm md:text-base hover:scale-[1.01]"
                  >
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all text-sm md:text-base shadow-xs"
                  >
                    <Briefcase className="w-4 h-4 text-slate-500" /> Explore Jobs
                  </Link>
                </div>

                {/* Portal Quick Access Switcher */}
                <div className="pt-4 flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-400">Quick Portals:</span>
                  <Link
                    href="/candidate/dashboard"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Candidate
                  </Link>
                  <Link
                    href="/recruiter/dashboard"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Recruiter
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-violet-600 hover:border-violet-300 shadow-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> Admin
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Dashboard Preview & AI Visual */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                        HF
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Live Recruitment Hub</p>
                        <p className="text-[10px] text-slate-400">PostgreSQL Synchronized</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ollama Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Active Candidates</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">38</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">12 Shortlisted</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Avg AI Match</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">91.4%</p>
                      <span className="text-[10px] text-blue-600 font-semibold">Llama3 Precision</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Top Candidate Screening
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        94% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">Alex Rivera</span> applied for Senior Full Stack Engineer. All 4 required core competencies verified.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400 text-[11px]">Next session: Nov 6, 10:30 AM</span>
                    <Link
                      href="/recruiter/interviews"
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                    >
                      View Pipeline <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. PLATFORM METRICS SECTION (ACTUAL DATA METRICS)             */}
        {/* ============================================================ */}
        <section className="py-12 bg-white border-b border-slate-200/80">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <p className="text-3xl lg:text-4xl font-extrabold text-blue-600">25</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Core Integrated Routes
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">End-to-End Next.js App Router</p>
              </div>

              <div className="p-4">
                <p className="text-3xl lg:text-4xl font-extrabold text-indigo-600">100%</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Private Local AI
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Zero Data Leaks via Ollama</p>
              </div>

              <div className="p-4">
                <p className="text-3xl lg:text-4xl font-extrabold text-violet-600">3</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Dedicated Role Portals
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Candidate, Recruiter, Admin</p>
              </div>

              <div className="p-4">
                <p className="text-3xl lg:text-4xl font-extrabold text-emerald-600">&lt; 15ms</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Database Query Speed
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Prisma ORM &amp; PostgreSQL</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SIX CORE FEATURES SECTION                                 */}
        {/* ============================================================ */}
        <section id="features" className="py-20 max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Engineered for Modern Talent Acquisition
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Every workflow from initial resume drop to technical interview debriefs runs on a cohesive, full-stack architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {/* 1. AI Resume Parsing */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Resume Parsing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Extract candidate contact info, technical proficiencies, work history, and educational milestones automatically using local Ollama parsing models.
              </p>
            </div>

            {/* 2. Smart Candidate Matching */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Smart Candidate Matching</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Compare job requirements against candidate profiles. Generate explainable fit scores, matched skills, and identified qualification gaps.
              </p>
            </div>

            {/* 3. Applicant Tracking System */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-violet-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Applicant Tracking System</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Full-lifecycle ATS with structured candidate stages: Submitted, Reviewing, Shortlisted, Interviewing, and Final Hiring Decisions.
              </p>
            </div>

            {/* 4. Job Management */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Job Management</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Draft, publish, and close job postings. Generate rich job specifications using the integrated AI Job Description tool.
              </p>
            </div>

            {/* 5. Interview Scheduling */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Interview Scheduling</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Coordinate rounds, store meeting links, manage schedules, and record recruiter collaboration feedback notes for transparent hiring.
              </p>
            </div>

            {/* 6. Recruitment Analytics */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-violet-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Recruitment Analytics</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Visualize hiring funnels, identify top demanded engineering stacks, track time-to-hire velocity, and export comprehensive CSV reports.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. HOW HIREFLOW WORKS (5-STEP PROCESS)                       */}
        {/* ============================================================ */}
        <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
                Step-by-Step Flow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                How HireFlow Works
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                From account onboarding to the final job offer, HireFlow streamlines every touchpoint.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Create Account",
                  desc: "Register securely as a Candidate or Employer with role-based dashboard redirection.",
                },
                {
                  step: "02",
                  title: "Publish Jobs",
                  desc: "Recruiters create openings or use AI to draft job specifications with salary ranges.",
                },
                {
                  step: "03",
                  title: "Discover & Screen",
                  desc: "Candidates apply; local Ollama models parse resumes and compute match rankings.",
                },
                {
                  step: "04",
                  title: "Schedule Interviews",
                  desc: "Book technical rounds, distribute video links, and capture interviewer ratings.",
                },
                {
                  step: "05",
                  title: "Complete Hiring",
                  desc: "Shortlist finalists, extend offers, and review platform hiring funnel metrics.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-blue-600/40 block mb-3 font-mono">
                      {s.step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. AI-POWERED RECRUITMENT SECTION                            */}
        {/* ============================================================ */}
        <section className="py-20 max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                  <Cpu className="w-3.5 h-3.5" /> Ollama Local AI Engine
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Private Intelligence Without Cloud Exposure
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Most recruitment tools require uploading sensitive resumes and compensation data to external cloud APIs. HireFlow binds with local open-weight models, guaranteeing 100% data residency on your Windows workstation.
                </p>

                <div className="space-y-3 pt-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time semantic parsing into structured JSON schemas.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Candidate qualification gap analysis and keyword matching.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Interactive technical interview question synthesis.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/candidate/ai-assistant"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-500 shadow-md transition-colors"
                  >
                    Try Local AI Assistant <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* AI Terminal Visual Preview */}
              <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400 mb-4">
                  <span>ollama-engine: llama3:latest</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    STATUS: OK
                  </span>
                </div>

                <div className="space-y-3 text-slate-300">
                  <p className="text-slate-400">&gt; Parsing resume: Alex_Rivera_FullStack.pdf</p>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] space-y-1">
                    <p className="text-blue-400 font-bold">&#123;</p>
                    <p className="pl-4 text-slate-300">&quot;candidate&quot;: &quot;Alex Rivera&quot;,</p>
                    <p className="pl-4 text-slate-300">&quot;experienceYears&quot;: 5,</p>
                    <p className="pl-4 text-slate-300">&quot;extractedSkills&quot;: [&quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;PostgreSQL&quot;, &quot;Prisma&quot;],</p>
                    <p className="pl-4 text-emerald-400">&quot;matchScore&quot;: 94,</p>
                    <p className="pl-4 text-slate-300">&quot;status&quot;: &quot;HIGHLY_RECOMMENDED&quot;</p>
                    <p className="text-blue-400 font-bold">&#125;</p>
                  </div>
                  <p className="text-slate-400">&gt; Candidate matched to 3 active requisitions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. CANDIDATE & RECRUITER BENEFIT COMPARISON                   */}
        {/* ============================================================ */}
        <section className="py-20 max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              Tailored Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built for Both Sides of the Hiring Table
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you are applying for your next role or building a high-growth engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Candidates</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Take control of your job search with intelligent tools that clarify requirements and improve your interview preparation.
                </p>

                <ul className="space-y-3 pt-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Real-time application status tracking with instant stage updates.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>AI Career Assistant providing mock technical interview questions.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Automated resume parser highlighting skill alignment per job.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Version control for uploaded resumes with downloadable formats.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/candidate/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs sm:text-sm transition-colors"
                >
                  Explore Candidate Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Recruiter Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">For Recruiters</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Automate tedious administrative recruitment tasks so you can focus on building meaningful relationships with top talent.
                </p>

                <ul className="space-y-3 pt-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Multi-stage ATS pipeline management with one-click actions.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Job description generator creating structured specs in seconds.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Seamless interview coordination with video meeting link generation.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Team collaboration notes capturing candidate ratings and decisions.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/recruiter/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs sm:text-sm transition-colors"
                >
                  Explore Recruiter Suite <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. DASHBOARD PREVIEW INTERACTIVE TABS                        */}
        {/* ============================================================ */}
        <section className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
                Visual Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Designed with the Quality of Linear and Stripe
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Inspect the actual dashboard layouts and UI patterns powering each module.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="p-1 bg-slate-100 rounded-xl inline-flex gap-1 border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("recruiter")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "recruiter"
                      ? "bg-white text-indigo-600 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Recruiter Suite
                </button>
                <button
                  onClick={() => setActiveTab("candidate")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "candidate"
                      ? "bg-white text-blue-600 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Candidate Portal
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "ai"
                      ? "bg-white text-violet-600 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Ollama AI Panel
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
              {activeTab === "recruiter" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Recruitment Pipeline Overview</h4>
                      <p className="text-xs text-slate-500">Live PostgreSQL Candidate Pipeline</p>
                    </div>
                    <Link
                      href="/recruiter/dashboard"
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700"
                    >
                      Open Recruiter Dashboard →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Active Postings</p>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">6 Jobs</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Total Applicants</p>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">38 Candidates</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Scheduled Interviews</p>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">5 Sessions</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "candidate" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Candidate Job Application Center</h4>
                      <p className="text-xs text-slate-500">Track All Applied Requisitions</p>
                    </div>
                    <Link
                      href="/candidate/dashboard"
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700"
                    >
                      Open Candidate Portal →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Applications</p>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">8 Sent</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Under Review</p>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">3 Active</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-400 uppercase font-bold">Shortlisted</p>
                      <p className="text-2xl font-extrabold text-emerald-600 mt-1">2 Rounds</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "ai" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Ollama AI Connection &amp; Diagnostics</h4>
                      <p className="text-xs text-slate-500">Configured on port 11434 with llama3</p>
                    </div>
                    <Link
                      href="/settings"
                      className="px-3.5 py-1.5 rounded-lg bg-violet-600 text-white font-semibold text-xs hover:bg-violet-700"
                    >
                      Open AI Settings →
                    </Link>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Ollama AI Status</p>
                      <p className="text-xs text-slate-500">Endpoint: http://127.0.0.1:11434 &bull; Model: llama3</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      OPERATIONAL
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. PRICING SECTION (CLEAR FEATURE COMPARISON)                 */}
        {/* ============================================================ */}
        <section id="pricing" className="py-20 max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Flexible Plans for Every Stage of Hiring
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Start free as a job seeker or power your recruitment operations with our professional suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Plan 1 */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Candidate Starter</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                  Free forever for job seekers looking to build resumes and discover roles.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500 ml-1.5">forever free</span>
                </div>
                <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited Job Applications</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>AI Resume Parsing &amp; Skill Extraction</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>AI Career Assistant Coaching Chat</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-Time Application Tracking</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href="/register"
                  className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  Create Candidate Account
                </Link>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="rounded-3xl p-8 bg-white border-2 border-blue-600 shadow-xl flex flex-col justify-between relative scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recruiter Pro</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                  Full-stack applicant tracking and candidate screening for recruitment teams.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">$49</span>
                  <span className="text-xs text-slate-500 ml-1.5">per recruiter / mo</span>
                </div>
                <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Post Unlimited Job Openings</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>AI Match Score Qualification Ranking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automated Interview Scheduling &amp; Links</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Local Ollama AI Integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Team Collaboration &amp; Recruiter Notes</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href="/register"
                  className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                >
                  Start Recruiter Trial
                </Link>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                  Custom organization administration, audit compliance, and system control.
                </p>
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-900">$199</span>
                  <span className="text-xs text-slate-500 ml-1.5">per company / mo</span>
                </div>
                <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Everything in Recruiter Pro</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete Admin User Management</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Security Audit Logging &amp; Tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Advanced Funnel &amp; CSV Report Export</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href="/contact"
                  className="block w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  Contact Enterprise Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 9. FAQ ACCORDION SECTION (WORKING INTERACTION)               */}
        {/* ============================================================ */}
        <section className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Everything you need to know about HireFlow architecture, Ollama AI, and local execution.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-5 text-left bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 10. FINAL CALL TO ACTION BANNER                              */}
        {/* ============================================================ */}
        <section className="py-20 max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 md:p-18 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Ready to Upgrade Your Recruitment Workflow?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Join thousands of candidates and recruiters using HireFlow for fast, private, and intelligent hiring.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <Link
                href="/register"
                className="px-7 py-3.5 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
