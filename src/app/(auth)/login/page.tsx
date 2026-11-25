"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "recruiter" | "admin">("candidate");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client validation
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    // Dynamic role-based redirection to portal
    setTimeout(() => {
      setLoading(false);
      if (role === "candidate") {
        router.push("/candidate/dashboard");
      } else if (role === "recruiter") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select your portal role and sign in to continue
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="mb-6 p-1 bg-slate-100 rounded-xl grid grid-cols-3 gap-1 border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setRole("candidate")}
          className={`py-2 rounded-lg transition-all ${
            role === "candidate"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Candidate
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
          Recruiter
        </button>
        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`py-2 rounded-lg transition-all ${
            role === "admin"
              ? "bg-white text-violet-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Admin
        </button>
      </div>

      {error && (
        <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Remember this device for 30 days</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Authenticating..." : `Sign In to ${role.charAt(0).toUpperCase() + role.slice(1)} Portal`}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Footer link */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
        Don&apos;t have a HireFlow account?{" "}
        <Link href="/register" className="text-blue-600 font-bold hover:underline">
          Create free account
        </Link>
      </div>
    </div>
  );
}
