# CURA Playwright Framework - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- VS Code (optional but recommended)

### Installation

1. **Navigate to project directory**
   ```bash
   cd playwright-e2e-tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 📋 Project Structure Quick Reference

```
tests/
├── page-objects/cura-pages/     ← Page Object Models
│   ├── cura.base.page.ts        ← Base class
│   ├── home.page.ts
│   ├── login.page.ts
│   └── appointment.page.ts
├── cura/                         ← Test Files
│   ├── login.cura.spec.ts
│   ├── appointment.cura.spec.ts
│   └── e2e.cura.spec.ts
├── helpers/
│   └── cura.test-helper.ts      ← Reusable test flows
└── data/
    └── cura.test-data.ts        ← Test data & constants
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/cura/login.cura.spec.ts
```

### Run with specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run in debug mode (step through)
```bash
npx playwright test --debug
```

### Run specific test by name
```bash
npx playwright test -g "TC004"
```

### Run tests in parallel
```bash
npx playwright test --workers=4
```

### Generate and view HTML report
```bash
npx playwright test
npx playwright show-report
```

## 🎯 Common Test Scenarios

### Scenario 1: Run All Login Tests
```bash
npx playwright test login.cura.spec.ts
```

### Scenario 2: Run All Appointment Tests
```bash
npx playwright test appointment.cura.spec.ts
```

### Scenario 3: Run All E2E Tests
```bash
npx playwright test e2e.cura.spec.ts
```

### Scenario 4: Debug a Specific Test
```bash
npx playwright test tests/cura/e2e.cura.spec.ts -g "TC019" --debug
```

### Scenario 5: Run Tests with Trace
```bash
npx playwright test --trace=on
npx playwright show-trace trace.zip
```

## 📝 Writing Your First Test

### Step 1: Import Required Modules
```typescript
import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/cura-pages/home.page";
import { CURA_TEST_DATA } from "../../data/cura.test-data";
```

### Step 2: Create Test
```typescript
test("My First Test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome(CURA_TEST_DATA.baseUrl);
  
  const titleText = await homePage.getPageTitleText();
  expect(titleText).toBe("CURA Healthcare Service");
});
```

### Step 3: Run Test
```bash
npx playwright test --headed
```

## 🛠️ Using Page Objects

### Access Page Methods
```typescript
// Using HomePage
const homePage = new HomePage(page);
await homePage.navigateToHome(url);
const title = await homePage.getPageTitleText();
await homePage.clickMakeAppointmentLink();

// Using LoginPage
const loginPage = new LoginPage(page);
await loginPage.login(username, password);
const isVisible = await loginPage.isLoginMessageVisible();

// Using AppointmentPage
const appointmentPage = new AppointmentPage(page);
await appointmentPage.selectFacility(facilityName);
await appointmentPage.checkReadmissionCheckbox();
await appointmentPage.clickBookAppointmentButton();
```

## 🎁 Using Helper for Quick Flows

### Login Flow
```typescript
const helper = new CuraTestHelper(page);
const appointmentPage = await helper.loginWithValidCredentials();
```

### Book with Default Data
```typescript
await helper.bookAppointmentWithDefaultData();
const confirmed = await helper.verifyAppointmentConfirmation();
```

### Book with Custom Data
```typescript
await helper.completeAppointmentBooking(
  "Hongkong CURA Healthcare Center",
  "Medicaid",
  true,  // readmission
  "21/10/2024",
  "Test comment"
);
```

## 📊 Test Data Reference

### Credentials
```typescript
CURA_TEST_DATA.users.validUser
// { username: "John Doe", password: "ThisIsNotAPassword" }

CURA_TEST_DATA.users.invalidUser
// { username: "invalid", password: "invalid" }
```

### Facilities
```typescript
CURA_TEST_DATA.facilities.tokyo
CURA_TEST_DATA.facilities.hongkong
CURA_TEST_DATA.facilities.bangkok
```

### Insurance Types
```typescript
CURA_TEST_DATA.insuranceTypes.medicaid
CURA_TEST_DATA.insuranceTypes.medicare
CURA_TEST_DATA.insuranceTypes.none
```

### Pre-defined Appointments
```typescript
CURA_TEST_DATA.appointmentData.defaultAppointment
CURA_TEST_DATA.appointmentData.nonDefaultAppointment
CURA_TEST_DATA.appointmentData.bangkokAppointment
```

## 🔍 Debugging Tips

### Add Pause in Test
```typescript
test("My Test", async ({ page }) => {
  // ...
  await page.pause();  // Test will pause here
  // ...
});
```

### Use Debug Mode
```bash
npx playwright test --debug
```
Then use the debug menu to:
- Step over/into code
- Resume execution
- View element locators

### Check Traces
```bash
npx playwright test --trace=on
npx playwright show-trace trace.zip
```

### View Logs
Tests generate logs in the test results. Check:
- `test-results/` folder
- Screenshots on failure
- Traces and videos

## 📚 Test File Templates

### New Login Test
```typescript
test("TCXXX: Test Description", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  
  await homePage.navigateToHome(CURA_TEST_DATA.baseUrl);
  // Add test logic
  expect(/* assertion */);
});
```

### New Appointment Test
```typescript
test("TCXXX: Test Description", async ({ page }) => {
  const helper = new CuraTestHelper(page);
  const appointmentPage = await helper.loginWithValidCredentials();
  
  // Add test logic
  expect(/* assertion */);
});
```

### New E2E Test
```typescript
test("TCXXX: Test Description", async ({ page }) => {
  const helper = new CuraTestHelper(page);
  
  // Complete user journey
  await helper.completeAppointmentBooking(...);
  
  // Verify results
  expect(/* assertion */);
});
```

## ✅ Before You Commit

1. Run all tests locally
   ```bash
   npx playwright test
   ```

2. Check report
   ```bash
   npx playwright show-report
   ```

3. Verify no errors
   ```bash
   npm run lint  # If configured
   ```

4. Format code
   ```bash
   npm run format  # If configured
   ```

## 🐛 Common Issues & Solutions

### Issue: Tests timeout
**Solution**: Increase timeout in playwright.config.ts or use `test.setTimeout(timeout)`

### Issue: Element not found
**Solution**: Use debug mode to inspect, check selectors, verify page is loaded

### Issue: Tests pass locally but fail in CI
**Solution**: Check browser versions, add waitForLoadState, use timeouts

### Issue: Flaky tests
**Solution**: Add proper waits, avoid hardcoded waits, use waitForElement

## 📖 Documentation

- **CURA_FRAMEWORK_README.md** - Complete framework documentation
- **CURA_FRAMEWORK_ARCHITECTURE.md** - Architecture diagrams and patterns

## 🔗 Useful Commands

```bash
# List all tests
npx playwright test --list

# Count tests
npx playwright test --list | grep -c "✓"

# Show test info
npx playwright test --list -v

# Run with specific viewport
npx playwright test --viewport=1280,720

# Run with configuration
npx playwright test --config=playwright.config.ts
```

## 💡 Best Practices

1. ✅ Always use Page Objects for UI interactions
2. ✅ Use CURA_TEST_DATA for constants
3. ✅ Use Helper for common flows
4. ✅ Add meaningful assertions
5. ✅ Keep tests independent
6. ✅ Use descriptive test names
7. ✅ Group related tests with describe blocks
8. ✅ Use beforeEach for setup
9. ✅ Add comments for complex logic
10. ✅ Review reports after running tests

## 📞 Need Help?

- Check test output for error messages
- Use `--debug` flag to step through
- Review CURA_FRAMEWORK_ARCHITECTURE.md for patterns
- Check page object methods for available operations

---

**Happy Testing! 🎉**
