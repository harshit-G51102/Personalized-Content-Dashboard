describe("Search Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should show results after searching", () => {
    cy.get('[data-testid="search-input"]').type("batman");

    // Wait for debounce and API
    cy.wait(2000);

    cy.get('[data-testid="result-card"]').should("have.length.greaterThan", 0);
  });
});
