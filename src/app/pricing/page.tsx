import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter / Candidate",
      price: "$0",
      period: "forever",
      description: "Ideal for individual job seekers looking to build resumes and find careers.",
      features: [
        "Unlimited Job Applications",
        "AI Resume Parser & Builder",
        "AI Career Assistant Chat",
        "Application Status Tracking",
        "Direct Interview Coordination",
      ],
      cta: "Get Started Free",
      href: "/register",
      highlight: false,
    },
    {
      name: "Recruiter Pro",
      price: "$49",
      period: "per recruiter / mo",
      description: "Advanced applicant tracking, automated candidate matching, and AI screening.",
      features: [
        "Everything in Starter",
        "Post Unlimited Job Openings",
        "AI Match Score Scoring",
        "Automated Interview Scheduling",
        "Recruiter Collaboration Notes",
        "Local Ollama Model Integration",
      ],
      cta: "Start Free 14-Day Trial",
      href: "/register",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per company / mo",
      description: "Comprehensive management console for platform admins and large enterprises.",
      features: [
        "Everything in Recruiter Pro",
        "Full Admin User Management",
        "Platform Analytics & Funnels",
        "Audit Log Compliance Tracking",
        "Custom Ollama AI Fine-Tuning",
        "Dedicated System Support",
      ],
      cta: "Contact Enterprise Sales",
      href: "/contact",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2 block">
              Transparent Pricing
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Flexible Plans for Every Stage of Hiring
            </h1>
            <p className="mt-3 text-slate-600 text-sm md:text-base">
              Start free as a candidate or supercharge your recruitment workflow with our AI-powered suites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? "bg-white border-2 border-blue-600 shadow-xl relative scale-105 z-10"
                    : "bg-white border border-slate-200/90 shadow-xs"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500 ml-1.5">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6">
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      plan.highlight
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

