import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth, database } from '../firebase'; // Ensure correct path to firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileInfo, setProfileInfo] = useState({ photoURL: '', initials: '' });
    const navigate = useNavigate(); // Hook for navigation

    // Toggle the mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);

    // Close the mobile menu
    const closeMenu = () => setIsMobile(false);

    // Handle branch card click with navigation
    const handleBranchClick = (branch) => {
        if (branch === 'first-year') {
            // Navigate to the 1st and 2nd semester routes
            navigate(`/branch/first-year`);
        } else {
            // Navigate to the selected stream's semester routes (3rd to 8th)
            navigate(`/branch/${branch}`);
        }
    };

    // Check user authentication state and fetch profile info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsAuthenticated(true);

                if (currentUser.isAnonymous) {
                    setProfileInfo({
                        photoURL: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png',
                        initials: 'G', // 'G' for Guest
                    });
                } else {
                    const userRef = ref(database, `users/${currentUser.uid}`);
                    get(userRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            const userPhotoURL = data.photoURL || currentUser.photoURL;
                            const userInitials = data.name
                                ? data.name.split(' ').map((n) => n[0]).join('')
                                : 'U';

                            setProfileInfo({
                                photoURL: userPhotoURL || '',
                                initials: userInitials || 'U',
                            });
                        } else {
                            const userInitials = currentUser.displayName
                                ? currentUser.displayName.split(' ').map((n) => n[0]).join('')
                                : 'U';
                            setProfileInfo({
                                photoURL: currentUser.photoURL || '',
                                initials: userInitials,
                            });
                        }
                    });
                }
            } else {
                setIsAuthenticated(false);
                setProfileInfo({ photoURL: '', initials: '' });
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    return (
        <nav className="navbar">
            {/* Centered Title Section */}
            <div className="navbar-title"></div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
                <li>
                    <div className="branch-card1" onClick={() => handleBranchClick('first-year')}>
                        1ST YEAR ENGINEERING
                    </div>
                </li>
                <li>
                    <div className="branch-card1" onClick={() => handleBranchClick('cse')}>
                        CSE STREAM
                    </div>
                </li>
            </ul>

            {/* Profile or Login Button */}
            <Link
                to={isAuthenticated ? '/profile' : '/login'}
                className="profile-button"
                onClick={closeMenu}
            >
                {isAuthenticated ? (
                    profileInfo.photoURL ? (
                        <img
                            src={profileInfo.photoURL}
                            alt="Profile"
                            className="profile-photo"
                        />
                    ) : (
                        <div className="profile-initials">
                            {profileInfo.initials}
                        </div>
                    )
                ) : (
                    'Login'
                )}
            </Link>

            {/* Mobile Menu Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                {isMobile ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
            </div>
        </nav>
    );
};

export default Navbar;
