/**
 * @module tests/security/env
 * @description Verifies environment variable hygiene.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const frontendRoot = path.resolve(process.cwd());
const repoRoot = path.resolve(process.cwd(), "..");

const readEnv = (f: string): string => fs.readFileSync(path.join(frontendRoot, f), "utf-8");
const readRepo = (f: string): string => fs.readFileSync(path.join(repoRoot, f), "utf-8");

describe("Environment variable security", () => {
  it(".env.example exists", () =>
    { expect(fs.existsSync(path.join(frontendRoot, ".env.example"))).toBe(true); });
  it(".env.example has VITE_FIREBASE_API_KEY", () =>
    { expect(readEnv(".env.example")).toContain("VITE_FIREBASE_API_KEY="); });
  it(".env.example has VITE_FIREBASE_PROJECT_ID", () =>
    { expect(readEnv(".env.example")).toContain("VITE_FIREBASE_PROJECT_ID="); });
  it(".env.example has VITE_GA_MEASUREMENT_ID", () =>
    { expect(readEnv(".env.example")).toContain("VITE_GA_MEASUREMENT_ID="); });
  it(".gitignore excludes .env files", () =>
    { expect(readRepo(".gitignore")).toMatch(/^\.env.*/m); });
  it(".gitignore excludes AI tool caches", () =>
    { expect(readRepo(".gitignore")).toMatch(/^\.cursor.*/m); });
  it(".gitignore excludes graphify-out", () =>
    { expect(readRepo(".gitignore")).toMatch(/^graphify-out\//m); });
  it(".gitignore excludes CLAUDE.md", () =>
    { expect(readRepo(".gitignore")).toMatch(/^CLAUDE\.md/m); });
});

describe("No raw API keys in source files", () => {
  const filesToCheck = [
    "src/config/firebase.ts",
    "src/config/env.ts",
    "src/services/analyticsService.ts",
  ].filter((f) => fs.existsSync(path.join(frontendRoot, f)));

  filesToCheck.forEach((file) => {
    it(`${file} has no raw Firebase API key`, () => {
      expect(readEnv(file)).not.toMatch(/AIzaSy[A-Za-z0-9_-]{33}/);
    });
  });
});
