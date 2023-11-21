describe("Admin Panel should be interactive", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/usermanagement");
        cy.contains("Next").click();
    });

    it("New Button clickable", () => {
        cy.contains("New").click();
    });
});
