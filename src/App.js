import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import BooksPage from './components/BooksPage';
import ReadingListPage from './components/ReadingListPage';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/register">Register New User</Link>
                        </li>
                        <li>
                            <Link to="/books">Search for Books</Link>
                        </li>
                        <li>
                            <Link to="/reading-list">Your Reading List</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/reading-list" element={<ReadingListPage />} />
                    <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
