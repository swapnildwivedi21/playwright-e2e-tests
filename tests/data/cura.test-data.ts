export const CURA_TEST_DATA = {
  baseUrl: "https://katalon-demo-cura.herokuapp.com/",
  
  users: {
    validUser: {
      username: "John Doe",
      password: "ThisIsNotAPassword",
    },
    invalidUser: {
      username: "invalid",
      password: "invalid",
    },
  },

  facilities: {
    tokyo: "Tokyo CURA Healthcare Center",
    hongkong: "Hongkong CURA Healthcare Center",
    bangkok: "Bangkok CURA Healthcare Center",
  },

  insuranceTypes: {
    medicaid: "Medicaid",
    medicare: "Medicare",
    none: "None",
  },

  appointmentData: {
    defaultAppointment: {
      facility: "Tokyo CURA Healthcare Center",
      readmission: false,
      insuranceType: "Medicare",
      visitDate: "10/10/2024",
      comments: "Regular checkup",
    },
    nonDefaultAppointment: {
      facility: "Hongkong CURA Healthcare Center",
      readmission: true,
      insuranceType: "Medicaid",
      visitDate: "21/10/2024",
      comments: "This is a multi line comment being captured",
    },
    bangkokAppointment: {
      facility: "Bangkok CURA Healthcare Center",
      readmission: false,
      insuranceType: "Medicare",
      visitDate: "15/10/2024",
      comments: "Follow-up consultation",
    },
  },

  pageTexts: {
    homePageTitle: "CURA Healthcare Service",
    loginMessage: "Please login to make appointment.",
    makeAppointmentHeading: "Make Appointment",
    appointmentConfirmation: "Appointment Confirmation",
  },
};
