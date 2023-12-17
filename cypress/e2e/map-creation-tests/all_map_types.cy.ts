describe("All map types should be available for map creation", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/map-creation");
        cy.viewport(1280, 720)
    });
   it("Go through every step", () => {
        // Ensure the file input is visible and enabled before attaching a file
        cy.get('input[type="file"]').and('not.be.disabled');
        // You need to have a test file in your project's fixtures folder
        cy.get('input[type="file"]').attachFile('example.geo.json');
        cy.get('[data-cy="filename"]').should('contain', 'example.geo.json');
        cy.get('button').contains('Next').click();
        const mapTypes = ["Heat Map", "Proportional Symbol", "Point Map", "Choropleth", "Bivariate Choropleth"];
        mapTypes.forEach((mapType) => {
                // Click on the chip for each map type
                cy.get('[data-cy=map-type]').contains(mapType).click();
    
        });
        cy.get('button').contains('Next').click();
        const sampleTitle = "Sample Map Title";
        const sampleTags = "nature, landscape, geography";

        // Enter text into the title field
        cy.get('[data-cy=title-input]').type(sampleTitle);

        // Enter text into the tags field
        cy.get('[data-cy=tags-input]').type(sampleTags);
        cy.get('button').contains('Finish').click();
    
        
    });
    it("step 1 to step 2, then go back to do the step 1 again", () => {
        // Open the preset map dropdown
        cy.get('input[type="file"]').and('not.be.disabled');
        // You need to have a test file in your project's fixtures folder
        cy.get('input[type="file"]').attachFile('example1.geo.json');
        //cy.get('[data-cy="filename"]').should('contain', 'example.geo.json');
        cy.get('button').contains('Next').click();
        cy.get('button').contains('Back').click();
        cy.get('input[type="file"]').attachFile('example1.geo.json');
        cy.get('button').contains('Next').click();

    });
    it("step 1 to step 2, to step 3 then go back to do the step 2 again", () => {
        // Open the preset map dropdown
        cy.get('input[type="file"]').and('not.be.disabled');
        // You need to have a test file in your project's fixtures folder
        cy.get('input[type="file"]').attachFile('example2.geo.json');
        //cy.get('[data-cy="filename"]').should('contain', 'example.geo.json');
        cy.get('button').contains('Next').click();
        const mapTypes = ["Heat Map", "Proportional Symbol", "Point Map", "Choropleth", "Bivariate Choropleth"];
        mapTypes.forEach((mapType) => {
                // Click on the chip for each map type
                cy.get('[data-cy=map-type]').contains(mapType).click();
    
        });
        cy.get('button').contains('Next').click();
        cy.get('button').contains('Back').click();
        mapTypes.forEach((mapType) => {
            // Click on the chip for each map type
            cy.get('[data-cy=map-type]').contains(mapType).click();

        });
        cy.get('button').contains('Next').click();

    });
    /*it("seperate test for step 1:Handles preset map selection", () => {
        // Open the preset map dropdown
        cy.get('[data-cy=preset-map-select]').click(); // Adjust this to match your actual selector

        // Select a preset map from the dropdown
        cy.get('[data-cy=preset-map-select]').contains('United States').click();
        cy.get('button').contains('Next').click();

    });*/
    /*it("remove preset map selection", () => {
        // Open the preset map dropdown
        cy.get('[data-cy=preset-map-select]').click(); // Adjust this to match your actual selector

        // Select a preset map from the dropdown
        cy.get('[data-cy=preset-map-select]').contains('Canada').click();

    });
    it("remove preset map selection", () => {
        // Open the preset map dropdown
        cy.get('[data-cy=preset-map-select]').click(); // Adjust this to match your actual selector

        // Select a preset map from the dropdown
        cy.get('[data-cy=preset-map-select]').contains('Select a preset map').click();

    });*/

    /*it("Heat Map Available", () => {
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
    });*/
    /*it("Handles file upload", () => {
        // You need to have a test file in your fixtures to upload
        cy.get('input[type="file"]').attachFile('path/to/your/testfile.geojson');

        // After file upload, check if the file name is displayed
        
    });*/
});
