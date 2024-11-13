import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './Navbar.css'; // Assuming you have corresponding CSS file
import vtuLogo from '../assets/logo.jpg';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for mobile menu toggle

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
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/about" className="nav-link">About</Link></li>
                <li><Link to="/placement-guide" className="nav-link">Placement Guide</Link></li>
                <li><Link to="/chatbot" className="nav-link">Chatbot</Link></li>
                <li><Link to="/contact" className="nav-link">Contact</Link></li>

                {/* Dropdown Menu */}
                <li className="dropdown">
                    <a href="#more" className="dropdown-toggle">More</a>
                    <div className="dropdown-content">
                        
                        <Link to="/upload" className="dropdown-item">Upload Notes</Link>
                        <Link to="/calculator" className="dropdown-item">CGPA Calculator</Link>
                        <Link to="/faqs" className="dropdown-item">FAQs</Link>
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
