import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to the Book Club App</h1>
        <p>
          Create and manage your reading lists, add books, and leave comments.
          Join the community of book readers!
        </p>
        <div className="homepage-buttons">
          <Link to="/register" className="btn btn-primary mr-2">Register</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
