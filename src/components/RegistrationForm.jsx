import React, { useState } from 'react';
import './RegistrationForm.module.css'; 

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
            body: JSON.stringify(registrationData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful', data);
        } else {
            const error = await response.json();
            console.error('Registration failed', error);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
}

export default RegistrationForm;
