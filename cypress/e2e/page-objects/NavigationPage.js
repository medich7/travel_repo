// cypress/e2e/page-objects/NavigationPage.js

class NavigationPage {


    // Use constants for navigation selectors (e.g., IDs or data attributes)
    locators = {
        staysTab: '#accommodations',
        flightsTab: '#flights',
        carRentalsTab: '#cars',
        attractionsTab: '#attractions',
        taxisTab: '#airport_taxis',
    };
    // Generic click method for tabs
    clickTab(tabName) {
        cy.get(this.locators[tabName]).click();
    }
  
    validatePageContent(expectedContent) {
      cy.contains(expectedContent).should('be.visible');
    }
  
    validateURL(expectedURL) {
      cy.url().should('include', expectedURL);
    }

    validateTitle(expectedTitle){
        cy.title().then(title =>{
            expect(title).to.include(expectedTitle);
        })
    }

    // Helper function for Validating navigation
    validateNavigation(tab, endpoint, url, content, title) {
        cy.intercept('GET', endpoint,{log:false}).as(`get${tab}`);
        this.clickTab(`${tab}Tab`);
        cy.wait(`@get${tab}`).its('response.statusCode').should('eq', 200);
        this.validateURL(url);
        this.validatePageContent(content);
        this.validateTitle(title);
    }

  }
  
  export const navigationPage = new NavigationPage();
  