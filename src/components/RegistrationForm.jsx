import React, { useState } from 'react';
import styles from './RegistrationForm.module.css'; 

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
            body: JSON.stringify(registrationData), // adjusted data here
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful', data);
            // handle the successful registration (redirecting to login page)
        } else {
            const error = await response.json();
            console.error('Registration failed', error);
            // handle errors (showing error messages to the user)
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors
    }
};

return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formInput}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className={styles.submitButton}>Register</button>
        </form>
    );
}


export default RegistrationForm;
