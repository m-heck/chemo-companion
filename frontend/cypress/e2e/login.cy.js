// cypress/e2e/login.spec.js

describe('Login Page Tests', () => {
  const baseUrl = 'http://localhost:3000'; // Replace with the actual frontend URL
  const apiUrl = 'http://localhost:3001/login'; // Replace with your backend API URL

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('should display the login page correctly', () => {
    cy.contains('Log In').should('exist');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('input[type="radio"][value="patient"]').should('exist');
    cy.get('input[type="radio"][value="healthcare-worker"]').should('exist');
  });

  it('should show an alert for incorrect credentials', () => {
    cy.intercept('POST', apiUrl, {
      statusCode: 401,
      body: { message: 'Invalid email or password' },
    }).as('loginRequest');

    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('input[type="radio"][value="patient"]').check();
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Incorrect email or password.');
    });
  });

  it('should log in successfully for a valid user', () => {
    cy.intercept('POST', apiUrl, {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('loginRequest');

    cy.get('input#email').type('user@example.com');
    cy.get('input#password').type('correctpassword');
    cy.get('input[type="radio"][value="patient"]').check();
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/patient-data/edit'); // Verify navigation
  });

  it('should navigate to the signup page on clicking "New User? Sign Up"', () => {
    cy.get('a.new-user').click();
    cy.url().should('include', '/signup');
  });

  it('should open the forgot password modal', () => {
    cy.get('a.forgot-password').click();
    cy.contains('Forgot Your Password?').should('be.visible');
    cy.get('.modal-button').click();
    cy.contains('Forgot Your Password?').should('not.exist'); // Verify modal closes
  });
});

