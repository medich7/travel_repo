import { navigationPage } from "../page-objects/NavigationPage";

describe("Navigation Tests for Booking.com",()=>{
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
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
            url: '/?n',
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
        /* Test for taxis is commented out because the API endpoint is currently unavailable */
        /*{ 
            tab: 'taxis',
            endpoint: '/taxi/index.html?aid=304142&label=gen173bo-1DEgR0YXhpKIICOOgHSDNYA2jiAYgBAZgBMbgBF8gBDNgBA-gBAfgBAogCAZgCAqgCA7gCp7CQuwbAAgHSAiQ5NGFmMTRjOC0zMTEyLTQ0N2ItYmVmMy03NzgxNTMyMzM1MWPYAgTgAgE&sid=e0308e874d6f41080942b5dc5fbf0d40',
            url: '/taxi',
            content: 'airport taxi',
            title: 'Airport taxis' },*/
    ];

    testData.forEach(({ tab, endpoint, url, content, title }) => {
        it(`Should navigate to the ${tab} section`,{ defaultCommandTimeout:15000 }, () => {
            navigationPage.validateNavigation(
                tab,
                endpoint,
                url,
                content,
                title);
        });
    });
})