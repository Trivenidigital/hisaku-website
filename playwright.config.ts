import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — E2E + a11y for hisaku-website.
 *
 * Runs against `next dev` by default locally, and the preview URL in CI.
 * The per-project browser matrix covers Chromium (View Transitions supported),
 * WebKit (Safari, partial support), and Firefox (no support — tests fallback).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // Mobile viewport for responsive + hamburger tests.
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
});
