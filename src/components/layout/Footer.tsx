import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                HF
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Hire<span className="text-blue-600">Flow</span>
              </span>
            </Link>
            <p className="text-xs lg:text-sm text-slate-500 leading-relaxed max-w-sm">
              Connecting great talent with great opportunities through smarter recruitment and intelligent hiring solutions.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-3 text-xs lg:text-sm text-slate-600">
              <li>
                <Link
                  href="/candidate/dashboard"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Candidate Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/recruiter/dashboard"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Recruiter Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Browse Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-xs lg:text-sm text-slate-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  About HireFlow
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Pricing &amp; Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Preferences
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Access */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Account Access
            </h4>
            <ul className="space-y-3 text-xs lg:text-sm text-slate-600">
              <li>
                <Link
                  href="/login"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Create Free Account
                </Link>
              </li>
              <li>
                <Link
                  href="/forgot-password"
                  className="hover:text-blue-600 transition-colors inline-block"
                >
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 HireFlow. All rights reserved.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Designed for smarter hiring. Built with Next.js, Prisma, PostgreSQL &amp; AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
