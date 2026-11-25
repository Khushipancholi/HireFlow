import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  FileText,
  Clock,
  CheckCircle2,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  DollarSign,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function CandidateDashboardPage() {
  const stats = [
    { label: "Total Applications", value: "8", change: "+2 this week", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Under Review", value: "3", change: "Active screening", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Shortlisted", value: "2", change: "Moved to technical", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Interview Sessions", value: "1", change: "Nov 6, 10:30 AM", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentApplications = [
    {
      id: "app-1",
      title: "Senior Full Stack Engineer",
      company: "HireFlow Core Systems",
      location: "Bangalore / Remote",
      appliedDate: "Nov 3, 2026",
      status: "SHORTLISTED",
      matchScore: 94,
    },
    {
      id: "app-2",
      title: "AI Solutions Architect",
      company: "Cognitive AI Labs",
      location: "Remote",
      appliedDate: "Nov 1, 2026",
      status: "REVIEWING",
      matchScore: 88,
    },
    {
      id: "app-3",
      title: "Backend Platform Engineer",
      company: "CloudScale Infra",
      location: "Hyderabad / Hybrid",
      appliedDate: "Oct 28, 2026",
      status: "SUBMITTED",
      matchScore: 82,
    },
  ];

  const recommendedJobs = [
    {
      id: "job-2",
      title: "AI / Machine Learning Engineer",
      company: "Cognitive AI Labs",
      location: "Remote",
      salary: "$130k - $160k",
      match: 91,
      skills: ["Python", "Ollama", "LLMs"],
    },
    {
      id: "job-4",
      title: "Junior Backend Developer",
      company: "CloudScale Infra",
      location: "Hyderabad",
      salary: "$50k - $70k",
      match: 86,
      skills: ["Node.js", "PostgreSQL", "REST"],
    },
  ];

  return (
    <>
      <PortalHeader
        title="Candidate Dashboard"
        description="Welcome back, Alex. Monitor your application status and discover tailored engineering roles."
        roleBadge="Candidate"
      />

      <main className="p-6 lg:p-8 space-y-8 max-w-[1320px] mx-auto w-full">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between hover:border-blue-200 transition-all"
              >
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">{s.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Completion Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1 w-full">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Profile Readiness Indicator</span>
              <span className="font-extrabold text-blue-600">85% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-[85%]" />
            </div>
            <p className="text-[11px] text-slate-500">
              Add your recent certifications to reach 100% and boost your Ollama AI match score.
            </p>
          </div>
          <Link
            href="/candidate/profile"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs shrink-0 transition-colors"
          >
            Complete Profile
          </Link>
        </div>

        {/* Two-Column Grid: Applications & Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recent Applications */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Application Pipeline</h2>
                <p className="text-xs text-slate-500">Live statuses from the PostgreSQL database</p>
              </div>
              <Link
                href="/candidate/applications"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Position &amp; Company</th>
                    <th className="px-6 py-3.5">Applied Date</th>
                    <th className="px-6 py-3.5">AI Match</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{app.title}</p>
                        <p className="text-slate-500 text-[11px]">{app.company} &bull; {app.location}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                          <TrendingUp className="w-3.5 h-3.5" /> {app.matchScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            app.status === "SHORTLISTED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : app.status === "REVIEWING"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/candidate/jobs/${app.id}`}
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: AI Assistant & Recommended Jobs */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Assistant Banner */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/15 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Local Career Intelligence
              </div>
              <h3 className="text-base font-bold">Prepare with Ollama AI</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Generate tailored mock interview questions and optimize your resume summary for your next technical round.
              </p>
              <Link
                href="/candidate/ai-assistant"
                className="inline-block mt-2 px-4 py-2 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors shadow-sm"
              >
                Launch AI Assistant →
              </Link>
            </div>

            {/* Recommended Positions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">Recommended Jobs</h3>
                <Link href="/candidate/jobs" className="text-xs text-blue-600 font-semibold hover:underline">
                  Browse
                </Link>
              </div>

              <div className="space-y-3">
                {recommendedJobs.map((j) => (
                  <div key={j.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-xs text-slate-900">{j.title}</p>
                        <p className="text-[11px] text-slate-500">{j.company} &bull; {j.location}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {j.match}% Fit
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600 font-semibold text-[11px]">{j.salary}</span>
                      <Link
                        href={`/candidate/jobs/${j.id}`}
                        className="text-blue-600 font-bold text-[11px] hover:underline flex items-center"
                      >
                        Apply <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
