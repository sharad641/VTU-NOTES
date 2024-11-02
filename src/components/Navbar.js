import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import vtuLogo from '../assets/logo.jpg'; // Correct path to the logo

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle

    // Toggle the hamburger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container">
                <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
            </div>
            
            {/* Hamburger Icon */}
            <div 
                className={isOpen ? "hamburger active" : "hamburger"} 
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Navbar Links */}
            <ul className={isOpen ? "nav-links active" : "nav-links"}>
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/branch/cse">Computer Science</Link>
                </li>
                <li className="nav-item">
                    <Link to="/upload">Upload Notes</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
