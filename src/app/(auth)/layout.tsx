import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md py-4 px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              HF
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              Hire<span className="text-blue-600">Flow</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Two-Column Auth Viewport */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-200/90 shadow-2xl bg-white overflow-hidden min-h-[640px]">
          {/* Left Column: Branding, Benefits & Visual */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-10 text-white flex-col justify-between relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-semibold border border-white/10 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Enterprise Recruitment Platform
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Build Your Career. <br />
                Find the Right Talent.
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                A single unified workspace connecting ambitious professionals with top engineering teams through private, local AI intelligence.
              </p>

              {/* 3 Key Benefits */}
              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Private Local Intelligence</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Resumes are analyzed directly on your workstation via Ollama without cloud leaks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-400/20">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">End-to-End Pipeline</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      From application submission to technical interview debriefs and offers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0 border border-violet-400/20">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Dedicated Role Portals</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Tailored interfaces for Candidates, Recruiters, and Platform Administrators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini-testimonial */}
            <div className="relative z-10 pt-6 border-t border-slate-800 text-[11px] text-slate-400">
              <p className="italic">
                &ldquo;HireFlow transformed how our engineering leads screen and interview candidates.&rdquo;
              </p>
              <p className="font-semibold text-slate-200 mt-1">Acme Engineering Talent Team</p>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        © 2026 HireFlow Inc. All rights reserved.
      </footer>
    </div>
  );
}
