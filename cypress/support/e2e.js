// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore specific React errors
  if (err.message.includes('Minified React error')) {
    return false; // Prevent Cypress from failing the test
  }

  // Alternatively, ignore all uncaught exceptions (not recommended)
  // return false;

  // Allow other errors to fail the test
});
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
///<reference types = "cypress"/>
// Import commands.js using ES2015 syntax:
import './commands'