import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavigationBar.css'; 

const AdminNavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-nav-container">
      <div className="admin-profile">
        <div className="initial">A</div>
      </div>
      <div className="menu-button" onClick={toggleMenu}>
        <div className="menu-icon">≡</div>
        <div className="menu-text">Menu</div>
      </div>
      {isMenuOpen && (
        <div className="menu">
          <Link to="/" className="menu-item">
            <div className="menu-icon">🏠</div>
            Home
          </Link>
          <Link to="/students" className="menu-item">
            <div className="menu-icon">👩‍🎓</div>
            Students
          </Link>
          <Link to="/buses" className="menu-item">
            <div className="menu-icon">🚌</div>
            Buses
          </Link>
          <Link to="/attendance" className="menu-item">
            <div className="menu-icon">📅</div>
            Attendance
          </Link>
          <Link to="/payment" className="menu-item">
            <div className="menu-icon">💰</div>
            Payment
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminNavigationBar;
