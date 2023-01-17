describe("test homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })

  context("not start the game", () => {
    it("should display header and start game button", () => {
      cy.get("button").contains("Start new game").should("be.visible")
      cy.get("h2").contains("Blackjack Calculator").should("be.visible")
    })
  })

  context("start the game", () => {
    it("should display tables and buttons after click on game start", () => {
      cy.get("button").contains("Start new game").click()
      cy.get("th").each((item, index, list) => {
        expect(list).to.have.length(7)
      })
      cy.get("button").each((item, index, list) => {
        expect(list).to.have.length(3)
      })
      cy.get("button:disabled").should("be.visible")
    })
  })
})
