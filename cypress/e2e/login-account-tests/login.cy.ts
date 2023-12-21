describe("Test Login Page and Login Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.contains("Email").parent().find("input").type("rabdulaz.accts@gmail.com");

        cy.contains("Password").parent().find("input").type("12345");
    });

    it("Should login and redirect", () => {
        cy.contains("Log in").click();
        cy.on("window:alert", () => true);

        cy.url().should("include", "/home");
    });
});
