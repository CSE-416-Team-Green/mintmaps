describe("Legendtab Component Functionality", () => {
  beforeEach(() => {
      // Adjust this to navigate to your component
      cy.visit("http://localhost:3000/map-editing");
      cy.viewport(1280, 720)
      localStorage.setItem("mapId", "657d3a57831d36fcabe1bc92");
      cy.contains("Legend").click();
  });
  it("Interacts with LinearLegend component", () => {
    cy.contains("Title").click();
    cy.get('[data-cy=title-input]').type('New Title');
  });
  describe("spectrum Functionality", () => {
    beforeEach(() => {
        cy.contains("Spectrum").click();
    });
    it("Allows updating the minimum value", () => {
      const newValueMin = "10";
      cy.get('[data-cy=value-min-input]').clear().type(newValueMin);
      
    });
    it("Allows updating the maximum value", () => {
      const newValueMax = "100";
      cy.get('[data-cy=value-max-input]').clear().type(newValueMax);
    });
    it("Allows updating the minimum color", () => {
      // Open the color picker
      const newColorMin = "#00000";
      cy.get('[data-cy=color-min-input]').clear().type(newColorMin);
    });
    it("Allows updating the max color", () => {
      // Open the color picker
      const newColorMin = "#1111111";
      cy.get('[data-cy=color-max-input]').clear().type(newColorMin);
    });
  });
  
  


});