describe('Signup Page Tests', () => {
    const baseUrl = 'http://localhost:3001'; // Replace with the actual URL if different
    
    beforeEach(() => {
      cy.visit('/signup'); // Update this path to match your signup route
    });
  
    it('renders the signup form', () => {
      cy.get('.Signup').should('be.visible');
      cy.get('#first-name').should('exist');
      cy.get('#last-name').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('button.signup-button').should('exist');
    });
  
    it('shows an alert when healthcare provider is not selected for patients', () => {
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('Doe');
      cy.get('#email').type('john.doe@example.com');
      cy.get('#password').type('Password123');
      cy.get('[value="patient"]').check(); // Select "Patient"
      cy.get('button.signup-button').click();
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Please select a healthcare provider.');
      });
    });
  
    it('submits the form successfully for patients with all fields filled', () => {
      cy.intercept('POST', `${baseUrl}/signup`, { statusCode: 201 }).as('signupRequest');
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('Doe');
      cy.get('#email').type('john.doe@example.com');
      cy.get('#password').type('Password123');
      cy.get('[value="patient"]').check();
      cy.get('#healthcare-provider').select('Florida Hospital');
      cy.get('button.signup-button').click();
  
      cy.wait('@signupRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
  
    it('redirects to the correct page for healthcare workers', () => {
      cy.intercept('POST', `${baseUrl}/signup`, { statusCode: 201 }).as('signupRequest');
      cy.get('#first-name').type('Jane');
      cy.get('#last-name').type('Smith');
      cy.get('#email').type('jane.smith@example.com');
      cy.get('#password').type('SecurePass123');
      cy.get('[value="healthcare-worker"]').check();
      cy.get('#healthcare-provider').select('Orlando Chemotherapy Clinic');
      cy.get('button.signup-button').click();
  
      cy.wait('@signupRequest').then(() => {
        cy.url().should('include', '/healthcare-home'); // Adjust to match actual route
      });
    });
  
    it('shows error for duplicate email signup', () => {
      cy.intercept('POST', `${baseUrl}/signup`, {
        statusCode: 409,
        body: { message: 'Email already exists' },
      }).as('duplicateEmailRequest');
      
      cy.get('#first-name').type('John');
      cy.get('#last-name').type('Doe');
      cy.get('#email').type('existing.email@example.com');
      cy.get('#password').type('Password123');
      cy.get('[value="patient"]').check();
      cy.get('#healthcare-provider').select('Miami Cancer Institute');
      cy.get('button.signup-button').click();
  
      cy.wait('@duplicateEmailRequest').then(() => {
        cy.on('window:alert', (txt) => {
          expect(txt).to.contains('This email is already associated with an account.');
        });
      });
    });
  });
  