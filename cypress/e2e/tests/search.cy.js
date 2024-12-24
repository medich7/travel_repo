// cypress/e2e/search.cy.js

import { searchPage } from "../page-objects/SearchPage";

describe("Search Functionality Tests for Booking.com", () => {
 
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
        cy.intercept({resourceType: /xhr|fetch/}, {log: false});
        cy.closePopup();
        
    });
  

  it('Should search with a valid destination', () => {

    const checkInDate = searchPage.generateCheckInDate(); // Initial check-in date
    const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Check-out date to be selected
     
    
    searchPage.enterDestination('Paris');
    searchPage.selectCheckInDate(checkInDate);
    searchPage.selectCheckOutDate(checkOutDate);
    searchPage.configureGuests(2, 1, 1);
    searchPage.clickDoneButton();
    searchPage.clickSearchButton();

    cy.url().should('include', 'Paris');
    cy.contains('properties found').should('be.visible');
  });

  it('Should display an error when searching without a destination', () => {

    const checkInDate = searchPage.generateCheckInDate(); // Initial check-in date
    const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Check-out date to be selected
     
    searchPage.selectCheckInDate(checkInDate);
    searchPage.selectCheckOutDate(checkOutDate);
    searchPage.configureGuests(2, 0, 1);
    searchPage.clickDoneButton();
    searchPage.clickSearchButton();

    cy.contains('Enter a destination').should('be.visible');
  });

  it('should not be able to select a date from the past',() =>{

    let pastDate = searchPage.generatePastDate();
    searchPage.datePicker().click();
    searchPage.checkDate(pastDate).as('disabledDate');

    searchPage.checkDisabledDate('disabledDate');

  })

  it('Should update the check-in date when an earlier date is clicked', () => {

    const firstDate = searchPage.generateCheckInDate(); // Initial check-in date
    const earlierDate = searchPage.generateEarlierDate(firstDate); // Earlier date to be selected

    searchPage.selectCheckInDate(firstDate);
    searchPage.selectCheckOutDate(earlierDate);

    searchPage.checkDate(earlierDate).should('have.attr', 'aria-checked', 'true');
    searchPage.checkDate(firstDate).should('not.have.attr', 'aria-checked', 'true');

  });

  it('Should search with maximum guests and rooms', () => {
    const checkInDate = searchPage.generateCheckInDate(); // Initial check-in date
    const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Check-out date to be selected
     
    searchPage.enterDestination('Paris');
    searchPage.selectCheckInDate(checkInDate);
    searchPage.selectCheckOutDate(checkOutDate);
    searchPage.configureGuests(5, 3, 3); // Example maximum
    searchPage.clickSearchButton();

    cy.contains('properties found').should('be.visible');
  });
});
