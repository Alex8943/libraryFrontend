export {};

describe('deleteTestUser', () => {
    before(() => {
        cy.clearAllCookies()
    })
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    });

    it('deleteTestUser', () => {
        cy.get('#login_button').click();

        cy.get('[name="email"]').type("cypress@mail.dk")
        cy.get('[name="password"]').type("admin123")

        cy.get('[type="submit"]').click();

        cy.get('#user_tab_image').click();
        cy.get('#delete_user').click();

        
    
    });

}); 