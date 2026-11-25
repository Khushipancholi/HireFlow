"use client";

import { useState } from "react";
import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Briefcase,
  PlusCircle,
  Search,
  Users,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";

export default function RecruiterJobsPage() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([
    {
      id: "job-1",
      title: "Senior Full Stack Engineer",
      status: "PUBLISHED",
      applicants: 18,
      location: "Bangalore / Remote",
      postedAt: "Nov 1, 2026",
    },
    {
      id: "job-2",
      title: "AI / Machine Learning Engineer",
      status: "PUBLISHED",
      applicants: 14,
      location: "Remote",
      postedAt: "Oct 29, 2026",
    },
    {
      id: "job-3",
      title: "Product Designer (UI/UX)",
      status: "DRAFT",
      applicants: 0,
      location: "Bangalore",
      postedAt: "Nov 3, 2026",
    },
    {
      id: "job-4",
      title: "Junior Backend Developer",
      status: "CLOSED",
      applicants: 6,
      location: "Hyderabad / Hybrid",
      postedAt: "Oct 15, 2026",
    },
  ]);

  const toggleStatus = (id: string, newStatus: string) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
  };

  const deleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job listing?")) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PortalHeader
        title="Manage Jobs"
        description="Create, monitor, publish, and close job postings"
        roleBadge="Recruiter"
      />

      <main className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Create New Job
          </Link>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Job Title</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Applicants</th>
                  <th className="px-6 py-3.5">Location</th>
                  <th className="px-6 py-3.5">Created Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{job.title}</td>
                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        onChange={(e) => toggleStatus(job.id, e.target.value)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          job.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : job.status === "DRAFT"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href="/recruiter/applicants"
                        className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:underline"
                      >
                        <Users className="w-3.5 h-3.5" /> {job.applicants}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{job.location}</td>
                    <td className="px-6 py-4 text-slate-500">{job.postedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/candidate/jobs/${job.id}`}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Preview Job"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

