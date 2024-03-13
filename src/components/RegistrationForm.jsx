import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registrationData = {
        Username: formData.username,
        Email: formData.email,
        Password: formData.password,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData), // Use the adjusted data here
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful', data);
            // handle the successful registration (e.g., redirecting to login page)
        } else {
            const error = await response.json();
            console.error('Registration failed', error);
            // handle errors (e.g., showing error messages to the user)
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
