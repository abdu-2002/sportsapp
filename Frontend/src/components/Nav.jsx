// src/components/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Nav = () => {
    return (
        <div className="nav-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="https://i.pinimg.com/236x/69/78/dc/6978dc37128636ec2c1cf3ec59fa8e2f.jpg" alt="Logo" className="logo-image" /> 
                    <span className="logo-text">Sports Lynx</span>
                </div>
                <div className="nav-links">
                    {/* <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link> */}
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <h1 className="main-title">Sports Lynx</h1>
                <p className="main-description">
                Welcome to Sports Lynx, your ultimate solution for managing sports teams effortlessly. Track performance, communicate with team members, and stay updated with all the latest fixtures.
                </p>
                <Link to="/register" className="cta-button">Register Now</Link>
            </div>
        </div>
    );
};

export default Nav;
