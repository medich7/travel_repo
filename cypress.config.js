const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3iq6zk",
  e2e: {
    baseUrl:"https://www.booking.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
