# CURA Playwright Framework Architecture

## 📊 Framework Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Test Specifications                          │
│  ┌──────────────────┬───────────────────┬──────────────────┐    │
│  │ login.cura       │ appointment.cura  │  e2e.cura        │    │
│  │ .spec.ts         │ .spec.ts          │  .spec.ts        │    │
│  │ (TC001-TC007)    │ (TC008-TC018)     │ (TC019-TC026)    │    │
│  └────────┬─────────┴────────┬──────────┴────────┬─────────┘    │
│           │                  │                   │               │
└───────────┼──────────────────┼───────────────────┼───────────────┘
            │                  │                   │
            ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Test Helper Layer                              │
│              ┌──────────────────────────────┐                   │
│              │  cura.test-helper.ts         │                   │
│              │  ├─ loginWithValidCreds()   │                   │
│              │  ├─ bookAppointmentXX()     │                   │
│              │  └─ verifyConfirmation()    │                   │
│              └───────────┬──────────────────┘                   │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
┌───────────────────────────────────────────────────────────────────┐
│              Page Object Models (Page-Objects)                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  cura.base.page.ts (Base Class)                         │     │
│  │  ├─ clickElement()    ├─ fillText()                     │     │
│  │  ├─ getText()         ├─ selectDropdown()              │     │
│  │  ├─ checkCheckbox()   ├─ waitForElement()              │     │
│  │  └─ Other common methods...                             │     │
│  └─────────┬─────────────────┬──────────────┬──────────────┘     │
│            │                 │              │                    │
│    ┌───────▼──────┐  ┌──────▼────────┐  ┌──▼──────────────┐    │
│    │ home.page.ts │  │login.page.ts  │  │appointment.page│    │
│    └──────────────┘  │               │  │     .ts        │    │
│                      └───────────────┘  └────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│              Test Data Layer                                    │
│         ┌──────────────────────────────┐                       │
│         │ cura.test-data.ts            │                       │
│         │ ├─ baseUrl                   │                       │
│         │ ├─ users (valid/invalid)     │                       │
│         │ ├─ facilities (list)         │                       │
│         │ ├─ appointmentData (samples) │                       │
│         │ └─ pageTexts (expected)      │                       │
│         └──────────────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│              Application Under Test (AUT)                       │
│         https://katalon-demo-cura.herokuapp.com/                │
│                                                                 │
│    ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│    │ Home Page   │  │ Login Page   │  │ Appointment Form │    │
│    └─────────────┘  └──────────────┘  └──────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Test Execution Flow

```
Start Test
    │
    ▼
┌─────────────────────────┐
│ Setup (beforeEach)      │
│ Initialize Helper/Page  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Test Action             │
│ (User interactions)     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Assertions              │
│ (Expect statements)     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Cleanup & Report        │
│ Screenshots, Logs       │
└────────────┬────────────┘
             │
             ▼
         End Test
```

## 📝 Class Hierarchy

```
CuraBasePage
    ├─ HomePage
    ├─ LoginPage
    └─ AppointmentPage

CuraTestHelper
    ├─ Composes: HomePage, LoginPage, AppointmentPage
    └─ Provides high-level test flows
```

## 🎯 Data Flow Example: Book Appointment

```
Test starts
    │
    ├─→ CuraTestHelper.loginWithValidCredentials()
    │   ├─→ HomePage.navigateToHome()
    │   ├─→ HomePage.clickMakeAppointmentLink()
    │   └─→ LoginPage.login(username, password)
    │
    ├─→ AppointmentPage.selectFacility(facility)
    ├─→ AppointmentPage.checkReadmissionCheckbox()
    ├─→ AppointmentPage.selectInsuranceType(type)
    ├─→ AppointmentPage.clickVisitDateInput()
    ├─→ AppointmentPage.selectDateFromCalendar(date)
    ├─→ AppointmentPage.enterComments(comments)
    ├─→ AppointmentPage.clickBookAppointmentButton()
    │
    └─→ Verify Confirmation & Report Results
```

## 🏗️ Reusability Pattern

```
Base Common Methods (CuraBasePage)
    │
    ├─→ Page-Specific Methods (HomePage, LoginPage, etc.)
    │
    └─→ Helper High-Level Flows (CuraTestHelper)
            │
            └─→ Test Cases (*.spec.ts)
```

## 📊 Test Pyramid

```
           /\
          /  \
         / E2E \          (8 tests)
        /--------\
       /          \
      /   Unit &   \     (18 tests)
     /  Functional  \
    /________________\
   /                  \
  /   Integration &    \ (26 tests total)
 /     Page Objects     \
/______________________\
```

## 💾 File Dependencies

```
login.cura.spec.ts
    ├── HomePage
    ├── LoginPage
    └── CURA_TEST_DATA

appointment.cura.spec.ts
    ├── AppointmentPage
    ├── CURA_TEST_DATA
    └── CuraTestHelper

e2e.cura.spec.ts
    ├── CuraTestHelper
    ├── AppointmentPage
    └── CURA_TEST_DATA

CuraTestHelper
    ├── HomePage
    ├── LoginPage
    ├── AppointmentPage
    └── CURA_TEST_DATA

HomePage, LoginPage, AppointmentPage
    └── CuraBasePage

CURA_TEST_DATA
    └── (No dependencies)
```

## ✅ Testing Coverage Map

```
Page Objects    → Tests
─────────────────────────
Home Page       → TC001, TC002, TC003
Login Page      → TC004, TC005, TC006, TC007
Appointment     → TC008-TC018, TC019-TC026
Confirmation    → TC022, TC023, TC024, TC026
```

## 🔗 Test Composition Pattern

```
Simple Tests          Complex Tests
(Single Page)         (Multiple Pages)
    │                      │
    ├─ Direct POM     ├─ Use Helper
    ├─ Single Page    ├─ Multiple Pages
    └─ Single Action  └─ Multiple Actions
```
