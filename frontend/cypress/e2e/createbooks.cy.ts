describe('template spec', () => {
  it.only('passes', () => {
    cy.visit('http://localhost:5173/books/create');
    cy.url().should("eq", "http://localhost:5173/auth/login"); 

  })
})