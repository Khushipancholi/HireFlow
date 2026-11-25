"use client";

import { useState } from "react";
import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import { Search, MapPin, Building, DollarSign, ArrowRight, Filter, Bookmark, Sparkles } from "lucide-react";

export default function CandidateJobsPage() {
  const [search, setSearch] = useState("");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const jobs = [
    {
      id: "job-1",
      title: "Senior Full Stack Engineer",
      company: "HireFlow Core Systems",
      location: "Bangalore / Remote",
      type: "FULL_TIME",
      salary: "$120,000 - $150,000",
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      description: "Scale high-throughput recruitment workflow modules and local AI integrations.",
      match: 94,
    },
    {
      id: "job-2",
      title: "AI / Machine Learning Engineer",
      company: "Cognitive AI Labs",
      location: "Remote",
      type: "FULL_TIME",
      salary: "$130,000 - $160,000",
      skills: ["Python", "Ollama", "LLMs", "RAG", "Embeddings"],
      description: "Fine-tune and integrate local open-weight language models for semantic resume parsing.",
      match: 88,
    },
    {
      id: "job-3",
      title: "Product Designer (UI/UX)",
      company: "SaaS Design Studio",
      location: "Bangalore",
      type: "CONTRACT",
      salary: "$90,000 - $110,000",
      skills: ["Figma", "Design Systems", "Prototyping", "UX Research"],
      description: "Design clean, high-conversion interfaces for candidate applicant tracking and recruiter analytics.",
      match: 75,
    },
    {
      id: "job-4",
      title: "Backend Platform Engineer",
      company: "CloudScale Infra",
      location: "Hyderabad / Hybrid",
      type: "FULL_TIME",
      salary: "$110,000 - $135,000",
      skills: ["Node.js", "PostgreSQL", "REST APIs", "Prisma"],
      description: "Build robust REST API endpoints and database migrations for high-concurrency recruitment operations.",
      match: 82,
    },
  ];

  const toggleSave = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((j) => j !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <PortalHeader
        title="Browse Jobs"
        description="Search active opportunities with real-time AI match ratings"
        roleBadge="Candidate"
      />

      <main className="p-6 md:p-8 space-y-6">
        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, company, or tech stack (e.g. Next.js, Python)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filtered.map((job) => {
            const isSaved = savedJobs.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-900">{job.title}</h2>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {job.type.replace("_", " ")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Sparkles className="w-3 h-3" /> {job.match}% AI Match
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 max-w-2xl">{job.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => toggleSave(job.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSaved
                        ? "bg-amber-50 text-amber-600 border-amber-200"
                        : "border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                    title={isSaved ? "Saved Job" : "Save Job"}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  <Link
                    href={`/candidate/jobs/${job.id}`}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

