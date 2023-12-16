describe("Test Header Links Navigate Correctly", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/home");
        cy.viewport(1280, 720)
    });

    it("Clicking on About Navigates To About", () => {
        cy.contains("About")
            .click()
            .location()
            .should((location) => {
                expect(location.pathname).to.eq("/about");
            });
    });
    it("Theme Toggle Functionality", () => {
        cy.get('[data-cy="theme-toggle"]').click(); 
    });

    it("Clicking on Map Navigates To Map creation", () => {
        cy.get("[data-cy=map-button]")
            .click()
            .location()
            .should((location) => {
                expect(location.pathname).to.eq("/map-creation");
            });
    });
    it("Profile Menu Visibility", () => {
        cy.get('[data-cy="profile-button"]').click(); 
    });
    it("Navigation to Help Page", () => {
        cy.contains("Help").click();
        cy.url().should("include", "/help");
    });

    it("Login Functionality", () => {
        cy.get('[data-cy="profile-button"]').click();
        cy.contains("Login").click();
        cy.url().should("include", "/login");
    });
});
