const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js', // Ensure this points to the correct support file
    env: {
      REACT_APP_API_URL: 'http://localhost:5051' // Set the correct API URL
    }
  },
});
