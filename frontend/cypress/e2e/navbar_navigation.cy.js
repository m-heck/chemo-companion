describe('Navbar Navigation', () => {
    beforeEach(() => {
      cy.visit('/home'); // Start from the home page
    });
  
    it('should navigate to home page when Home link is clicked', () => {
      cy.get('.nav-button').contains('Home').click();
      cy.url().should('include', '/home');
    });
  
    it('should navigate to AI Chatbot Page when AI Chatbot Page link is clicked', () => {
      cy.get('.nav-button').contains('AI Chatbot Page').click();
      cy.url().should('include', '/chatbot');
    });
  
    it('should navigate to Resources page when Resources link is clicked', () => {
      cy.get('.nav-button').contains('Resources').click();
      cy.url().should('include', '/resources');
    });
  
    it('should navigate to Patient Data page when Patient Data link is clicked', () => {
      cy.get('.nav-button').contains('Patient Data').click();
      cy.url().should('include', '/patient-data');
    });
  
    it('should show the profile dropdown when the profile button is clicked', () => {
      cy.get('.profile-button').click();
      cy.get('.profile-dropdown').should('be.visible');
    });
  
    it('should navigate to Account Management when Account Management link is clicked', () => {
      cy.get('.profile-button').click();
      cy.get('.profile-dropdown').contains('Account Management').click();
      cy.url().should('include', '/account');
    });
  
    it('should sign out when Sign Out button is clicked', () => {
      cy.intercept('POST', 'http://localhost:3001/signout').as('signout');
      cy.get('.profile-button').click();
      cy.get('.profile-dropdown').contains('Sign Out').click();
      cy.wait('@signout');
      cy.url().should('include', '/');
      cy.get('.nav-button').contains('Home').should('be.visible');
    });
  });
  