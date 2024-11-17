describe('Form Input Focus', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('focuses on the first name input when clicked', () => {
      cy.get('input#first-name').click();
      cy.get('input#first-name').should('have.focus');
    });
  
    it('focuses on the email input when clicked', () => {
      cy.get('input#email').click();
      cy.get('input#email').should('have.focus');
    });
  });
  