import { Page, Locator } from "@playwright/test";
import { CuraBasePage } from "./cura.base.page";

export class LoginPage extends CuraBasePage {
  // Locators
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginHeading: Locator;
  private loginMessage: Locator;
  private makeAppointmentLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.loginHeading = page.locator("h2");
    this.loginMessage = page.getByText("Please login to make appointment.");
    this.makeAppointmentLink = page.getByRole("link", { name: "Make Appointment" });
  }

  async navigateToApp(url: string): Promise<void> {
    await this.navigateTo(url);
  }

  async clickMakeAppointmentLink(): Promise<void> {
    await this.clickElement(this.makeAppointmentLink);
  }

  async enterUsername(username: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillText(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.loginMessage);
  }

  async clearUsernameField(): Promise<void> {
    await this.clearField(this.usernameInput);
  }

  async clearPasswordField(): Promise<void> {
    await this.clearField(this.passwordInput);
  }

  async getLoginHeadingText(): Promise<string | null> {
    return await this.getText(this.loginHeading);
  }

  async verifyLoginPageLoaded(): Promise<boolean> {
    const message = await this.isLoginMessageVisible();
    const button = await this.isVisible(this.loginButton);
    return message && button;
  }
}
