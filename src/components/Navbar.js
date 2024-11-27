import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import vtuLogo from '../assets/logo.jpg'; // Adjust the path if needed

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Toggle the mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);

    // Close the mobile menu
    const closeMenu = () => setIsMobile(false);

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo-container">
                <Link to="/" onClick={closeMenu}>
                    <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li>
                    <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                </li>
                
                <li>
                    <Link to="/calculator" className="nav-link" onClick={closeMenu}>CGPA Calculator</Link>
                </li>
                <li>
                    <Link to="/placement-guide" className="nav-link" onClick={closeMenu}>Placement Guide</Link>
                </li>
                <li>
                    <Link to="/faqs" className="nav-link" onClick={closeMenu}>FAQs</Link>
                </li>
                <li>
                    <Link to="/chatbot" className="nav-link" onClick={closeMenu}>Chatbot</Link>
                </li>
                <li>
                    <Link to="/upload" className="nav-link" onClick={closeMenu}>Upload Notes</Link>
                </li>
                <li className="dropdown">
                    {/* Dropdown for Branch Selection */}
                    <span className="dropdown-toggle">Branches</span>
                    <div className="dropdown-content">
                        <Link to="/branch-selection/2021" className="dropdown-item" onClick={closeMenu}>Scheme 2021</Link>
                        <Link to="/branch/cse" className="dropdown-item" onClick={closeMenu}>CSE</Link>
                        <Link to="/branch/ece" className="dropdown-item" onClick={closeMenu}>ECE</Link>
                        {/* Add other branches if needed */}
                        <li>
                    <Link to="/bee-scene" className="nav-link" onClick={closeMenu}>Bee Scene(just for fun)</Link>
                </li>
                    </div>
                </li>
            </ul>

            {/* Mobile Menu Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                {isMobile ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
            </div>
        </nav>
    );
};

export default Navbar;
