describe('Signup login flow', () => {
    it('navigates to the login page when Log In is clicked', () => {
      cy.visit('/');
      cy.get('.log-in-button')
        .should('be.visible')
        .click();
      cy.url().should('include', '/login');
    });
  
    it('navigates to the signup page when Sign Up is clicked', () => {
      cy.visit('/');
      cy.get('.signup-button')
        .should('be.visible')
        .click();
      cy.url().should('include', '/signup');
    });
  });
  