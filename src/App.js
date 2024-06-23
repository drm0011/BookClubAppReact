import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import BooksPage from './components/BooksPage';
import ReadingListPage from './components/ReadingListPage';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/reading-list"
              element={
                <PrivateRoute>
                  <ReadingListPage />
                </PrivateRoute>
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<h1>Welcome to the Book Club App</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
