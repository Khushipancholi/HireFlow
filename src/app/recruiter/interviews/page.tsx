"use client";

import { useState } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Calendar,
  Clock,
  Video,
  PlusCircle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ExternalLink,
} from "lucide-react";

export default function RecruiterInterviewsPage() {
  const [interviews, setInterviews] = useState([
    {
      id: "int-1",
      candidate: "Alex Rivera",
      job: "Senior Full Stack Engineer",
      title: "Round 1: System Architecture & Coding",
      scheduledAt: "Nov 6, 2026 • 10:30 AM IST",
      type: "Google Meet",
      link: "https://meet.google.com/hfw-live-call",
      status: "SCHEDULED",
    },
    {
      id: "int-2",
      candidate: "Maya Chen",
      job: "AI / Machine Learning Engineer",
      title: "Round 2: Local AI & Embeddings Deep Dive",
      scheduledAt: "Nov 7, 2026 • 02:00 PM IST",
      type: "Zoom Video",
      link: "https://zoom.us/j/9988776655",
      status: "SCHEDULED",
    },
    {
      id: "int-3",
      candidate: "David Kim",
      job: "Junior Backend Developer",
      title: "Round 1: Data Modeling & SQL",
      scheduledAt: "Nov 2, 2026 • 11:00 AM IST",
      type: "Google Meet",
      link: "https://meet.google.com/xyz-prev-call",
      status: "COMPLETED",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    candidate: "Alex Rivera",
    title: "Round 2: Executive Fit",
    scheduledAt: "2026-11-10T14:00",
    link: "https://meet.google.com/new-session",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt = {
      id: `int-${Date.now()}`,
      candidate: form.candidate,
      job: "Senior Full Stack Engineer",
      title: form.title,
      scheduledAt: new Date(form.scheduledAt).toLocaleString(),
      type: "Google Meet",
      link: form.link,
      status: "SCHEDULED",
    };
    setInterviews([newInt, ...interviews]);
    setShowModal(false);
  };

  const cancelInterview = (id: string) => {
    if (confirm("Cancel this scheduled interview?")) {
      setInterviews(
        interviews.map((i) => (i.id === id ? { ...i, status: "CANCELLED" } : i))
      );
    }
  };

  return (
    <>
      <PortalHeader
        title="Interview Coordination"
        description="Book, reschedule, and conduct technical rounds with candidates"
        roleBadge="Recruiter"
      />

      <main className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Upcoming & Past Sessions</h2>
            <p className="text-xs text-slate-500">Synchronized with applicant records</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Schedule New Interview
          </button>
        </div>

        {/* Modal for new interview */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">Book Interview Session</h3>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.candidate}
                    onChange={(e) => setForm({ ...form, candidate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interview Round Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={form.scheduledAt}
                    onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meeting URL
                  </label>
                  <input
                    type="url"
                    required
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Save & Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Interviews List */}
        <div className="space-y-4">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "SCHEDULED"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : item.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>

                <p className="text-xs text-slate-600">
                  Candidate: <span className="font-semibold text-slate-900">{item.candidate}</span> ({item.job})
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-indigo-700">
                    <Calendar className="w-3.5 h-3.5" /> {item.scheduledAt}
                  </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" /> Join Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === "SCHEDULED" && (
                  <button
                    onClick={() => cancelInterview(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 text-xs font-semibold transition-colors"
                  >
                    Cancel Session
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

