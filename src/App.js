import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import BooksPage from './components/BooksPage';
import ReadingListPage from './components/ReadingListPage';
import ReadOnlyReadingListPage from './components/ReadOnlyReadingListPage';
import UserDirectoryPage from './components/UserDirectoryPage';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';

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
            <Route
              path="/reading-list/other/:userId"
              element={
                <PrivateRoute>
                  <ReadOnlyReadingListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserDirectoryPage />
                </PrivateRoute>
              }
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
