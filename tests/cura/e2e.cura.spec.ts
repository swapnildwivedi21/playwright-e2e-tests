import { test, expect } from "@playwright/test";
import { CuraTestHelper } from "../../helpers/cura.test-helper";
import { AppointmentPage } from "../../page-objects/cura-pages/appointment.page";
import { CURA_TEST_DATA } from "../../data/cura.test-data";

test.describe("CURA End-to-End Appointment Booking Tests", () => {
  let helper: CuraTestHelper;

  test.beforeEach("Setup", async ({ page }) => {
    helper = new CuraTestHelper(page);
  });

  test("TC019: Complete Appointment Booking with Default Data", async ({
    page,
  }) => {
    await helper.bookAppointmentWithDefaultData();
    
    const appointmentPage = new AppointmentPage(page);
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
    
    const isHomeLink = await appointmentPage.isGoToHomepageLinkVisible();
    expect(isHomeLink).toBe(true);
  });

  test("TC020: Complete Appointment Booking with Non-Default Data", async ({
    page,
  }) => {
    await helper.bookAppointmentWithNonDefaultData();
    
    const appointmentPage = new AppointmentPage(page);
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
    
    const headingText = await appointmentPage.getAppointmentHeadingText();
    expect(headingText).toContain("Appointment Confirmation");
  });

  test("TC021: Book Appointment with Bangkok Facility", async ({ page }) => {
    const data = CURA_TEST_DATA.appointmentData.bangkokAppointment;
    await helper.completeAppointmentBooking(
      data.facility,
      data.insuranceType,
      data.readmission,
      data.visitDate,
      data.comments,
    );
    
    const appointmentPage = new AppointmentPage(page);
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
  });

  test("TC022: Verify Confirmation Page Elements", async ({ page }) => {
    await helper.bookAppointmentWithDefaultData();
    
    const appointmentPage = new AppointmentPage(page);
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    const isHomeLink = await appointmentPage.isGoToHomepageLinkVisible();
    
    expect(isConfirmed).toBe(true);
    expect(isHomeLink).toBe(true);
  });

  test("TC023: Navigate Back to Homepage from Confirmation", async ({ page }) => {
    await helper.bookAppointmentWithDefaultData();
    
    const appointmentPage = new AppointmentPage(page);
    await appointmentPage.clickGoToHomepageLink();
    
    // Verify we're back on home page
    await page.waitForLoadState("networkidle");
    const pageUrl = page.url();
    expect(pageUrl).toContain(CURA_TEST_DATA.baseUrl);
  });

  test("TC024: Complete Multiple Appointments in Sequence", async ({ page }) => {
    // First appointment
    await helper.bookAppointmentWithDefaultData();
    
    let appointmentPage = new AppointmentPage(page);
    let isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
    
    // Go back to home
    await appointmentPage.clickGoToHomepageLink();
    await page.waitForLoadState("networkidle");
    
    // Book another appointment
    await helper.bookAppointmentWithNonDefaultData();
    
    appointmentPage = new AppointmentPage(page);
    isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
  });

  test("TC025: Book Appointment with Readmission and Medicaid", async ({
    page,
  }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    // Select facility
    await appointmentPage.selectFacility(CURA_TEST_DATA.facilities.hongkong);
    
    // Check readmission
    await appointmentPage.checkReadmissionCheckbox();
    
    // Select insurance
    await appointmentPage.selectInsuranceType("medicaid");
    
    // Select date
    await appointmentPage.clickVisitDateInput();
    await appointmentPage.selectDateFromCalendar("21");
    
    // Add comments
    await appointmentPage.enterComments("Readmission with Medicaid");
    
    // Book appointment
    await appointmentPage.clickBookAppointmentButton();
    
    // Verify confirmation
    const isConfirmed = await appointmentPage.isConfirmationMessageVisible();
    expect(isConfirmed).toBe(true);
  });

  test("TC026: Verify All Appointment Details Before Booking", async ({
    page,
  }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    // Set all values
    await appointmentPage.selectFacility(CURA_TEST_DATA.facilities.bangkok);
    await appointmentPage.checkReadmissionCheckbox();
    await appointmentPage.selectInsuranceType("none");
    await appointmentPage.enterComments("Test verification");
    
    // Verify values
    const facility = await appointmentPage.getSelectedFacility();
    expect(facility).toBe(CURA_TEST_DATA.facilities.bangkok);
    
    const readmission = await appointmentPage.isReadmissionChecked();
    expect(readmission).toBe(true);
    
    const comments = await appointmentPage.getComments();
    expect(comments).toBe("Test verification");
  });
});
