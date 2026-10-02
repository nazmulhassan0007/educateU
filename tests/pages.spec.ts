import { test, expect } from "@playwright/test";

test.describe("Inner pages", () => {
  test("about page renders mission, vision and values", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Who");
    for (const name of ["Our mission", "Vision", "Our values", "Why educateU?", "Who educateU is for", "Our commitment"]) {
      await expect(page.getByRole("heading", { name })).toBeAttached();
    }
  });

  test("courses page filters, searches and adds to cart", async ({ page }) => {
    await page.goto("/courses");
    await expect(page.getByText("Showing 9 of 18 courses")).toBeVisible();
    await page.getByRole("tab", { name: /Compliance/ }).click();
    await expect(page.getByText("Showing 4 of 4 courses in Compliance")).toBeVisible();
    await page.getByRole("tab", { name: /All courses/ }).click();
    await page.getByPlaceholder("Search courses").fill("first aid");
    await expect(page.getByRole("heading", { name: "Emergency First Aid at Work" })).toBeVisible();
    await expect(page.getByText(/Showing 1 of 1 course/)).toBeVisible();
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await expect(page.getByLabel("1 items in cart")).toBeAttached();
    await page.getByPlaceholder("Search courses").fill("zzzz");
    await expect(page.getByText(/No courses match/)).toBeVisible();
  });

  test("contact form validates and confirms", async ({ page }) => {
    await page.goto("/contact-us");
    const submit = page.getByRole("button", { name: /Submit your enquiry/ });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();
    await expect(page.getByText("Enter your first name.")).toBeVisible();
    await page.getByLabel(/First name/).fill("Sam");
    await page.getByLabel(/Last name/).fill("Taylor");
    await page.getByLabel(/Phone number/).fill("+44 20 1234 5678");
    await page.getByLabel(/Email address/).fill("sam@example.co.uk");
    await page.getByLabel(/Inquiry type/).selectOption("Company Training");
    await page.getByLabel(/Message/).fill("We would like a quote for 20 learners.");
    await submit.click();
    await expect(page.getByText("Thanks, Sam. Enquiry received.")).toBeVisible();
  });

  test("support hub search narrows the FAQ", async ({ page }) => {
    await page.goto("/support-hub");
    const search = page.getByPlaceholder(/Search certificates/);
    await search.scrollIntoViewIfNeeded();
    await search.fill("refund");
    await expect(page.getByText(/answers? for “refund”/)).toBeVisible();
    await expect(page.getByRole("button", { name: "How do I request a refund?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Can I resume a course later if I don't finish it in one sitting?" })).toHaveCount(0);
  });

  test("navbar links reach every page", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Desktop nav only");
    await page.goto("/");
    for (const [label, path] of [["About Us", "/about"], ["Courses", "/courses"], ["Support Hub", "/support-hub"], ["Contact Us", "/contact-us"]]) {
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    }
  });

  for (const path of ["/about", "/courses", "/contact-us", "/support-hub"]) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
