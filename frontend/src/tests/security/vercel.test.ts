/**
 * @module tests/security/vercel
 * @description Verifies vercel.json contains all required security headers.
 * Frontend is deployed on Vercel — these headers are what actually activates.
 * firebase.json headers do nothing on Vercel (Firebase Hosting only).
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const readJson = (file: string): unknown =>
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

describe("vercel.json — security headers", () => {
  let headers: Array<{ key: string; value: string }>;

  beforeAll(() => {
    const config = readJson("vercel.json") as {
      headers: Array<{
        source: string;
        headers: Array<{ key: string; value: string }>;
      }>;
    };
    headers = config.headers.find((h) => h.source === "/(.*)")?.headers ?? [];
  });

  it("file exists", () =>
    { expect(fs.existsSync(path.join(root, "vercel.json"))).toBe(true); });
  it("has SPA rewrite rule", () => {
    const config = readJson("vercel.json") as { rewrites?: unknown[] };
    expect(config.rewrites?.length).toBeGreaterThan(0);
  });
  it("X-Frame-Options is DENY", () =>
    { expect(headers.find((h) => h.key === "X-Frame-Options")?.value).toBe(
      "DENY",
    ); });
  it("X-Content-Type-Options is nosniff", () =>
    { expect(headers.find((h) => h.key === "X-Content-Type-Options")?.value).toBe(
      "nosniff",
    ); });
  it("Strict-Transport-Security exists", () =>
    { expect(
      headers.find((h) => h.key === "Strict-Transport-Security")?.value,
    ).toMatch(/max-age=\d+/); });
  it("Content-Security-Policy exists", () =>
    { expect(
      headers.find((h) => h.key === "Content-Security-Policy")?.value,
    ).toContain("frame-ancestors 'none'"); });
  it("Referrer-Policy exists", () =>
    { expect(headers.find((h) => h.key === "Referrer-Policy")).toBeDefined(); });
  it("Permissions-Policy exists", () =>
    { expect(headers.find((h) => h.key === "Permissions-Policy")).toBeDefined(); });

});
