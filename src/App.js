import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import BooksPage from './components/BooksPage';
import ReadingListPage from './components/ReadingListPage';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Book Club</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/books">Search for Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reading-list">Your Reading List</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/reading-list" element={<ReadingListPage />} />
                        <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}


export default App;
