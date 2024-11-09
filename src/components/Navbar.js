import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './Navbar.css';
import vtuLogo from '../assets/logo.jpg';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Function to toggle the mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container">
                <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
            </div>

            {/* Navbar Links */}
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li> {/* Link to Home Page */}
                <li><Link to="/about">About</Link></li> {/* Link to About Page */}
                <li><Link to="/placement-guide">Placement Guide</Link></li> {/* Link to Placement Guide */}
                <li><Link to="/chatbot">Chatbot</Link></li> {/* Link to Chatbot Page */}
                <li><Link to="/contact">Contact</Link></li> {/* Link to Contact Page */}

                {/* Dropdown Menu */}
                <li className="dropdown">
                    <a href="#more">More</a>
                    <div className="dropdown-content">
                        <a href="#team">Team</a>
                        <a href="#blog">Blog</a>
                        <a href="#careers">Careers</a>
                    </div>
                </li>
            </ul>

            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
