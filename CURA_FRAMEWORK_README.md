# CURA Healthcare Service - Playwright Test Framework

A well-organized Playwright test automation framework for the CURA Healthcare Service application.

## 📁 Framework Structure

```
tests/
├── page-objects/
│   └── cura-pages/                  # Page Object Models
│       ├── cura.base.page.ts        # Base class with common methods
│       ├── home.page.ts             # Home page object
│       ├── login.page.ts            # Login page object
│       └── appointment.page.ts      # Appointment page object
├── cura/                            # CURA specific test files
│   ├── login.cura.spec.ts           # Login and navigation tests
│   ├── appointment.cura.spec.ts     # Appointment functionality tests
│   └── e2e.cura.spec.ts             # End-to-end booking tests
├── helpers/
│   └── cura.test-helper.ts          # Test utilities and common flows
└── data/
    └── cura.test-data.ts            # Test data and constants
```

## 🎯 Test Coverage

### Login Tests (login.cura.spec.ts)
- TC001: Verify Home Page Load
- TC002: Verify Make Appointment Link is Visible
- TC003: Navigate to Login Page
- TC004: Login with Valid Credentials
- TC005: Verify Username Field Can Be Cleared
- TC006: Verify Password Field Can Be Cleared
- TC007: Verify Login Button is Enabled

### Appointment Tests (appointment.cura.spec.ts)
- TC008: Verify Default Facility Selection
- TC009: Verify Facility Dropdown Options Count
- TC010: Verify All Facility Options
- TC011: Select Non-Default Facility
- TC012: Check Readmission Checkbox
- TC013: Uncheck Readmission Checkbox
- TC014: Select Insurance Type - Medicaid
- TC015: Select Insurance Type - Medicare
- TC016: Enter Comments
- TC017: Verify Book Appointment Button is Visible
- TC018: Verify Appointment Page is Loaded

### End-to-End Tests (e2e.cura.spec.ts)
- TC019: Complete Appointment Booking with Default Data
- TC020: Complete Appointment Booking with Non-Default Data
- TC021: Book Appointment with Bangkok Facility
- TC022: Verify Confirmation Page Elements
- TC023: Navigate Back to Homepage from Confirmation
- TC024: Complete Multiple Appointments in Sequence
- TC025: Book Appointment with Readmission and Medicaid
- TC026: Verify All Appointment Details Before Booking

## 🏗️ Key Components

### Page Object Models

#### CuraBasePage (cura.base.page.ts)
Base class containing common element interactions:
- Navigation methods
- Click and fill operations
- Visibility and enabled checks
- Dropdown selections
- Checkbox operations
- Screenshot capture

#### HomePage (home.page.ts)
Handles home page interactions:
- Page title verification
- Navigation links
- Login/Logout buttons

#### LoginPage (login.page.ts)
Handles login form interactions:
- Username and password input
- Login button click
- Credential entry and verification
- Field clearing

#### AppointmentPage (appointment.page.ts)
Handles appointment booking form:
- Facility selection
- Readmission checkbox
- Insurance type selection
- Date picker
- Comments input
- Appointment confirmation

### Test Helper (cura.test-helper.ts)

Utility class providing high-level test flows:
- `navigateToHome()` - Navigate to CURA home page
- `loginWithValidCredentials()` - Complete login flow
- `completeAppointmentBooking()` - Book appointment with custom data
- `bookAppointmentWithDefaultData()` - Quick default booking
- `bookAppointmentWithNonDefaultData()` - Quick non-default booking
- `verifyAppointmentConfirmation()` - Verify booking confirmation

### Test Data (cura.test-data.ts)

Centralized test data:
- Base URL
- Valid and invalid user credentials
- Facility names
- Insurance types
- Appointment scenarios
- Expected page texts

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/cura/login.cura.spec.ts
```

### Run specific test
```bash
npx playwright test -g "TC004: Login with Valid Credentials"
```

### Run in headed mode
```bash
npx playwright test --headed
```

### Run in debug mode
```bash
npx playwright test --debug
```

### Generate HTML report
```bash
npx playwright test
npx playwright show-report
```

## 🎨 Test Organization

### By Functionality
- **Login Tests**: Authentication and navigation
- **Appointment Tests**: Form functionality and validations
- **E2E Tests**: Complete user workflows

### Test Naming Convention
- Test cases prefixed with TC + number (e.g., TC001)
- Descriptive test names following the pattern: "Action + Expected Result"

## 📊 Best Practices Implemented

1. **Page Object Model Pattern**: All UI interactions encapsulated in page classes
2. **Base Page Class**: Common methods in parent class to avoid duplication
3. **Centralized Test Data**: Single source of truth for test data
4. **Helper Functions**: Reusable test workflows
5. **Clear Assertions**: Explicit expectations with meaningful failure messages
6. **Organized Structure**: Tests grouped by functionality
7. **Type Safety**: Full TypeScript support

## 🔧 Configuration

Tests use the default Playwright configuration from `playwright.config.ts`. Key settings:
- Chrome, Firefox, WebKit browsers
- Parallel execution
- Screenshot on failure
- HTML reporter

## 📝 Writing New Tests

### Basic Test Template
```typescript
test("TC0XX: Test Description", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome(CURA_TEST_DATA.baseUrl);
  
  // Test logic here
  expect(/* assertion */);
});
```

### Using Helper
```typescript
test("TC0XX: Test Description", async ({ page }) => {
  const helper = new CuraTestHelper(page);
  const appointmentPage = await helper.loginWithValidCredentials();
  
  // Test logic here
  expect(/* assertion */);
});
```

## 🐛 Debugging Tips

1. Use `--debug` flag to step through tests
2. Use `--headed` to see browser interactions
3. Add `page.pause()` to pause test execution
4. Check Allure reports for detailed logs
5. Use `--verbose` for detailed output

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🔗 Application URLs

- Base URL: https://katalon-demo-cura.herokuapp.com/
- Make Appointment: https://katalon-demo-cura.herokuapp.com/profile.php?username=

## ✅ Test Credentials

- Username: John Doe
- Password: ThisIsNotAPassword

## 📌 Notes

- Tests use centralized base URL and credentials from `cura.test-data.ts`
- All page objects inherit from `CuraBasePage` for consistency
- Helper methods provide quick access to common test flows
- Tests are independent and can run in any order
