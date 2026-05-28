/**
 * @module tests/security/firestore
 * @description Verifies firestore.rules has deny-all default and auth requirements.
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

describe("firestore.rules — security", () => {
  let rules: string;

  beforeAll(() => {
    rules = fs.readFileSync(
      path.resolve(process.cwd(), "firestore.rules"),
      "utf8",
    );
  });

  it("file exists", () =>
    expect(fs.existsSync(path.resolve(process.cwd(), "firestore.rules"))).toBe(
      true,
    ));
  it("has deny-all default rule", () =>
    expect(rules).toContain("allow read, write: if false"));
  it("requires auth for writes", () =>
    expect(rules).toContain("request.auth != null"));
  it("uses hasOnlyFields field validation", () =>
    expect(rules).toContain("hasOnlyFields"));
});
