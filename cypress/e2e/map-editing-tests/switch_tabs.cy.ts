describe("All map types should be available for map creation", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/map-editing");
        cy.viewport(1280, 720)
        localStorage.setItem("mapId", "657d3a57831d36fcabe1bc92");
    });

    it("General tab clickable", () => {
        cy.contains("General").click();
    });



    it("Legend tab clickable", () => {
        cy.contains("Legend").click();
    });
});
