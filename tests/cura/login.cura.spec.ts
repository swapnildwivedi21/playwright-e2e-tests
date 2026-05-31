import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/cura-pages/home.page";
import { LoginPage } from "../../page-objects/cura-pages/login.page";
import { CURA_TEST_DATA } from "../../data/cura.test-data";

test.describe("CURA Login Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach("Navigate to CURA home", async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateToHome(CURA_TEST_DATA.baseUrl);
  });

  test("TC001: Verify Home Page Load", async () => {
    const titleText = await homePage.getPageTitleText();
    expect(titleText).toBe(CURA_TEST_DATA.pageTexts.homePageTitle);
    
    const isLoaded = await homePage.isHomePageLoaded();
    expect(isLoaded).toBe(true);
  });

  test("TC002: Verify Make Appointment Link is Visible", async () => {
    const isMakeAppointmentVisible = await homePage.isMakeAppointmentLinkVisible();
    expect(isMakeAppointmentVisible).toBe(true);
  });

  test("TC003: Navigate to Login Page", async () => {
    await homePage.clickMakeAppointmentLink();
    
    const isLoginPageLoaded = await loginPage.verifyLoginPageLoaded();
    expect(isLoginPageLoaded).toBe(true);
  });

  test("TC004: Login with Valid Credentials", async () => {
    await homePage.clickMakeAppointmentLink();
    
    const isLoginMessageVisible = await loginPage.isLoginMessageVisible();
    expect(isLoginMessageVisible).toBe(true);
    
    await loginPage.login(
      CURA_TEST_DATA.users.validUser.username,
      CURA_TEST_DATA.users.validUser.password,
    );
    
    await loginPage.page.waitForLoadState("networkidle");
    
    const headingText = await loginPage.getLoginHeadingText();
    expect(headingText).toBe(CURA_TEST_DATA.pageTexts.makeAppointmentHeading);
  });

  test("TC005: Verify Username Field Can Be Cleared", async () => {
    await homePage.clickMakeAppointmentLink();
    
    const testUsername = "TestUser";
    await loginPage.enterUsername(testUsername);
    let currentValue = await loginPage.page
      .getByPlaceholder("Username")
      .inputValue();
    expect(currentValue).toBe(testUsername);
    
    await loginPage.clearUsernameField();
    currentValue = await loginPage.page
      .getByPlaceholder("Username")
      .inputValue();
    expect(currentValue).toBe("");
  });

  test("TC006: Verify Password Field Can Be Cleared", async () => {
    await homePage.clickMakeAppointmentLink();
    
    const testPassword = "TestPassword";
    await loginPage.enterPassword(testPassword);
    let currentValue = await loginPage.page
      .getByPlaceholder("Password")
      .inputValue();
    expect(currentValue).toBe(testPassword);
    
    await loginPage.clearPasswordField();
    currentValue = await loginPage.page
      .getByPlaceholder("Password")
      .inputValue();
    expect(currentValue).toBe("");
  });

  test("TC007: Verify Login Button is Enabled", async () => {
    await homePage.clickMakeAppointmentLink();
    
    const loginButton = loginPage.page.getByRole("button", { name: "Login" });
    const isEnabled = await loginPage.isEnabled(loginButton);
    expect(isEnabled).toBe(true);
  });
});
