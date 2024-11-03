import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import vtuLogo from '../assets/logo.jpg';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state if available

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container">
                <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
            </div>

            {/* Navbar Links */}
            <ul className="nav-links">
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
