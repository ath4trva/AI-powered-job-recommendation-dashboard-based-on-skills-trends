import React, { useState, useEffect } from 'react';
import Login from './components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in when the app starts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {!isAuthenticated ? (
        // 1. Show Login Page if not authenticated
        <Login onLogin={handleLogin} />
      ) : (
        // 2. Show Dashboard (Placeholder) if authenticated
        <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
          <h1>Welcome to the Job Wizard! 🧙‍♂️</h1>
          <p>You are now logged in.</p>
          <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;