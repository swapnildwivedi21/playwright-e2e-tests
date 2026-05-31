import { Page, Locator } from "@playwright/test";
import { CuraBasePage } from "./cura.base.page";

export class AppointmentPage extends CuraBasePage {
  // Locators
  private facilityDropdown: Locator;
  private readmissionCheckbox: Locator;
  private radiologyCheckbox: Locator;
  private medicaidRadio: Locator;
  private medicareRadio: Locator;
  private noneRadio: Locator;
  private visitDateInput: Locator;
  private commentTextarea: Locator;
  private bookAppointmentButton: Locator;
  private appointmentHeading: Locator;
  private homeLink: Locator;
  private dateCell: Locator;

  constructor(page: Page) {
    super(page);
    this.facilityDropdown = page.getByLabel("Facility");
    this.readmissionCheckbox = page.getByRole("checkbox", {
      name: "Apply for hospital readmission",
    });
    this.radiologyCheckbox = page.getByRole("checkbox", { name: "Radiography" });
    this.medicaidRadio = page.getByText("Medicaid");
    this.medicareRadio = page.getByText("Medicare");
    this.noneRadio = page.getByText("None");
    this.visitDateInput = page.getByRole("textbox", {
      name: "Visit Date (Required)",
    });
    this.commentTextarea = page.getByRole("textbox", { name: "Comment" });
    this.bookAppointmentButton = page.getByRole("button", {
      name: "Book Appointment",
    });
    this.appointmentHeading = page.locator("h2");
    this.homeLink = page.getByRole("link", { name: "Go to Homepage" });
  }

  async selectFacility(facilityName: string): Promise<void> {
    await this.selectDropdownOption(this.facilityDropdown, facilityName);
  }

  async getSelectedFacility(): Promise<string | null> {
    return await this.getInputValue(this.facilityDropdown);
  }

  async checkReadmissionCheckbox(): Promise<void> {
    await this.checkCheckbox(this.readmissionCheckbox);
  }

  async uncheckReadmissionCheckbox(): Promise<void> {
    await this.unCheckCheckbox(this.readmissionCheckbox);
  }

  async isReadmissionChecked(): Promise<boolean> {
    return await this.isChecked(this.readmissionCheckbox);
  }

  async checkRadiologyCheckbox(): Promise<void> {
    await this.checkCheckbox(this.radiologyCheckbox);
  }

  async isRadiologyChecked(): Promise<boolean> {
    return await this.isChecked(this.radiologyCheckbox);
  }

  async selectInsuranceType(insuranceType: string): Promise<void> {
    const radioOptions = {
      medicaid: this.medicaidRadio,
      medicare: this.medicareRadio,
      none: this.noneRadio,
    };

    const selectedRadio = radioOptions[insuranceType.toLowerCase()];
    if (selectedRadio) {
      await this.clickElement(selectedRadio);
    }
  }

  async clickVisitDateInput(): Promise<void> {
    await this.clickElement(this.visitDateInput);
  }

  async selectDateFromCalendar(dateNumber: string): Promise<void> {
    const dateCell = this.page.getByRole("cell", { name: dateNumber });
    await this.clickElement(dateCell);
  }

  async enterComments(comments: string): Promise<void> {
    await this.fillText(this.commentTextarea, comments);
  }

  async getComments(): Promise<string | null> {
    return await this.getInputValue(this.commentTextarea);
  }

  async clickBookAppointmentButton(): Promise<void> {
    await this.clickElement(this.bookAppointmentButton);
  }

  async getAppointmentHeadingText(): Promise<string | null> {
    return await this.getText(this.appointmentHeading);
  }

  async isBookAppointmentButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.bookAppointmentButton);
  }

  async isAppointmentPageLoaded(): Promise<boolean> {
    const heading = await this.getText(this.appointmentHeading);
    return heading === "Make Appointment";
  }

  async getAllFacilityOptions(): Promise<string[]> {
    const options = await this.facilityDropdown
      .locator("option")
      .allTextContents();
    return options.map((opt) => opt.trim());
  }

  async getFacilityOptionsCount(): Promise<number> {
    const optionCount = await this.facilityDropdown
      .locator("option")
      .count();
    return optionCount;
  }

  async clickGoToHomepageLink(): Promise<void> {
    await this.clickElement(this.homeLink);
  }

  async isConfirmationMessageVisible(): Promise<boolean> {
    const heading = await this.getText(this.appointmentHeading);
    return heading?.includes("Appointment Confirmation") || false;
  }

  async isGoToHomepageLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.homeLink);
  }
}
