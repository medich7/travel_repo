// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import { searchPage } from "../e2e/page-objects/SearchPage";
// Suppress intercept commands from showing in the command log
const app = window.top;
if (app && app.document) {
  const style = app.document.createElement('style');
  style.innerHTML = `
    .command-name-intercept,
    .command-name-wait {
      display: none;
    }
  `;
  app.document.head.appendChild(style);
}
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


  /*Command to close the popup window before each test
  Since the popup window take time to appear, to avoid sychronous execution of cypress 
  we use .then() to implement the asynchronous behavior*/
    Cypress.Commands.add('closePopup', () => {
        cy.get('.dd5dccd82f', { timeout: 10000 })
        .should('be.visible')
        .then(() => {
            cy.get('.ffd93a9ecb > .abcc616ec7 > .a83ed08757').then((closebtn)=>{
                cy.wrap(closebtn).click();
            });
        });
    });

/* command for implementing the whole search flow in one call*/

    Cypress.Commands.add('setupSearch', (destination, checkInDate, checkOutDate, adults, children, rooms) => {
      
      searchPage.enterDestination(destination);
      searchPage.selectCheckInDate(checkInDate);
      searchPage.selectCheckOutDate(checkOutDate);
      searchPage.configureGuests(adults, children, rooms);
      searchPage.clickDoneButton();
      searchPage.clickSearchButton();

    });

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
