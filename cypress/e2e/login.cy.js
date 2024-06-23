describe('Login Test', () => {
  it('should successfully log in and navigate to the reading list', () => {
    cy.visit('/login');

    cy.get('input[name=username]').type('testuser');
    cy.get('input[name=password]').type('password123');

    // Stub backend API call
    cy.intercept('POST', `${Cypress.env('REACT_APP_API_URL')}/login`, {
      statusCode: 200,
      body: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      }
    }).as('loginRequest');

    cy.get('form').submit();

    cy.wait('@loginRequest').then(() => {
      expect(localStorage.getItem('token')).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    });

    cy.url().should('include', '/reading-list');
  });

  it('should display an error message on login failure', () => {
    cy.visit('/login');

    cy.get('input[name=username]').type('wronguser');
    cy.get('input[name=password]').type('wrongpassword');

    cy.intercept('POST', `${Cypress.env('REACT_APP_API_URL')}/login`, {
      statusCode: 401,
      body: {
        message: 'Invalid username or password'
      }
    }).as('loginRequest');

    cy.get('form').submit();

    cy.wait('@loginRequest').then((interception) => {
      console.log(interception);
    });

    cy.get('body').then(($body) => {
      if ($body.find('.error-message').length > 0) {
        cy.log('Error message element found');
      } else {
        cy.log('Error message element not found');
      }
    });

    cy.get('.error-message', { timeout: 10000 }).should('contain', 'Invalid username or password');
  });
});
