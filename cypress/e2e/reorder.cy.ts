describe("Drag-and-Drop Reordering", () => {
 beforeEach(() => {
  const favorites = [
    {
      url: "https://a.com",
      title: "Article A",
      description: "First article",
      urlToImage: "",
    },
    {
      url: "https://b.com",
      title: "Article B",
      description: "Second article",
      urlToImage: "",
    },
  ]

  cy.visit("http://localhost:3000", {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "favorites-order",
        JSON.stringify(favorites.map((f) => f.url))
      )
      win.localStorage.setItem(
        "redux-persist:favorites",
        JSON.stringify({
          version: -1,
          rehydrated: true,
          articles: favorites,
        })
      )
    },
  })
})


  it("drags first card below the second", () => {
    cy.get('[data-testid="favorite-card"]').eq(0).as("card1");
    cy.get('[data-testid="favorite-card"]').eq(1).as("card2");

    cy.get("@card1").drag('[data-testid="favorite-card"]:eq(1)', {
      force: true,
    });

    // Optionally assert new order
    cy.get('[data-testid="favorite-card"]').first().should("contain", "Article B");
  });
});
