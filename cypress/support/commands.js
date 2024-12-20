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
Cypress.Commands.overwrite('intercept', (originalFn, ...args) => {
    // Call the original intercept function
    const result = originalFn(...args);
  
    // Suppress logs for certain intercepts
    if (args[1]?.includes('/api')) {
      result.log = false; // Prevent showing this intercept in logs
    }
    return result;
  });