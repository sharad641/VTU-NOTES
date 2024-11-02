import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle

    // Toggle the hamburger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu after clicking a link
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar header">
            {/* Logo */}
            <h1 className="navbar-logo">VTU-NOTES</h1>
            
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
                    <Link to="/" onClick={closeMenu}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" onClick={closeMenu}>About</Link>
                </li>
                <li className="nav-item">
                    <Link to="/branch/cse" onClick={closeMenu}>Computer Science</Link>
                </li>
                <li className="nav-item">
                    <Link to="/upload" onClick={closeMenu}>Upload Notes</Link> {/* Ensure correct route */}
                </li>
                <li className="nav-item">
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
