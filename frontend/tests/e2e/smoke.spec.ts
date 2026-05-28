/**
 * @module tests/e2e/smoke
 * @description Playwright smoke tests — proves the app loads and core
 * accessibility features work in a real browser. Runs in CI on every PR.
 * Not for business logic — that's Vitest's job.
 * @version 1.0.0
 */
import { test, expect } from '@playwright/test';

test('app loads with correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/__APP_NAME__/i);
});

test('main navigation is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('main content landmark is present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
});

test('skip-to-content link is first focusable element', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toContainText(/skip to main content/i);
});

test('no images are missing alt text', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('img:not([alt])')).toHaveCount(0);
});

test('page has exactly one h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
});


// TODO: Replace with the actual core user flow for this challenge
test('core user flow is reachable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
});
