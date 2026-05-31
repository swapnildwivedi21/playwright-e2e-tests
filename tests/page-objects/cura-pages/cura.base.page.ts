import { Page, Locator } from "@playwright/test";

export class CuraBasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fillText(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string | null> {
    return await locator.textContent();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async selectDropdownOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async checkCheckbox(locator: Locator): Promise<void> {
    await locator.check();
  }

  async unCheckCheckbox(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  async getInputValue(locator: Locator): Promise<string | null> {
    return await locator.inputValue();
  }

  async hoverElement(locator: Locator): Promise<void> {
    await locator.hover();
  }

  async doubleClick(locator: Locator): Promise<void> {
    await locator.dblclick();
  }

  async rightClick(locator: Locator): Promise<void> {
    await locator.click({ button: "right" });
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ timeout });
  }

  async getAttributeValue(
    locator: Locator,
    attributeName: string,
  ): Promise<string | null> {
    return await locator.getAttribute(attributeName);
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async clearField(locator: Locator): Promise<void> {
    await locator.clear();
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async takeScreenshot(fileName: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `./screenshots/${fileName}` });
  }
}
