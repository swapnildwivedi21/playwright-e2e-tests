import { Page, Locator } from "@playwright/test";
import { CuraBasePage } from "./cura.base.page";

export class HomePage extends CuraBasePage {
  // Locators
  private pageTitle: Locator;
  private makeAppointmentLink: Locator;
  private menuButton: Locator;
  private loginButton: Locator;
  private logoutButton: Locator;
  private hamburgerMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator("h1");
    this.makeAppointmentLink = page.getByRole("link", { name: "Make Appointment" });
    this.menuButton = page.getByRole("button", { name: "Toggle navigation" });
    this.loginButton = page.getByRole("link", { name: "Login" });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
    this.hamburgerMenu = page.getByRole("button");
  }

  async navigateToHome(url: string): Promise<void> {
    await this.navigateTo(url);
  }

  async getPageTitleText(): Promise<string | null> {
    return await this.getText(this.pageTitle);
  }

  async isMakeAppointmentLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.makeAppointmentLink);
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.loginButton);
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.logoutButton);
  }

  async clickMakeAppointmentLink(): Promise<void> {
    await this.clickElement(this.makeAppointmentLink);
  }

  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async clickLogoutButton(): Promise<void> {
    await this.clickElement(this.logoutButton);
  }

  async clickMenuButton(): Promise<void> {
    await this.clickElement(this.menuButton);
  }

  async isHomePageLoaded(): Promise<boolean> {
    const title = await this.getPageTitleText();
    return title === "CURA Healthcare Service";
  }

  async verifyHomepageElements(): Promise<boolean> {
    const titleVisible = await this.isVisible(this.pageTitle);
    const makeAppointmentVisible = await this.isMakeAppointmentLinkVisible();
    return titleVisible && makeAppointmentVisible;
  }
}
