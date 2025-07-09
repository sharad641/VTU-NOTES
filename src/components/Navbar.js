import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileInfo, setProfileInfo] = useState({ photoURL: '', initials: '' });
   

    // Toggle mobile menu
    const toggleMenu = () => setIsMobile(!isMobile);
    const closeMenu = () => setIsMobile(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsAuthenticated(true);
                if (currentUser.isAnonymous) {
                    setProfileInfo({
                        photoURL: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png',
                        initials: 'G',
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

        return () => unsubscribe();
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-title"></div>

            <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
                <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
                <li><Link to="/model-papers" className="nav-link" onClick={closeMenu}>Model QP & PYQPS</Link></li>
                <li><Link to="/branch/first-year" className="nav-link" onClick={closeMenu}>1st Year Engineering</Link></li>
                <li><Link to="/branch/cse" className="nav-link" onClick={closeMenu}>CSE Stream</Link></li>
            </ul>

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

            <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                {isMobile ? <FaTimes size={30} color="#fff" /> : <FaBars size={30} color="#fff" />}
            </div>
        </nav>
    );
};

export default Navbar;
