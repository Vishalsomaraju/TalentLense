/**
 * @module tests/accessibility/html
 * @description Verifies index.html has required a11y structure.
 * JSX-level checks are handled by eslint-plugin-jsx-a11y in CI.
 */
import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

describe("index.html accessibility", () => {
  let html: string;

  beforeAll(() => {
    html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf8");
  });

  it("html element has lang attribute", () =>
    { expect(html).toMatch(/<html[^>]+lang=/); });
  it("has meta viewport", () => { expect(html).toContain('name="viewport"'); });
  it("has title element", () => { expect(html).toMatch(/<title>[^<]+<\/title>/); });
  it("has skip-to-content link", () =>
    { expect(html).toMatch(/Skip to main content/i); });
  it("skip link points to #main-content", () =>
    { expect(html).toContain('href="#main-content"'); });
  it("skip link has sr-only class", () =>
    { expect(html).toContain('class="sr-only"'); });
  it("has Google Fonts via link (not @import)", () =>
    { expect(html).toMatch(/fonts\.googleapis\.com/); });

  it("has meta description", () =>
    { expect(html).toContain('name="description"'); });
  it("has theme-color meta", () =>
    { expect(html).toContain('name="theme-color"'); });
});


