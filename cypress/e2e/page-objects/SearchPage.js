class SearchPage {
    // Locators for search elements
    destinationInput() {
      return cy.get('[name="ss"]'); // Selector for destination input field
    }
  
    datePicker() {
      return cy.get('[data-testid="searchbox-dates-container"]') // Date picker container
    }
  
    checkDate(date) {
      return cy.get(`[data-date="${date}"]`); // Dynamic date selector
    }
  
    guestsButton() {
      return cy.get('[data-testid="searchbox-form-button-icon"]'); // Guests/rooms button
    }
  
    addAdultGuest() {
      return cy.get(':nth-child(1) > .bfb38641b0 > .f4d78af12a'); // Add adult guest button
    }
  
    addChildGuest() {
      return cy.get(':nth-child(2) > .bfb38641b0 > .f4d78af12a'); // Add child guest button
    }

    addChildAge(age){
        return cy.get('[name="age"]').should('be.visible').select(age);
    }
  
    addRoom() {
      return cy.get(':nth-child(5) > .bfb38641b0 > .f4d78af12a'); // Add room button
    }
  
    searchButton() {
        return cy.get('.d12ff5f5bf > .a83ed08757'); // Search button
      
    }

    doneButton(){
        return cy.get('.bf0537ecb5'); 
    }
  
    // Methods for actions
    enterDestination(destination) {
      this.destinationInput().clear().type(destination);
    }
  
    selectCheckInDate(date) {
      this.datePicker().click();
      this.checkDate(date).click();
    }
  
    selectCheckOutDate(date) {
      this.checkDate(date).click();
    }
  
    configureGuests(adults, children, rooms) {
      this.guestsButton().click();
      cy.get(':nth-child(1) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      cy.get(':nth-child(2) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      cy.get(':nth-child(3) > .bfb38641b0 > .d723d73d5f').invoke('text', '0');
      for (let i = 0; i < adults; i++) this.addAdultGuest().click();
      for (let k = 0; k < children; k++){
        this.addChildGuest().click()
        if(children>0){
            this.addChildAge('4 years old');
            for (let j = 0; j < rooms; j++) this.addRoom().click();
        }else{
            for (let j = 0; j < rooms; j++) this.addRoom().click();
        }
      } 
      
      
    }
  
    clickSearchButton() {
      this.searchButton().click();
    }

    clickDoneButton(){
        this.doneButton().click();
    }
  }
  
  export const searchPage = new SearchPage();
  