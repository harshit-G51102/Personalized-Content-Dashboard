describe("Search Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/search");
  });

  it("should show results after searching", () => {
    cy.get('[data-testid="search-input"]').type("batman");

    // Wait for debounce + network
    cy.wait(2000);

    cy.get('[data-testid="result-card"]').should("have.length.greaterThan", 0);
  });
});
