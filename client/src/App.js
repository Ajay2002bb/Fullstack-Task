import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/templates" />} />
          <Route 
            path="/templates" 
            element={<Templates isAuthenticated={isAuthenticated} />} 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Favorites isAuthenticated={isAuthenticated} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/templates" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/templates" /> : <Register />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
