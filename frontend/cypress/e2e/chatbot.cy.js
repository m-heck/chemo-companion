describe('Chatbot Functionality', () => {
  beforeEach(() => {
    // Visit the chatbot page
    cy.visit('http://localhost:3000/chatbot');
  });
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3001/')
      .its('status')
      .should('eq', 200);  // Ensure the backend is responding
  });

  it('should display the chatbot interface', () => {
    // Check that the main elements are loaded
    cy.get('h1').contains('Chat with ChemoCompanion');
    cy.get('.chatbox').should('be.visible');
    cy.get('.input-container').should('be.visible');
  });

  it('should send a user message and display a bot response', () => {
    // Stub the network request to mock the bot's response
    cy.intercept('POST', 'http://localhost:3001/chat', {
      statusCode: 200,
      body: { reply: 'Hello, how can I help you?' }
    }).as('sendMessage');

    // Type a message into the input field and send it
    cy.get('input[type="text"]').type('Hello');
    cy.get('button').contains('Send').click();

    // Ensure the message is sent
    cy.get('.chatbox').should('contain.text', 'Hello'); // User's message

    // Wait for the bot's response and check if it's displayed
    cy.wait('@sendMessage');
    cy.get('.chatbox').should('contain.text', 'Hello, how can I help you?'); // Bot's response
  });

  it('should handle empty messages gracefully', () => {
    // Try sending an empty message
    cy.get('input[type="text"]').type('   '); // Empty input
    cy.get('button').contains('Send').click();

    // Ensure no new messages are added
    cy.get('.chatbox').should('not.contain.text', '   ');
  });

  it('should display an error message if the API request fails', () => {
    // Stub the network request to simulate an error response
    cy.intercept('POST', 'http://localhost:3001/chat', {
      statusCode: 500,
      body: { message: 'Internal Server Error' }
    }).as('sendMessageError');

    // Type a message and click send
    cy.get('input[type="text"]').type('Hello');
    cy.get('button').contains('Send').click();

    // Wait for the error response
    cy.wait('@sendMessageError');

    // Check if the error message is displayed
    cy.get('.chatbox').should('contain.text', 'Error: Internal Server Error');
  });
});
