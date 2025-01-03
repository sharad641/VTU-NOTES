import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth, database } from '../firebase'; // Ensure correct path to firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileInfo, setProfileInfo] = useState({ photoURL: '', initials: '' });

    // Toggle the mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);

    // Close the mobile menu
    const closeMenu = () => setIsMobile(false);

    // Check user authentication state and fetch profile info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsAuthenticated(true);

                if (currentUser.isAnonymous) {
                    // Set guest defaults
                    setProfileInfo({
                        photoURL: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png',
                        initials: 'G', // 'G' for Guest
                    });
                } else {
                    // Fetch user data from Firebase Realtime Database
                    const userRef = ref(database, `users/${currentUser.uid}`);
                    get(userRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            const userPhotoURL = data.photoURL || currentUser.photoURL;
                            const userInitials = data.name
                                ? data.name.split(' ').map((n) => n[0]).join('')
                                : 'U'; // Default to 'U' if no name

                            setProfileInfo({
                                photoURL: userPhotoURL || '',
                                initials: userInitials || 'U',
                            });
                        } else {
                            // Fallback for users without data in the database
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
                // Reset for non-authenticated users
                setIsAuthenticated(false);
                setProfileInfo({ photoURL: '', initials: '' });
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    return (
        <nav className="navbar">
            {/* Centered Title Section */}
            <div className="navbar-title">
                
            </div>

            {/* Navigation Links */}
<ul className={`nav-links ${isMobile ? 'active' : ''}`}>
    <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
    <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
    <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
    <li><Link to="/privacy-policy" className="nav-link" onClick={closeMenu}>Privacy Policy</Link></li>
    <li><Link to="/terms-and-conditions" className="nav-link" onClick={closeMenu}>Terms and Conditions</Link></li>
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
