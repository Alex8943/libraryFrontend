export {};
describe('template spec', () => {
  before(() => {
    
    cy.clearAllCookies()
    cy.visit('http://localhost:5173/')
  });
  
  it('a new user is created successfully', () => {

    cy.get('#signup_button').click();
    

    cy.get('[name="first_name"]').type("Cypressfirst")
    cy.get('[name="last_name"]').type("Cypresslast")
    cy.get('[name="email"]').type("cypress@mail.dk")
    cy.get('[name="password"]').type("admin123")
    
    cy.get('[name="first_name"]').should('have.value', "Cypressfirst");
    cy.get('[name="last_name"]').should('have.value', "Cypresslast");
    cy.get('[name="email"]').should('have.value', "cypress@mail.dk");
    cy.get('[name="password"]').should('have.value', "admin123");

    cy.get('[type="submit"]').click();
  })
})

