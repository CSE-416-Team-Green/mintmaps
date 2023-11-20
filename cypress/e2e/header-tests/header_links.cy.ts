describe("Test Header Links Navigate Correctly", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/home");
    });

    it("Clicking on About Navigates To About", () => {
        cy.contains("About")
            .click()
            .location()
            .should((location) => {
                expect(location.pathname).to.eq("/about");
            });
    });

    it("Clicking on Map Navigates To Map creation", () => {
        cy.get("[data-cy=map-button]")
            .click()
            .location()
            .should((location) => {
                expect(location.pathname).to.eq("/map-creation");
            });
    });
});
