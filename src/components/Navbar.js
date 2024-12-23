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
                setIsAuthenticated(true); // User is logged in

                // Fetch user data from Firebase Realtime Database
                const userRef = ref(database, 'users/' + currentUser.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        // Set profile photo or fallback to initials
                        const userPhotoURL = data.photoURL || currentUser.photoURL;
                        const userInitials = data.name ? data.name.split(' ').map((n) => n[0]).join('') : 'U'; // Default to 'U' if no name

                        setProfileInfo({
                            photoURL: userPhotoURL || '',
                            initials: userInitials || 'U',
                        });
                    } else {
                        // Fallback to auth photo or initials if no data
                        const userInitials = currentUser.displayName ? currentUser.displayName.split(' ').map((n) => n[0]).join('') : 'U';
                        setProfileInfo({
                            photoURL: currentUser.photoURL || '',
                            initials: userInitials,
                        });
                    }
                });
            } else {
                setIsAuthenticated(false); // User is logged out
                setProfileInfo({ photoURL: '', initials: '' }); // Default if not logged in
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    return (
        <nav className="navbar">
            {/* Centered Title Section */}
            <div className="navbar-title">
                <h1>VTU Notes</h1>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/calculator" className="nav-link" onClick={closeMenu}>CGPA Calculator</Link></li>
                <li><Link to="/placement-guide" className="nav-link" onClick={closeMenu}>Placement Guide</Link></li>
                <li><Link to="/faqs" className="nav-link" onClick={closeMenu}>FAQs</Link></li>
                <li><Link to="/chatbot" className="nav-link" onClick={closeMenu}>Chatbot</Link></li>
                <li><Link to="/upload" className="nav-link" onClick={closeMenu}>Upload Notes</Link></li>
            </ul>

            {/* Profile or Login Button */}
            <Link to={isAuthenticated ? '/profile' : '/login'} className="profile-button" onClick={closeMenu}>
                {isAuthenticated ? (
                    profileInfo.photoURL ? (
                        <img
                            src={profileInfo.photoURL}  // Use the photo URL if available
                            alt="Profile"
                            className="profile-photo"
                        />
                    ) : (
                        <div className="profile-initials">
                            {profileInfo.initials} {/* Display initials as a fallback */}
                        </div>
                    )
                ) : 'Login'}
            </Link>

            {/* Mobile Menu Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                {isMobile ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
            </div>
        </nav>
    );
};

export default Navbar;
