describe("Test Login Page and Login Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.viewport(1280, 720)
    });

    /*it("Email field is able to receive test", () => {
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
    });*/
    it("Allows user to type in email and password fields", () => {
        // Typing into the email field
        cy.get('input[type="email"]').first().type("user@example.com");

        // Typing into the password field
        cy.get('input[type="password"]').first().type("password123");
    });
    it("Handles login on clicking the 'Log in' button", () => {
        // Type into the email and password fields
        cy.get('input[type="email"]').first().type("user@example.com");
        cy.get('input[type="password"]').first().type("password123");

        // Click the login button
        cy.contains('button', 'Log in').click();

       
    });
    it("Navigates to password reset page on 'Forgot Your Password?' link click", () => {
        cy.contains('Forgot Your Password?').click();
        cy.url().should("include", "/resetpassword");
    });
    it("Switches to sign up modal on 'Sign Up' button click", () => {
        cy.contains('button', 'Sign Up').click();
        
    });
});
