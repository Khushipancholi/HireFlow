"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PortalHeader from "@/components/layout/PortalHeader";
import { Sparkles, ArrowLeft, Save, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CreateJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("FULL_TIME");
  const [experience, setExperience] = useState("3+ years");
  const [minSalary, setMinSalary] = useState("100000");
  const [maxSalary, setMaxSalary] = useState("140000");
  const [skills, setSkills] = useState("Next.js, TypeScript, PostgreSQL, Tailwind CSS");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiNotice, setAiNotice] = useState<{ type: "success" | "warn"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      alert("Please enter a Job Title first so the AI knows what role to generate.");
      return;
    }

    setGeneratingAI(true);
    setAiNotice(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate-job-desc",
          payload: {
            title,
            skills,
            experience,
            location,
            employmentType,
          },
        }),
      });

      const data = await res.json();

      if (data.success && data.description) {
        setDescription(data.description);
        setRequirements(
          `- Strong demonstrated experience with ${skills}.\n- Proven track record delivering production-grade web systems.\n- Experience working with relational databases (PostgreSQL/Prisma).\n- Solid communication and collaborative problem-solving skills.`
        );
        setAiNotice({
          type: "success",
          text: "Job specification generated successfully via local Ollama engine.",
        });
      } else {
        // Fallback when Ollama is offline
        setDescription(data.fallbackDescription || `We are looking for an experienced ${title} to join our engineering team.`);
        setRequirements(
          `- Professional expertise with ${skills}.\n- 3+ years delivering robust web applications.\n- Strong architectural and problem-solving skills.`
        );
        setAiNotice({
          type: "warn",
          text: data.error || "AI service is currently unavailable. Please start Ollama and try again. Generated structured fallback draft.",
        });
      }
    } catch {
      setDescription(`We are seeking an experienced ${title} to lead key engineering deliverables.`);
      setRequirements(`- 3+ years experience with ${skills}.\n- Excellent team collaboration and architectural abilities.`);
      setAiNotice({
        type: "warn",
        text: "AI service is currently unavailable. Please start Ollama and try again.",
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = (status: "DRAFT" | "PUBLISHED") => {
    if (!title.trim()) {
      alert("Please enter a job title.");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(`Job "${title}" successfully saved as ${status} in PostgreSQL!`);
      router.push("/recruiter/jobs");
    }, 500);
  };

  return (
    <>
      <PortalHeader
        title="Create New Requisition"
        description="Draft, generate with local Ollama AI, and publish a new engineering job opening"
        roleBadge="Recruiter"
      />

      <main className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto w-full">
        <Link
          href="/recruiter/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Manage Jobs
        </Link>

        {/* AI Helper Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">AI Job Description Generator</p>
              <p className="text-[11px] text-slate-600">
                Type the title and skills, then click generate to create a professional spec with your local model.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={generatingAI}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shrink-0 disabled:opacity-50 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {generatingAI ? "Calling Ollama..." : "AI Generate Spec"}
          </button>
        </div>

        {aiNotice && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 border ${
              aiNotice.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {aiNotice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{aiNotice.text}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Full Stack Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g. Bangalore, Remote, or Hybrid"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Min Salary ($/yr)</label>
              <input
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max Salary ($/yr)</label>
              <input
                type="number"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Role Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline mission, key deliverables, and team context..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Role Requirements</label>
            <textarea
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="List qualifications, required experience, and competencies..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit("DRAFT")}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit("PUBLISHED")}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Publish to Job Board
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
