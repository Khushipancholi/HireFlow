"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Building, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute password strength
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "Empty", color: "bg-slate-200" };
    if (password.length < 6) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { score: 2, label: "Medium", color: "bg-amber-500" };
    return { score: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (role === "recruiter" && !company.trim()) {
      setError("Please provide your company or organization name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the HireFlow terms of service.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === "candidate") {
        router.push("/candidate/dashboard");
      } else {
        router.push("/recruiter/dashboard");
      }
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Join HireFlow as a job seeker or corporate recruiter
        </p>
      </div>

      {/* Role Picker Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={`py-2 rounded-lg transition-all ${
            role === "candidate"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Candidate / Job Seeker
        </button>
        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`py-2 rounded-lg transition-all ${
            role === "recruiter"
              ? "bg-white text-indigo-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Employer / Recruiter
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {role === "recruiter" && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Technologies Inc."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          {password && (
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Password strength:</span>
              <span className="font-semibold text-slate-700">{strength.label}</span>
            </div>
          )}
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-0.5"
            />
            <span>
              I agree to the HireFlow Terms of Service and Privacy Policy.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="text-blue-600 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
