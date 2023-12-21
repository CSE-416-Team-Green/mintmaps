describe("All map types should be available for map creation", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.contains("Email")
            .parent()
            .find("input")
            .type("rabdulaz.accts@gmail.com");

        cy.contains("Password").parent().find("input").type("12345");

        cy.contains("Log in").click();
        cy.on("window:alert", () => true);

        cy.url().should("include", "/home"); // Replace '/map-creation' with the expected URL segment
        cy.visit("http://localhost:3000/map-creation");
        cy.contains("Select a preset map").click();
        cy.contains("Africa").click();

        cy.contains("Next").click();
    });

    it("Heat Map Available", () => {
        cy.contains(".MuiChip-label", "Heat Map").should("be.visible");
    });

    it("Heat Map Clickable", () => {
        cy.contains(".MuiChip-label", "Heat Map").click();
    });

    it("Proportional Symbol Map Available", () => {
        cy.contains(".MuiChip-label", "Proportional Symbol").should(
            "be.visible"
        );
    });

    it("Proportional SymbolMap Clickable", () => {
        cy.contains(".MuiChip-label", "Proportional Symbol").click();
    });

    it("Point Map Available", () => {
        cy.contains(".MuiChip-label", "Point Map").should("be.visible");
    });

    it("Point Map  Clickable", () => {
        cy.contains(".MuiChip-label", "Point Map").click();
    });

    it("Choropleth Available", () => {
        cy.contains(".MuiChip-label", "Choropleth").should("be.visible");
    });

    it("Choropleth Clickable", () => {
        cy.contains(".MuiChip-label", "Choropleth").click();
    });

    it("Bivariate Choropleth Available", () => {
        cy.contains(".MuiChip-label", "Bivariate Choropleth").should(
            "be.visible"
        );
    });

    it("Bivariate Choropleth Clickable", () => {
        cy.contains(".MuiChip-label", "Bivariate Choropleth").click();
    });
});
