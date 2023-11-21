describe("Test Login Page and Login Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });

    it("Email field is able to receive test", () => {
        cy.contains("Email")
            .parent()
            .find("input")
            .type("password")
            .should("have.value", "password");
    });

    it("Password field is able to receive test", () => {
        cy.contains("Password")
            .parent()
            .find("input")
            .type("password")
            .should("have.value", "password");
    });
});
