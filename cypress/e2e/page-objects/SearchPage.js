class SearchPage {
    // Locators for search elements
    destinationInput() {
      return cy.get('[name="ss"]'); // Selector for destination input field
    }
  
    datePicker() {
      return cy.get('[data-testid="searchbox-dates-container"]') // Date picker container
    }
  
    checkDate(date) {
      return cy.get(`[data-date="${date}"]`); // Selector for specific dates in YYYY-MM-DD format
    }
  
    guestsButton() {
      return cy.get('[data-testid="searchbox-form-button-icon"]'); // Button to open guests/rooms selector
    }
  
    addAdultGuest() {
      return cy.get(':nth-child(1) > .bfb38641b0 > .f4d78af12a'); // Add adult guest button
    }
  
    addChildGuest() {
      return cy.get(':nth-child(2) > .bfb38641b0 > .f4d78af12a'); // Add child guest button
    }

    addChildAge(age,childIndex){
        // Select child age dynamically based on child index
        return cy.get('[name="age"]').eq(childIndex).should('be.visible').select(age);
    }
  
    addRoom() {
      return cy.get(':nth-child(5) > .bfb38641b0 > .f4d78af12a'); // Add room button
    }
  
    searchButton() {
        return cy.get('.d12ff5f5bf > .a83ed08757'); // Button to submit the search form
      
    }

    doneButton(){
        return cy.get('.bf0537ecb5');  // Button to finalize guest/room configuration
    }

    /*
    * Generate a random date in the past.
    * @returns {string} A formatted date string (YYYY-MM-DD)
    */
    generatePastDate(){
      const today = new Date(); // Get the current date
      
      // Calculate a date earlier than today
      const earlierDate = new Date(today);
      earlierDate.setDate(today.getDate() - Math.floor(Math.random() * 10)); // Subtract one day
      const earlierDateString = earlierDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      return earlierDateString
    }

    /*
    * Generate a random check-out date earlier than the check-in date.
    * @param {string} checkInDate - The check-in date in YYYY-MM-DD format
    * @returns {string} A formatted date string (YYYY-MM-DD)
    */
    generateEarlierDate(checkInDate){
      const check_In_Date = new Date(checkInDate)
      // Ensure the random number of days to substruct is at least 1
      const randomDays = Math.floor(Math.random() * 10) + 1;

      // Set the check-out date based on check-in date and random number of days
      const checkOutDate = new Date(check_In_Date); 
      checkOutDate.setDate(check_In_Date.getDate() - randomDays); // Add random days to check-in date
      const checkOutDateString = checkOutDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      return checkOutDateString
    }
    /*
     * Generate a random check-in date later than the current date.
     * @returns {string} A formatted date string (YYYY-MM-DD)
     */
    generateCheckInDate(){
      const today = new Date(); // Get the current date
      
      // Calculate a date later than today
      const checkInDate = new Date(today);
      checkInDate.setDate(today.getDate() + Math.floor(Math.random() * 10) +1 ); // Adding a random number of days to the current day
      const checkInDateString = checkInDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      return checkInDateString
    }

    /*
    * Generate a random check-out date based on the check-in date.
    * @param {string} checkInDate - The check-in date in YYYY-MM-DD format
    * @returns {string} A formatted date string (YYYY-MM-DD)
    */
    generateCheckOutDate(checkInDate){
      const today = new Date(); // Get the current date
      const check_In_Date = new Date(checkInDate)
      // Ensure the random number of days to add is at least 1
      const randomDays = Math.floor(Math.random() * 10) + 1;

      // Set the check-out date based on check-in date and random number of days
      const checkOutDate = new Date(check_In_Date); 
      checkOutDate.setDate(check_In_Date.getDate() + randomDays); // Add random days to check-in date
      const checkOutDateString = checkOutDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
      return checkOutDateString
    }

    /*
    * Validate that a date is disabled for selection.
    * @param {string} date - The date to validate in YYYY-MM-DD format
    */
    checkDisabledDate(disabledDate){
      // Spy on a method (if you're looking for a JavaScript function call)
      const spy = cy.spy().as('clickSpy');
      
      // Listen for the event and simulate a click
      cy.get(`@${disabledDate}`).click().then(() => {
        expect(spy).to.not.have.been.called;
      });
    }
  
    /*
    * Enter the destination in the search form.
    * @param {string} destination - The name of the destination
    */
    enterDestination(destination) {
      this.destinationInput().clear().type(destination);
    }
    
    /*
    * Select a check-in date.
    * @param {string} date - The check-in date in YYYY-MM-DD format
    */
    selectCheckInDate(date) {
      this.datePicker().click();
      this.checkDate(date).click();
    }
    
    /*
    * Select a check-out date.
    * @param {string} date - The check-out date in YYYY-MM-DD format
    */
    selectCheckOutDate(date) {
      this.checkDate(date).click();
    }
    /*
    * Configure the number of guests and rooms for the search.
    * @param {number} adults - Number of adult guests
    * @param {number} children - Number of child guests
    * @param {number} rooms - Number of rooms
    */
    configureGuests(adults, children, rooms) {
      this.guestsButton().click();
      cy.get(':nth-child(1) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      cy.get(':nth-child(2) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      cy.get(':nth-child(3) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      for (let i = 0; i < adults; i++) this.addAdultGuest().click();
      for (let k = 0; k < children; k++){
        this.addChildGuest().click()
        if(children>0){
          const randomAge = Math.floor((Math.random() * 16) + 2); 

            this.addChildAge(`${randomAge} years old`, k);
            for (let j = 0; j < rooms; j++) this.addRoom().click();
        }else{
            for (let j = 0; j < rooms; j++) this.addRoom().click();
        }
      } 
      
      
    }
    /**
    * Click the search button to submit the form.
    */
    clickSearchButton() {
      this.searchButton().click();
    }
    /*
     * Click the "Done" button to close the guest/room configuration.
     */
    clickDoneButton(){
        this.doneButton().click();
    }
  }
  
  export const searchPage = new SearchPage();
  