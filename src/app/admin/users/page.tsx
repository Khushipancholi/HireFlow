"use client";

import { useState } from "react";
import PortalHeader from "@/components/layout/PortalHeader";
import {
  Users,
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  Filter,
  UserCheck,
  UserX,
} from "lucide-react";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [users, setUsers] = useState([
    {
      id: "u-1",
      name: "Root Administrator",
      email: "admin@hireflow.local",
      role: "ADMIN",
      isActive: true,
      registeredAt: "Jan 1, 2026",
    },
    {
      id: "u-2",
      name: "Alex Rivera",
      email: "alex.candidate@hireflow.local",
      role: "CANDIDATE",
      isActive: true,
      registeredAt: "Feb 10, 2026",
    },
    {
      id: "u-3",
      name: "Sarah Jenkins",
      email: "sarah.recruiter@hireflow.local",
      role: "RECRUITER",
      isActive: true,
      registeredAt: "Mar 15, 2026",
    },
    {
      id: "u-4",
      name: "Suspicious Account",
      email: "spammer@unverified.org",
      role: "CANDIDATE",
      isActive: false,
      registeredAt: "Oct 12, 2026",
    },
  ]);

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <>
      <PortalHeader
        title="User Administration"
        description="Monitor registered accounts, adjust authorization, and enforce security policies"
        roleBadge="System Administrator"
      />

      <main className="p-6 md:p-8 space-y-6">
        {/* Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users by name or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="CANDIDATE">Candidate</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">User Details</th>
                  <th className="px-6 py-3.5">Access Role</th>
                  <th className="px-6 py-3.5">Account Status</th>
                  <th className="px-6 py-3.5">Registered</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-slate-400 text-[11px]">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          u.role === "ADMIN"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : u.role === "RECRUITER"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600">
                          <XCircle className="w-3.5 h-3.5" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{u.registeredAt}</td>
                    <td className="px-6 py-4 text-right">
                      {u.role !== "ADMIN" && (
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                            u.isActive
                              ? "bg-red-50 text-red-700 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {u.isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      )}
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

