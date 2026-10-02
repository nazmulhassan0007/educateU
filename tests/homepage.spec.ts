import { test, expect } from "@playwright/test";

test.describe("educateU Business homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders every section from the design", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Online courses");
    for (const name of [
      "Every course. Certificate included. Pay once.",
      "Browse by subject",
      "Popular courses",
      "From enrol to certificate.",
      "Training a team? Do the maths here.",
      "What our learners say",
      "Frequently asked questions",
    ]) {
      await expect(page.getByRole("heading", { name })).toBeAttached();
    }
    await expect(page.getByRole("heading", { name: /No subscriptions/ })).toBeAttached();
    await expect(page.getByRole("contentinfo")).toContainText("© 2026");
  });

  test("hero images and logos load", async ({ page }) => {
    const broken = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.getAttribute("src")),
    );
    expect(broken).toEqual([]);
  });

  test("add to cart updates the header count", async ({ page }) => {
    const badge = page.getByLabel(/items in cart/);
    const first = page.getByRole("button", { name: "Add to cart" }).first();
    await first.scrollIntoViewIfNeeded();
    await first.click();
    await expect(first).toContainText("Added");
    await expect(page.getByLabel("1 items in cart")).toBeAttached();
    await expect(badge).toHaveCount(1);
  });

  test("FAQ accordion opens and closes", async ({ page }) => {
    const second = page.getByRole("button", { name: /Are CPD courses/ });
    await second.scrollIntoViewIfNeeded();
    await expect(second).toHaveAttribute("aria-expanded", "false");
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/CPD-certified training shows regulators/)).toBeVisible();
    // Opening one closes the previously open item.
    await expect(page.getByRole("button", { name: /What is the best online compliance/ })).toHaveAttribute("aria-expanded", "false");
  });

  test("team calculator recomputes the total", async ({ page }) => {
    const slider = page.getByLabel("Learners", { exact: true });
    await slider.scrollIntoViewIfNeeded();
    await expect(page.getByText("3 courses × 25 learners × £15")).toBeVisible();
    await slider.fill("40");
    await expect(page.getByText("3 courses × 40 learners × £15")).toBeVisible();
    await page.getByRole("button", { name: "E-Safety" }).click();
    await expect(page.getByText("4 courses × 40 learners × £15")).toBeVisible();
    await expect(page.getByText("£2,400")).toBeVisible({ timeout: 5000 });
  });

  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("full-page screenshot", async ({ page }, testInfo) => {
    // Scroll through so every in-view animation has fired before capture.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 300));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: testInfo.outputPath(`home-${testInfo.project.name}.png`), fullPage: true });
  });
});
