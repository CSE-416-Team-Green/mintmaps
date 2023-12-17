describe("GeneralTab Component Functionality", () => {
  beforeEach(() => {
      // Adjust this to navigate to your component
      cy.visit("http://localhost:3000/map-editing");
      cy.viewport(1280, 720)
        localStorage.setItem("mapId", "657d3a57831d36fcabe1bc92");
  });

  it("Allows input of title", () => {
      const sampleTitle = "Sample Map Title";
      cy.get('[data-cy=title-input]').type(sampleTitle);
  });

  it("Allows input of description", () => {
      const sampleDescription = "This is a description for the map.";
      cy.get('[data-cy=description-input]').type(sampleDescription);
      
  });

  it("Allows adding tags", () => {
      const sampleTag = "nature";
      cy.get('[data-cy=tag-input]').type(`${sampleTag}{enter}`);
  });

  it("Triggers action on upload button click", () => {
      // This depends on what happens when the upload button is clicked
      // For example, if it navigates to a new page, you can assert the URL change
      cy.get('[data-cy=upload-button]').click();
      // Add assertions based on expected behavior after button click
  });

  // ... additional tests if needed
});
