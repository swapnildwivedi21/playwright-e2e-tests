import { test, expect } from "@playwright/test";

test.describe("Login tests", () => {
  test.beforeEach("Go to login page",async ({page}) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    //Launch the url and assert the title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible(); 
    await page.getByText("Please login to make").click();
  });

  test("test", async ({ page }) => {
    //Login with valid credentials
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("heading", { name: "Make Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

})

