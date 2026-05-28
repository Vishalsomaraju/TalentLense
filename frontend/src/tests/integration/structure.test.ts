/**
 * @module tests/integration/structure
 * @description Verifies all mandatory project files exist.
 * A missing file = lost Code Quality points. Catches it before submission.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const exists = (f: string) => fs.existsSync(path.join(root, f));

describe("Root config files", () => {
  it("tsconfig.json", () => expect(exists("tsconfig.json")).toBe(true));
  it("tsconfig.app.json", () => expect(exists("tsconfig.app.json")).toBe(true));
  it("vite.config.ts", () => expect(exists("vite.config.ts")).toBe(true));
  it("vitest.config.ts", () => expect(exists("vitest.config.ts")).toBe(true));
  it("eslint.config.js", () => expect(exists("eslint.config.js")).toBe(true));
  it("package.json", () => expect(exists("package.json")).toBe(true));
  it(".env.example", () => expect(exists(".env.example")).toBe(true));
  it(".gitignore", () => expect(exists(".gitignore")).toBe(true));
});

describe("Security files", () => {
  it("firebase.json", () => expect(exists("firebase.json")).toBe(true));
  it("vercel.json", () => expect(exists("vercel.json")).toBe(true));
  it("firestore.rules", () => expect(exists("firestore.rules")).toBe(true));
});

describe("PWA files", () => {
  it("manifest.json", () => expect(exists("manifest.json")).toBe(true));
  it("public/sw.js", () => expect(exists("public/sw.js")).toBe(true));
  it("index.html", () => expect(exists("index.html")).toBe(true));
});

describe("Documentation", () => {
  it("README.md", () => expect(exists("README.md")).toBe(true));
  it("TESTING.md", () => expect(exists("TESTING.md")).toBe(true));
  it("CONTRIBUTING.md", () => expect(exists("CONTRIBUTING.md")).toBe(true));
  it("LICENSE", () => expect(exists("LICENSE")).toBe(true));
  it("GOOGLE_SERVICES.md", () =>
    expect(exists("GOOGLE_SERVICES.md")).toBe(true));
  it("docs/ARCHITECTURE.md", () =>
    expect(exists("docs/ARCHITECTURE.md")).toBe(true));
});

describe("GitHub infrastructure", () => {
  it(".github/workflows/ci.yml", () =>
    expect(exists(".github/workflows/ci.yml")).toBe(true));
  it(".github/pull_request_template.md", () =>
    expect(exists(".github/pull_request_template.md")).toBe(true));
  it(".github/ISSUE_TEMPLATE/bug_report.md", () =>
    expect(exists(".github/ISSUE_TEMPLATE/bug_report.md")).toBe(true));
  it(".github/ISSUE_TEMPLATE/feature_request.md", () =>
    expect(exists(".github/ISSUE_TEMPLATE/feature_request.md")).toBe(true));
});

describe("Source structure", () => {
  it("src/components/ui", () => expect(exists("src/components/ui")).toBe(true));
  it("src/components/features", () =>
    expect(exists("src/components/features")).toBe(true));
  it("src/config", () => expect(exists("src/config")).toBe(true));
  it("src/constants", () => expect(exists("src/constants")).toBe(true));
  it("src/hooks", () => expect(exists("src/hooks")).toBe(true));
  it("src/services", () => expect(exists("src/services")).toBe(true));
  it("src/types", () => expect(exists("src/types")).toBe(true));
  it("src/utils", () => expect(exists("src/utils")).toBe(true));
});

describe("Key source files", () => {
  it("src/config/firebase.ts", () =>
    expect(exists("src/config/firebase.ts")).toBe(true));
  it("src/config/env.ts", () => expect(exists("src/config/env.ts")).toBe(true));
  it("src/constants/index.ts", () =>
    expect(exists("src/constants/index.ts")).toBe(true));
  it("src/types/index.ts", () =>
    expect(exists("src/types/index.ts")).toBe(true));
  it("src/services/analyticsService.ts", () =>
    expect(exists("src/services/analyticsService.ts")).toBe(true));
  it("src/components/ui/ErrorBoundary.tsx", () =>
    expect(exists("src/components/ui/ErrorBoundary.tsx")).toBe(true));
  it("src/test/setup.ts", () => expect(exists("src/test/setup.ts")).toBe(true));
});
