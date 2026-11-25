import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("HireFlow 25 Core Routes Verification", () => {
  const rootDir = path.resolve(__dirname, "../../");

  const coreRoutes = [
    // Module A: Public
    { route: "/", file: "src/app/page.tsx" },
    { route: "/about", file: "src/app/about/page.tsx" },
    { route: "/contact", file: "src/app/contact/page.tsx" },
    { route: "/pricing", file: "src/app/pricing/page.tsx" },
    { route: "/careers", file: "src/app/careers/page.tsx" },
    // Module B: Authentication
    { route: "/login", file: "src/app/(auth)/login/page.tsx" },
    { route: "/register", file: "src/app/(auth)/register/page.tsx" },
    { route: "/forgot-password", file: "src/app/(auth)/forgot-password/page.tsx" },
    // Module C: Candidate Portal
    { route: "/candidate/dashboard", file: "src/app/candidate/dashboard/page.tsx" },
    { route: "/candidate/jobs", file: "src/app/candidate/jobs/page.tsx" },
    { route: "/candidate/jobs/[id]", file: "src/app/candidate/jobs/[id]/page.tsx" },
    { route: "/candidate/applications", file: "src/app/candidate/applications/page.tsx" },
    { route: "/candidate/profile", file: "src/app/candidate/profile/page.tsx" },
    { route: "/candidate/resume", file: "src/app/candidate/resume/page.tsx" },
    { route: "/candidate/ai-assistant", file: "src/app/candidate/ai-assistant/page.tsx" },
    // Module D: Recruiter Portal
    { route: "/recruiter/dashboard", file: "src/app/recruiter/dashboard/page.tsx" },
    { route: "/recruiter/jobs", file: "src/app/recruiter/jobs/page.tsx" },
    { route: "/recruiter/jobs/create", file: "src/app/recruiter/jobs/create/page.tsx" },
    { route: "/recruiter/applicants", file: "src/app/recruiter/applicants/page.tsx" },
    { route: "/recruiter/applicants/[id]", file: "src/app/recruiter/applicants/[id]/page.tsx" },
    { route: "/recruiter/interviews", file: "src/app/recruiter/interviews/page.tsx" },
    // Module E: Admin & Shared
    { route: "/admin/dashboard", file: "src/app/admin/dashboard/page.tsx" },
    { route: "/admin/users", file: "src/app/admin/users/page.tsx" },
    { route: "/admin/analytics", file: "src/app/admin/analytics/page.tsx" },
    { route: "/settings", file: "src/app/settings/page.tsx" },
  ];

  it("should have exactly 25 core routes defined", () => {
    expect(coreRoutes.length).toBe(25);
  });

  coreRoutes.forEach(({ route, file }) => {
    it(`should have valid page file and default export for route: ${route}`, () => {
      const fullPath = path.join(rootDir, file);
      expect(fs.existsSync(fullPath)).toBe(true);

      const content = fs.readFileSync(fullPath, "utf-8");
      expect(content).toMatch(/export\s+default\s+function/);
    });
  });

  it("should have Tailwind CSS properly imported in root layout and configured", () => {
    const layoutPath = path.join(rootDir, "src/app/layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");
    expect(layoutContent).toContain("./globals.css");

    const cssPath = path.join(rootDir, "src/app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    expect(cssContent).toContain("@tailwind base;");
    expect(cssContent).toContain("@tailwind components;");
    expect(cssContent).toContain("@tailwind utilities;");
  });
});

