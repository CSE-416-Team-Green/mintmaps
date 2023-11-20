describe("Test Sign Up Page and Sign Up Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.contains("Sign Up").click();
    });

    it("Email field is able to receive test", () => {
        cy.contains("Email")
            .parent()
            .find("input")
            .type("user")
            .should("have.value", "user");
    });

    it("Useranme field is able to receive test", () => {
        cy.contains("Username")
            .parent()
            .find("input")
            .type("user")
            .should("have.value", "user");
    });

    it("Password field is able to receive test", () => {
        cy.contains("Password")
            .parent()
            .find("input")
            .type("password")
            .should("have.value", "password");
    });

    it("Password Confirm field is able to receive test", () => {
        cy.contains("Confirm Password")
            .parent()
            .find("input")
            .type("password")
            .should("have.value", "password");
    });
});
