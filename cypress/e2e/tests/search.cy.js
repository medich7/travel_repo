// cypress/e2e/search.cy.js

import { searchPage } from "../page-objects/SearchPage";

/*
 * Test suite for search functionality on Booking.com
 */
describe("Search Functionality Tests for Booking.com", () => {
 
    beforeEach(() => {
        // Pre-test setup: Visit the base URL and handle popups
        cy.visit('/');
        cy.intercept({resourceType: /xhr|fetch/}, {log: false}); // Suppress unnecessary logs
        cy.closePopup(); // Custom command to close the popup if it appears
        
    });

  /**
   * Validate that searching with a valid destination yields appropriate results.
   * Outcome: The search results page includes the specified destination and properties.
   */
  it('Should search with a valid destination', () => {


    cy.fixture('searchData').then((data) =>{
      const checkInDate = searchPage.generateCheckInDate(); // Initial check-in date
      const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Check-out date to be selected
      
      // Perform the search using valid data from the fixture
      cy.setupSearch(data.validSearch.destination,checkInDate,checkOutDate,data.validSearch.adults,data.validSearch.children,data.validSearch.rooms);
      
      // Assertions to validate the outcome
      cy.url().should('include', data.validSearch.destination); // Verify the destination in the URL
      cy.contains('properties found').should('be.visible'); // Confirm that properties are displayed

    });
    
  });

  /**
   * Validate that attempting a search without entering a destination results in an error message.
   * Outcome: An error message prompts the user to enter a destination.
   */
  it('Should display an error when searching without a destination', () => {

    cy.fixture('searchData').then((data) => {

      const checkInDate = searchPage.generateCheckInDate(); // Generate dynamic check-in date
      const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Generate dynamic check-out date
      
      // Perform the search without specifying a destination
      cy.setupSearch(data.emptyDestinationSearch.destination,checkInDate,checkOutDate,data.emptyDestinationSearch.adults,data.emptyDestinationSearch.children,data.emptyDestinationSearch.rooms); // Verify the destination in the URL
      
      // Assertion to verify the error message
      cy.contains(data.emptyDestinationSearch.error).should('be.visible'); // Confirm that properties are displayed
    });
  });

  /**
   * Validate that past dates cannot be selected for check-in or check-out.
   * Outcome: Past dates are disabled and cannot be clicked.
   */
  it('should not be able to select a date from the past',() =>{

    let pastDate = searchPage.generatePastDate();
    searchPage.datePicker().click();
    searchPage.checkDate(pastDate).as('disabledDate');

    searchPage.checkDisabledDate('disabledDate');
  });

  /**
   * Validate that selecting an earlier date replaces the initial check-in date.
   * Outcome: The earlier date becomes the new check-in date, and the previous date is deselected.
   */
  it('Should update the check-in date when an earlier date is clicked', () => {

    
    const firstDate = searchPage.generateCheckInDate(); // Initial check-in date
    const earlierDate = searchPage.generateEarlierDate(firstDate); // Generate an earlier date

    searchPage.selectCheckInDate(firstDate); // Select the first date
    searchPage.selectCheckOutDate(earlierDate); // Click an earlier date

    // Assertions to validate the updated date selection
    searchPage.checkDate(earlierDate).should('have.attr', 'aria-checked', 'true'); // Earlier date is now selected
    searchPage.checkDate(firstDate).should('not.have.attr', 'aria-checked', 'true'); // Initial date is deselected

  });

  /**
   * Validate that a search with maximum guests and rooms returns results.
   * Outcome: The search results page includes properties accommodating the maximum selection.
   */
  it('Should search with maximum guests and rooms', () => {

    cy.fixture('searchData').then((data) =>{
      const checkInDate = searchPage.generateCheckInDate(); // Initial check-in date
      const checkOutDate = searchPage.generateCheckOutDate(checkInDate); // Check-out date to be selected
      
      // Perform the search with maximum guests and rooms
      cy.setupSearch(data.maxGuestsSearch.destination,checkInDate,checkOutDate,data.maxGuestsSearch.adults,data.maxGuestsSearch.children,data.maxGuestsSearch.rooms);
      
      // Assertions to validate the outcome
      cy.contains('properties found').should('be.visible');
    });
    
  });
});
