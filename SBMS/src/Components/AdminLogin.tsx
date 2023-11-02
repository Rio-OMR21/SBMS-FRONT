import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminNavigationBar from './AdminNavigationBar';
import Home from '../Contents/Home';
import Buses from '../Contents/Buses';
import Attendance from '../Contents/Attendance';
import Payment from '../Contents/Payment';
import Students from '../Contents/Students';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in using browser storage
    const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Hardcoded admin credentials (replace with real authentication logic)
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      // Store the login status in session storage
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    // Clear the login status and redirect to the login page
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <div>
      {isLoggedIn ? (
        <Router>
          <div>
            <AdminNavigationBar /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Students" element={<Students />} />
              <Route path="/buses" element={<Buses />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </div>
        </Router>
      ) : (
        <div>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="Submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
