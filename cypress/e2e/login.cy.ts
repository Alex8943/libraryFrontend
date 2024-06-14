export {};

describe('login', () => {
  before(() => {
    cy.clearAllCookies()
    }) 
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  });
    
    it('an already existing user, should be able to login successfull', () => {
      cy.get('#login_button').click();

      cy.get('[name="email"]').type("cypress@mail.dk")
      cy.get('[name="password"]').type("admin123")
      cy.get('[name="email"]').should('have.value', "cypress@mail.dk");
      cy.get('[name="password"]').should('have.value', "admin123");

      cy.get('[type="submit"]').click();
      
    })

    it('favour an author', () => {
      cy.get('#login_button').click();

      cy.get('[name="email"]').type("cypress@mail.dk")
      cy.get('[name="password"]').type("admin123")
      cy.get('[name="email"]').should('have.value', "cypress@mail.dk");
      cy.get('[name="password"]').should('have.value', "admin123");
      cy.get('[type="submit"]').click();

      cy.get('#slider2 > .inline-block:nth-child(2) .chakra-image').click({force: true});

      cy.get('#slider2 > .inline-block:nth-child(3) .chakra-image').click({force: true});
      cy.get('.css-1q7jsje:nth-child(2)').click();
      cy.get('.chakra-link').click();
    })

    it("borrow a book", () => {
      //cy.get('#borrow_book').click();
      cy.get('#login_button').click();
      cy.get('[name="email"]').type("cypress@mail.dk")
      cy.get('[name="password"]').type("admin123")
      cy.get('[name="email"]').should('have.value', "cypress@mail.dk");
      cy.get('[name="password"]').should('have.value', "admin123");
      cy.get('[type="submit"]').click();
      cy.get('#slider2 > .inline-block:nth-child(2) .chakra-image').click({force: true});

      cy.get('#slider2 > .inline-block:nth-child(4) .chakra-image').click({force: true});
      cy.get('.css-rq5im').click({force: true});
    });

    it('the tags are used to find a specific book correctly', () => {
      cy.contains('.chakra-button', 'Fantasy').click();
      cy.contains('.chakra-button', 'Non-Fiction').click();
      cy.contains('.chakra-button', 'All').click();
    })
  })