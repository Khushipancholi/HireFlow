"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, MapPin, Briefcase, DollarSign, ArrowRight, Building, Filter } from "lucide-react";

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");

  const sampleJobs = [
    {
      id: "job-1",
      title: "Senior Full Stack Engineer",
      company: "HireFlow Core Systems",
      location: "Bangalore / Remote",
      type: "FULL_TIME",
      salary: "$120,000 - $150,000",
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      description: "Architect and scale high-throughput recruitment workflow modules and local AI integrations.",
      posted: "2 days ago",
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
      posted: "1 day ago",
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
      posted: "3 days ago",
    },
    {
      id: "job-4",
      title: "Junior Backend Developer",
      company: "CloudScale Infra",
      location: "Hyderabad / Hybrid",
      type: "PART_TIME",
      salary: "$50,000 - $70,000",
      skills: ["Node.js", "PostgreSQL", "REST APIs", "Prisma"],
      description: "Build robust REST API endpoints and database migrations for high-concurrency recruitment operations.",
      posted: "4 days ago",
    },
  ];

  const filteredJobs = sampleJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === "ALL" || job.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              Public Job Board
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Discover Your Next Opportunity
            </h1>
            <p className="mt-3 text-slate-600 text-sm md:text-base">
              Explore open positions published by verified employers on the HireFlow platform.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by job title, skill (e.g. Next.js, Python), or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full md:w-auto px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="ALL">All Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700">No matching jobs found</h3>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{job.title}</h2>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {job.type.replace("_", " ")}
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

                    <p className="text-xs text-slate-600 max-w-2xl line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <Link
                      href={`/candidate/jobs/${job.id}`}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors"
                    >
                      View & Apply <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

