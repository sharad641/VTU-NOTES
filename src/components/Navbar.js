import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import vtuLogo from '../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state if available
    const navigate = useNavigate();
    const location = useLocation();

    // Toggle the hamburger menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle restricted link navigation
    const handleRestrictedLink = (path) => {
        if (!isLoggedIn) {
            // Redirect to login page if not logged in
            alert("Please log in to access this page.");
            navigate('/login');
        } else {
            // If logged in, navigate to target page or reload if already on it
            if (path === location.pathname) {
                window.location.reload();
            } else {
                navigate(path);
            }
        }
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container" onClick={() => handleRestrictedLink('/')}>
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
                    <Link onClick={() => handleRestrictedLink('/')}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={() => handleRestrictedLink('/about')}>About</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={() => handleRestrictedLink('/branch/cse')}>Computer Science</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={() => handleRestrictedLink('/upload')}>Upload Notes</Link>
                </li>
                <li className="nav-item">
                    {isLoggedIn ? (
                        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsLoggedIn(true)}>Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
