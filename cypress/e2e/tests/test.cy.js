
describe("",()=>{
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
        cy.intercept({resourceType: /xhr|fetch/}, {log: false});
        cy.closePopup();
        
    });

    it("",()=>{
       
        /*cy.get('#accommodations');
        cy.get('#flights');
        cy.get('#cars');
        cy.get('#attractions');
        cy.get('#airport_taxis');*/

        cy.get('[name="ss"]').type('Some text');
        cy.get('.a1139161bf').click();
        cy.get('[data-testid="searchbox-datepicker-calendar"]').click()    
    
        cy.get('[data-date="2024-12-30"]').click();

        cy.get('[data-testid="searchbox-form-button-icon"]').click();
        cy.get(':nth-child(1) > .bfb38641b0 > .f4d78af12a').click();
        cy.get(':nth-child(2) > .bfb38641b0 > .f4d78af12a').click();
        cy.get('[name="age"]').should('be.visible').select('4 years old');
        cy.get(':nth-child(5) > .bfb38641b0 > .f4d78af12a').click();

        cy.get('.bf0537ecb5')

    })
})