describe("All map types should be available for map creation", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/map-editing");
        cy.contains("Next").click();
    });

    it("General tab clickable", () => {
        cy.contains("General").click();
    });

    it("Overview tab clickable", () => {
        cy.contains("Overview").click();
    });

    it("Legend tab clickable", () => {
        cy.contains("Legend").click();
    });
});
