describe('Registration Form', () => {
    const apiUrl = Cypress.env('REACT_APP_API_URL');
  
    beforeEach(() => {
      cy.visit('/register'); // Visit the base URL
    });
  
    it('should display error message when fields are empty', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.error-message').should('contain', 'All fields are required.');
    });
  
    it('should register successfully with valid data', () => {
      cy.intercept('POST', `${apiUrl}/register`, {
        statusCode: 200,
        body: { message: 'Registration successful!' }
      }).as('registerRequest');
  
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Registration successful!');
      });
    });
  
    it('should display error message when registration fails', () => {
      cy.intercept('POST', `${apiUrl}/register`, {
        statusCode: 400,
        body: { message: 'Registration failed' }
      }).as('registerRequestFail');
  
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registerRequestFail').its('response.statusCode').should('eq', 400);
      cy.get('.error-message').should('contain', 'Registration failed');
    });
  
    it('should display network error message when network error occurs', () => {
      cy.intercept('POST', `${apiUrl}/register`, {
        forceNetworkError: true
      }).as('registerRequestNetworkError');
  
      cy.get('#username').type('testuser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registerRequestNetworkError');
      cy.get('.error-message').should('contain', 'Network error');
    });
  });
  