import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Cpu, Database, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              About HireFlow
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Reinventing Enterprise Hiring with Privacy-First AI
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
              HireFlow is an end-to-end Recruitment Management System (RMS) designed to bridge the gap between candidates and talent acquisition teams through local intelligence and deep database integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Eliminate hiring friction. Traditional recruitment systems rely on opaque third-party black boxes or chaotic spreadsheets. HireFlow provides transparency, automated resume parsing, candidate scoring, and interview scheduling while keeping data local and private.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Architecture</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered with Next.js 14 App Router, TypeScript, PostgreSQL, and Prisma ORM. For intelligence, it directly binds with local Ollama instances, ensuring applicant resumes never leave the local boundary without explicit consent.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to explore modern hiring?</h2>
              <p className="text-blue-100 text-sm max-w-xl">
                Experience the Candidate, Recruiter, and Admin modules with full local persistence.
              </p>
            </div>
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors shrink-0 shadow-md"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

