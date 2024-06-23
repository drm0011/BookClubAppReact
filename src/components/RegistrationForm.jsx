import React, { useState } from 'react';
import './RegistrationForm.module.css'; 

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

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
            body: JSON.stringify(registrationData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful', data);
            alert('Registration successful!');
        } else {
            const error = await response.json();
            setErrorMessage(error.message || 'Registration failed');
            console.error('Registration failed', error);
        }
    } catch (error) {
        setErrorMessage('Network error');
        console.error('Network error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
              <h2>Register</h2>
        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
        </div>
        <br/>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
}

export default RegistrationForm;
