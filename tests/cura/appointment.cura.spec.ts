import { test, expect } from "@playwright/test";
import { CuraTestHelper } from "../../helpers/cura.test-helper";
import { AppointmentPage } from "../../page-objects/cura-pages/appointment.page";
import { CURA_TEST_DATA } from "../../data/cura.test-data";

test.describe("CURA Appointment Booking Tests", () => {
  let helper: CuraTestHelper;

  test.beforeEach("Login and Navigate to Appointment Page", async ({ page }) => {
    helper = new CuraTestHelper(page);
  });

  test("TC008: Verify Default Facility Selection", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const selectedFacility = await appointmentPage.getSelectedFacility();
    expect(selectedFacility).toBe(
      CURA_TEST_DATA.facilities.tokyo,
    );
  });

  test("TC009: Verify Facility Dropdown Options Count", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const optionsCount = await appointmentPage.getFacilityOptionsCount();
    expect(optionsCount).toBe(3);
  });

  test("TC010: Verify All Facility Options", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const facilityOptions = await appointmentPage.getAllFacilityOptions();
    expect(facilityOptions).toContain(CURA_TEST_DATA.facilities.tokyo);
    expect(facilityOptions).toContain(CURA_TEST_DATA.facilities.hongkong);
    expect(facilityOptions).toContain(CURA_TEST_DATA.facilities.bangkok);
  });

  test("TC011: Select Non-Default Facility", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    await appointmentPage.selectFacility(CURA_TEST_DATA.facilities.hongkong);
    
    const selectedFacility = await appointmentPage.getSelectedFacility();
    expect(selectedFacility).toBe(CURA_TEST_DATA.facilities.hongkong);
  });

  test("TC012: Check Readmission Checkbox", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    await appointmentPage.checkReadmissionCheckbox();
    
    const isChecked = await appointmentPage.isReadmissionChecked();
    expect(isChecked).toBe(true);
  });

  test("TC013: Uncheck Readmission Checkbox", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    await appointmentPage.checkReadmissionCheckbox();
    let isChecked = await appointmentPage.isReadmissionChecked();
    expect(isChecked).toBe(true);
    
    await appointmentPage.uncheckReadmissionCheckbox();
    isChecked = await appointmentPage.isReadmissionChecked();
    expect(isChecked).toBe(false);
  });

  test("TC014: Select Insurance Type - Medicaid", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    await appointmentPage.selectInsuranceType("medicaid");
    const medicaidRadio = page.getByText("Medicaid");
    const isChecked = await medicaidRadio.locator("input").isChecked();
    expect(isChecked).toBe(true);
  });

  test("TC015: Select Insurance Type - Medicare", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    await appointmentPage.selectInsuranceType("medicare");
    const medicareRadio = page.getByText("Medicare");
    const isChecked = await medicareRadio.locator("input").isChecked();
    expect(isChecked).toBe(true);
  });

  test("TC016: Enter Comments", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const testComment = "This is a test comment for appointment";
    await appointmentPage.enterComments(testComment);
    
    const savedComment = await appointmentPage.getComments();
    expect(savedComment).toBe(testComment);
  });

  test("TC017: Verify Book Appointment Button is Visible", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const isVisible = await appointmentPage.isBookAppointmentButtonVisible();
    expect(isVisible).toBe(true);
  });

  test("TC018: Verify Appointment Page is Loaded", async ({ page }) => {
    const appointmentPage = await helper.loginWithValidCredentials();
    
    const isLoaded = await appointmentPage.isAppointmentPageLoaded();
    expect(isLoaded).toBe(true);
  });
});
