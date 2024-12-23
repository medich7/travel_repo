// cypress/e2e/search.cy.js

import { searchPage } from "../page-objects/SearchPage";

describe("Search Functionality Tests for Booking.com", () => {
 
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
        cy.intercept({resourceType: /xhr|fetch/}, {log: false});
        cy.closePopup();
        
    });
  

  it.only('Should search with a valid destination', () => {
    searchPage.enterDestination('Paris');
    searchPage.selectCheckInDate('2024-12-15');
    searchPage.selectCheckOutDate('2024-12-30');
    searchPage.configureGuests(2, 1, 1);
    searchPage.clickDoneButton();
    searchPage.clickSearchButton();

    cy.url().should('include', 'Paris');
    cy.contains('properties found').should('be.visible');
  });

  it('Should display an error when searching without a destination', () => {
    searchPage.selectCheckInDate('15');
    searchPage.selectCheckOutDate('20');
    searchPage.clickSearchButton();

    cy.contains('Please specify your destination').should('be.visible');
  });

  it('Should validate invalid date ranges', () => {
    searchPage.enterDestination('Rome');
    searchPage.selectCheckInDate('20');
    searchPage.selectCheckOutDate('15'); // Invalid range
    searchPage.clickSearchButton();

    cy.contains('Please check the dates you have entered').should('be.visible');
  });

  it('Should search with maximum guests and rooms', () => {
    searchPage.enterDestination('New York');
    searchPage.selectCheckInDate('10');
    searchPage.selectCheckOutDate('15');
    searchPage.configureGuests(5, 3, 3); // Example maximum
    searchPage.clickSearchButton();

    cy.contains('properties found').should('be.visible');
  });
});
