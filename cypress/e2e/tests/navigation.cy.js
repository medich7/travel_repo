import { navigationPage } from "../page-objects/NavigationPage";

describe("Navigation Tests for Booking.com",()=>{
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
        cy.intercept({resourceType: /xhr|fetch/}, {log: false});
        cy.closePopup();
        
    });

    const testData = [
        { 
            tab: 'stays',
            endpoint: '/index.html',
            url: '/index.html',
            content: 'Find',
            title: 'Booking.com' },
        { 
            tab: 'flights',
            endpoint: '/?n',
            url: '/flights/index.html',
            content: 'Find',
            title: 'Booking.com' },
        { 
            tab: 'attractions',
            endpoint: '/attractions/index.html',
            url: '/attractions',
            content: 'Attractions',
            title: 'Tons of tours' },
        { 
            tab: 'carRentals',
            endpoint: '/cars/index.html',
            url: '/cars',
            content: 'Car rentals',
            title: 'car rental' },
        { 
            tab: 'taxis',
            endpoint: '/taxi*',
            url: '/taxi',
            content: 'airport taxi',
            title: 'Airport taxis' },
    ];

    testData.forEach(({ tab, endpoint, url, content, title }) => {
        it(`Should navigate to the ${tab} section`, () => {
            navigationPage.validateNavigation(
                tab,
                endpoint,
                url,
                content,
                title);
        });
    });
    /*
    it('Should navigate to the Stays section', () => {
        navigationPage.validateNavigation(
          'stays',
          '/index.html',
          '/index.html',
          'Find',
          'Booking.com'
        );
      });

      it('Should navigate to the Flights section', () => {
        navigationPage.validateNavigation(
          'flights',
          '/?n',
          '/?n',
          'Find',
          'Booking.com'
        );
      });

      it('Should navigate to the Attractions section', () => {
        navigationPage.validateNavigation(
          'attractions',
          '/attractions/index.html',
          '/attractions',
          'Attractions',
          'Tons of tours'
        );
      });
    

    it.only('Should navigate to the Car Rentals section', () => {
        navigationPage.validateNavigation(
          'carRentals',
          '/cars/index.html',
          '/cars',
          'Car rentals',
          'car rental'
        );
    });

    it.skip('Should navigate to the Airport Taxis section', () => {
        navigationPage.validateNavigation(
          'taxis',
          '/taxi/index.html',
          '/taxi',
          'airport taxi',
          'Airport taxis'
        );
    });*/
})