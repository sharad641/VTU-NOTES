import React from 'react';
import './Navbar.css';
import vtuLogo from '../assets/logo.jpg';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo-container">
                <img src={vtuLogo} alt="VTU Logo" className="navbar-logo" />
            </div>

            {/* Navbar Links */}
           
            
        </nav>
    );
};

export default Navbar;
