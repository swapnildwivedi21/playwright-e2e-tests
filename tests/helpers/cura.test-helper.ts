import { Page, expect } from "@playwright/test";
import { HomePage } from "../page-objects/cura-pages/home.page";
import { LoginPage } from "../page-objects/cura-pages/login.page";
import { AppointmentPage } from "../page-objects/cura-pages/appointment.page";
import { CURA_TEST_DATA } from "../data/cura.test-data";

export class CuraTestHelper {
  constructor(private page: Page) {}

  /**
   * Navigate to CURA home page
   */
  async navigateToHome(): Promise<HomePage> {
    const homePage = new HomePage(this.page);
    await homePage.navigateToHome(CURA_TEST_DATA.baseUrl);
    return homePage;
  }

  /**
   * Login with valid credentials
   */
  async loginWithValidCredentials(): Promise<AppointmentPage> {
    const loginPage = new LoginPage(this.page);
    
    // Navigate to home and click Make Appointment
    const homePage = await this.navigateToHome();
    await homePage.clickMakeAppointmentLink();
    
    // Verify login page is visible
    const isLoginPageLoaded = await loginPage.verifyLoginPageLoaded();
    expect(isLoginPageLoaded).toBe(true);
    
    // Perform login
    await loginPage.login(
      CURA_TEST_DATA.users.validUser.username,
      CURA_TEST_DATA.users.validUser.password,
    );
    
    // Wait for appointment page
    await this.page.waitForLoadState("networkidle");
    
    const appointmentPage = new AppointmentPage(this.page);
    return appointmentPage;
  }

  /**
   * Complete appointment booking with custom data
   */
  async completeAppointmentBooking(
    facility: string,
    insuranceType: string,
    readmission: boolean = false,
    visitDate: string = "10/10/2024",
    comments: string = "Test appointment",
  ): Promise<void> {
    const appointmentPage = await this.loginWithValidCredentials();
    
    // Select facility
    await appointmentPage.selectFacility(facility);
    
    // Check readmission if needed
    if (readmission) {
      await appointmentPage.checkReadmissionCheckbox();
    }
    
    // Select insurance type
    await appointmentPage.selectInsuranceType(insuranceType);
    
    // Select visit date
    await appointmentPage.clickVisitDateInput();
    const dateNumber = visitDate.split("/")[0]; // Extract day from date
    await appointmentPage.selectDateFromCalendar(dateNumber);
    
    // Enter comments
    await appointmentPage.enterComments(comments);
    
    // Book appointment
    await appointmentPage.clickBookAppointmentButton();
  }

  /**
   * Book appointment with default data
   */
  async bookAppointmentWithDefaultData(): Promise<void> {
    const data = CURA_TEST_DATA.appointmentData.defaultAppointment;
    await this.completeAppointmentBooking(
      data.facility,
      data.insuranceType,
      data.readmission,
      data.visitDate,
      data.comments,
    );
  }

  /**
   * Book appointment with non-default data
   */
  async bookAppointmentWithNonDefaultData(): Promise<void> {
    const data = CURA_TEST_DATA.appointmentData.nonDefaultAppointment;
    await this.completeAppointmentBooking(
      data.facility,
      data.insuranceType,
      data.readmission,
      data.visitDate,
      data.comments,
    );
  }

  /**
   * Verify appointment confirmation
   */
  async verifyAppointmentConfirmation(): Promise<boolean> {
    const appointmentPage = new AppointmentPage(this.page);
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    const isHomeLink = await appointmentPage.isGoToHomepageLinkVisible();
    return isConfirmed && isHomeLink;
  }

  /**
   * Get page for assertions
   */
  getPage(): Page {
    return this.page;
  }
}
