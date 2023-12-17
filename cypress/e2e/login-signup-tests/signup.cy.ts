describe("Test Sign Up Page and Sign Up Modal", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.viewport(1280, 720)
        cy.contains("Sign Up").click();
    });

   /* it("Email field is able to receive test", () => {
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
    });*/
    it("Allows user to type in email, username, password, and confirm password fields", () => {
        // Typing into the email field
        cy.get('input[type="email"]').type("user@example.com");

        // Typing into the username field
        cy.get('input[type="username"]').type("newuser");

        // Typing into the password fields
        cy.get('input[type="password"]').eq(0).type("password123");
        cy.get('input[type="password"]').eq(1).type("password123");
    });
    it("Handles sign up on clicking the 'Sign Up' button", () => {
        // Type into the email, username, and password fields
        cy.get('input[type="email"]').type("user@example.com");

        // Typing into the username field
        cy.get('input[type="username"]').type("newuser");

        cy.get('input[type="password"]').eq(0).type("password123");
        cy.get('input[type="password"]').eq(1).type("password123");

        // Click the sign up button
        cy.contains('button', 'Sign Up').click();

    });
    it("Switches to login modal on 'Sign in' button click", () => {
        cy.contains('button', 'Sign in').click();
    });
    it("Google Sign In Button Visibility", () => {
        // Check if the Google Sign In button is visible
        cy.contains('Sign in with Google').should('be.visible');
    });
});
