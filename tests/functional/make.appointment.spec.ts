import { test, expect } from '@playwright/test';

test.describe("Make Appointment tests", () => {
  test.beforeEach("Login with valid credentials",async ({page}) => {
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    await page.getByPlaceholder('Username').fill('John Doe');
    await page.getByPlaceholder('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('h2')).toHaveText('Make Appointment');
  });
  test("Test should make an appointment with non default values", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page
      .getByRole("listitem")
      .filter({ hasText: "info@katalon.com" })
      .click();
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByText("Medicaid").click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "21" }).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a multi line comment being captured ");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });

})