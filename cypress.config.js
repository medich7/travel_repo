const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    logRequests: false,
  },
  e2e: {
    baseUrl:"https://www.booking.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
