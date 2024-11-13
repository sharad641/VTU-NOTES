import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './Navbar.css'; // Assuming you have corresponding CSS file
import vtuLogo from '../assets/logo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for mobile menu toggle

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Function to toggle the mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);

    // Function to close the menu when the Home link is clicked
    const closeMenu = () => setIsMobile(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container">
                <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
            </div>

            {/* Navbar Links */}
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li>
                    {/* Close the mobile menu when Home is clicked */}
                    <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                </li>
                <li>
                    <Link to="/placement-guide" className="nav-link" onClick={closeMenu}>Placement Guide</Link>
                </li>
                <li>
                    <Link to="/chatbot" className="nav-link" onClick={closeMenu}>Chatbot</Link>
                </li>
                <li>
                    <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
                </li>

                {/* Dropdown Menu */}
                <li className="dropdown">
                    <a href="#more" className="dropdown-toggle">More</a>
                    <div className="dropdown-content">
                        <Link to="/upload" className="dropdown-item" onClick={closeMenu}>Upload Notes</Link>
                        <Link to="/calculator" className="dropdown-item" onClick={closeMenu}>CGPA Calculator</Link>
                        <Link to="/faqs" className="dropdown-item" onClick={closeMenu}>FAQs</Link>
                    </div>
                </li>
            </ul>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">
                {isMobile ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
            </div>
        </nav>
    );
};

export default Navbar;
