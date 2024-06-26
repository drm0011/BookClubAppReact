import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Book Club</Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={isOpen ? 'menu-icon__bar open' : 'menu-icon__bar'}></div>
        <div className={isOpen ? 'menu-icon__bar open' : 'menu-icon__bar'}></div>
        <div className={isOpen ? 'menu-icon__bar open' : 'menu-icon__bar'}></div>
      </div>
      <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/books">Search for Books</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reading-list">Your Reading List</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/users">User Directory</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
