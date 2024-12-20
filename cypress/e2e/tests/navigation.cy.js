import { navigationPage } from "../page-objects/NavigationPage";

describe("Navigation Tests for Booking.com",()=>{
    beforeEach(() => {
        // Visit the base URL before each test
        cy.visit('/');
        cy.closePopup();
        
    });

    const testData = [
        
        /* Test for taxis is commented out because the API endpoint is currently unavailable */
        /*{ 
            tab: 'taxis',
            endpoint: '/taxi/index.html?aid=304142&label=gen173bo-1DEgR0YXhpKIICOOgHSDNYA2jiAYgBAZgBMbgBF8gBDNgBA-gBAfgBAogCAZgCAqgCA7gCp7CQuwbAAgHSAiQ5NGFmMTRjOC0zMTEyLTQ0N2ItYmVmMy03NzgxNTMyMzM1MWPYAgTgAgE&sid=e0308e874d6f41080942b5dc5fbf0d40',
            url: '/taxi',
            content: 'airport taxi',
            title: 'Airport taxis' },*/
    ];

    it('Should navigate through all sections', function () {
        cy.fixture('navigation.json').then((testData) => {
            testData.forEach(({ tab, endpoint, url, content, title }) => {
                navigationPage.validateNavigation(
                    tab,
                    endpoint,
                    url,
                    content,
                    title
                );
            });
        });
    });
})