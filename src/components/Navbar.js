import React, { useState } from 'react';
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
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Placement Guide</a></li>
                <li><a href="#portfolio">Chatbot</a></li>
                <li><a href="#contact">Contact</a></li>
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
