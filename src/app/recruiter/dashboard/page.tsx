import Link from "next/link";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RecruiterDashboardPage() {
  const stats = [
    { label: "Active Jobs", value: "6", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Applicants", value: "38", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Shortlisted Candidates", value: "12", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Interviews Scheduled", value: "5", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentApplicants = [
    {
      id: "app-1",
      name: "Alex Rivera",
      job: "Senior Full Stack Engineer",
      aiScore: 94,
      experience: "5 Years",
      status: "SHORTLISTED",
      date: "Nov 3, 2026",
    },
    {
      id: "app-2",
      name: "Maya Chen",
      job: "AI / Machine Learning Engineer",
      aiScore: 91,
      experience: "4 Years",
      status: "REVIEWING",
      date: "Nov 2, 2026",
    },
    {
      id: "app-3",
      name: "David Kim",
      job: "Junior Backend Developer",
      aiScore: 78,
      experience: "2 Years",
      status: "SUBMITTED",
      date: "Nov 1, 2026",
    },
  ];

  return (
    <>
      <PortalHeader
        title="Recruiter Dashboard"
        description="Recruitment telemetry, active hiring funnels, and applicant screenings"
        roleBadge="Recruiter"
      />

      <main className="p-6 md:p-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Header Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md shadow-indigo-500/15">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Ready to post a new opening?</h3>
            <p className="text-xs text-indigo-100 max-w-xl">
              Use our AI Job Description Generator powered by local Ollama to draft requirements and publish in seconds.
            </p>
          </div>
          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-600 font-bold text-xs hover:bg-indigo-50 transition-colors shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Create New Job
          </Link>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Candidates</h2>
              <p className="text-xs text-slate-500">Screen candidates ranked by Ollama match percentage</p>
            </div>
            <Link
              href="/recruiter/applicants"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View All Candidates <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Candidate Name</th>
                  <th className="px-6 py-3.5">Target Position</th>
                  <th className="px-6 py-3.5">Experience</th>
                  <th className="px-6 py-3.5">AI Match</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{app.name}</td>
                    <td className="px-6 py-4 text-slate-600">{app.job}</td>
                    <td className="px-6 py-4 text-slate-600">{app.experience}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <Sparkles className="w-3.5 h-3.5" /> {app.aiScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === "SHORTLISTED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/recruiter/applicants/${app.id}`}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Review
                      </Link>
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

