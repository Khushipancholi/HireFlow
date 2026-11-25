"use client";

import { useState } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import { Upload, FileText, Download, CheckCircle2, Sparkles, Trash2, Eye } from "lucide-react";

export default function CandidateResumePage() {
  const [resumes, setResumes] = useState([
    {
      id: "res-1",
      name: "Alex_Rivera_FullStack_2026.pdf",
      version: "v1.2 (Primary)",
      uploadedAt: "Nov 2, 2026",
      aiScore: 92,
      size: "248 KB",
    },
    {
      id: "res-2",
      name: "Alex_Rivera_Lead_Architect.pdf",
      version: "v1.1",
      uploadedAt: "Oct 15, 2026",
      aiScore: 86,
      size: "215 KB",
    },
  ]);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        const newResume = {
          id: `res-${Date.now()}`,
          name: file.name,
          version: `v1.${resumes.length + 1}`,
          uploadedAt: "Just now",
          aiScore: 89,
          size: `${Math.round(file.size / 1024)} KB`,
        };
        setResumes([newResume, ...resumes]);
        setMessage("Resume uploaded and parsed via Ollama AI successfully!");
        setTimeout(() => setMessage(null), 3500);
      }, 700);
    }
  };

  const handleDownload = (name: string) => {
    alert(`Downloading ${name} to your local downloads folder.`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this resume version?")) {
      setResumes(resumes.filter((r) => r.id !== id));
    }
  };

  return (
    <>
      <PortalHeader
        title="Resume Builder & Parser"
        description="Upload, parse, and optimize your resumes with local AI analysis"
        roleBadge="Candidate"
      />

      <main className="p-6 md:p-8 space-y-6 max-w-4xl">
        {message && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {message}
          </div>
        )}

        {/* Upload Dropzone */}
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Upload a New Resume</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            PDF or DOCX documents up to 10MB. Automatically parsed with local Ollama model.
          </p>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-xs cursor-pointer transition-colors">
            {uploading ? "Analyzing & Storing..." : "Choose File to Upload"}
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Resume Versions List */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Stored Resume Versions</h2>
              <p className="text-xs text-slate-500">Managed in PostgreSQL with version control</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {resumes.map((res) => (
              <div
                key={res.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900">{res.name}</p>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                        {res.version}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Uploaded {res.uploadedAt} • {res.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> {res.aiScore}/100 AI Score
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownload(res.name)}
                      className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Download Resume"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Version"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

