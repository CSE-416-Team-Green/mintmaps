describe("Test Login Page and Login Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });


    it("Password field is able to receive test", () => {
        cy.contains("Password")
            .parent()
            .find("input")
            .type("password")
            .should("have.value", "password");
    });
});
