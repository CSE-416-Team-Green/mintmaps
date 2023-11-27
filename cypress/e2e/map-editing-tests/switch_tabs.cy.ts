describe("All map types should be available for map creation", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/map-editing");
        localStorage.setItem("mapId", "65649d3f4921278712b4f732");
    });

    it("General tab clickable", () => {
        cy.contains("General").click();
    });



    it("Legend tab clickable", () => {
        cy.contains("Legend").click();
    });
});
