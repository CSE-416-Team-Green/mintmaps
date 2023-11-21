describe("Admin Panel should be interactive", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/usermanagement");
    });

    it("New Button clickable", () => {
        cy.contains("New").click();
    });
});
