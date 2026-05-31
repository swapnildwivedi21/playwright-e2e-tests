import { test, expect } from "@playwright/test";

test.describe("Make Appointment tests", () => {
  test.beforeEach("Login with valid credentials", async ({ page}, testinfo) => {
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ button: "right" });
    await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ timeout: 5000 });

    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();

    await page.getByPlaceholder("Username").fill("John Doe");
    await page.getByPlaceholder("Username").fill("John Doe");
    await page.getByPlaceholder("Username").clear();
    await page
      .getByPlaceholder("Username")
      .pressSequentially("John Doe", { delay: 100 });

    await page.getByPlaceholder("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toHaveText("Make Appointment");

    //element level screenshot
    let fullpagescreenshot = await page.screenshot({fullPage: true});
    await testinfo.attach("fullpagescreenshot", {
      body: fullpagescreenshot,
      contentType: "image/png",
    });
    //Assert the default option
    await expect(page.getByLabel("Facility")).toHaveValue(
      "Tokyo CURA Healthcare Center",
    );

    //Assert the count
    let dropdowncount = page.getByLabel("Facility").locator("option");
    await expect(dropdowncount).toHaveCount(3);
    //Get all the options in the dropdown and print them

    let listofdropdownoptions = await page.getByLabel("Facility").all();
    let listofoptions = [];
    for (let element of listofdropdownoptions) {
      let elementtext = await element.textContent();
      if (elementtext) {
        console.log(elementtext.trim());
        listofoptions.push(elementtext.trim());
      }
    }
  });
  test("Test should make an appointment with non default values", async ({
    page,
  }) => {
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
});
