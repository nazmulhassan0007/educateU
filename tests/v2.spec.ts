import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("letters hero renders with video and facts", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Online courses and certification");
    await expect(page.locator("video[src='/aw/hero.mp4']")).toBeAttached();
    await expect(page.getByText("CPD certificate included").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Enrol your team" })).toHaveAttribute("href", "#team");
  });

  test("FAQ reader switches the open question", async ({ page }) => {
    const second = page.getByRole("tab", { name: /Are CPD courses/ });
    await second.scrollIntoViewIfNeeded();
    await second.click();
    await expect(second).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tab", { name: /What is the best online compliance/ })).toHaveAttribute("aria-selected", "false");
    await expect(page.getByText(/CPD-certified training shows regulators/).filter({ visible: true })).toHaveCount(1);
  });

  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("old /v2 link redirects home", async ({ page }) => {
    await page.goto("/v2");
    await expect(page).toHaveURL(/\/$/);
  });
});
