import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth, database } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileInfo, setProfileInfo] = useState({ photoURL: '', initials: '' });
    const navigate = useNavigate();

    const toggleMenu = () => setIsMobile(!isMobile);
    const closeMenu = () => setIsMobile(false);

    const handleBranchClick = (branch) => {
        navigate(`/branch/${branch}`);
    };

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
                        const data = snapshot.val() || {};
                        const name = data.name || currentUser.displayName || 'User';
                        const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                        setProfileInfo({
                            photoURL: data.photoURL || currentUser.photoURL || '',
                            initials,
                        });
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
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">VTU Notes</Link>
            </div>

            <div className={`navbar-center ${isMobile ? 'active' : ''}`}>
                <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
                <div className="nav-link branch-link" onClick={() => { handleBranchClick('first-year'); closeMenu(); }}>
                    1st Year
                </div>
                <div className="nav-link branch-link" onClick={() => { handleBranchClick('cse'); closeMenu(); }}>
                    CSE Stream
                </div>
            </div>

            <div className="navbar-right">
                <Link
                    to={isAuthenticated ? '/profile' : '/login'}
                    className="profile-button"
                    onClick={closeMenu}
                    aria-label={isAuthenticated ? 'Profile' : 'Login'}
                >
                    {isAuthenticated ? (
                        profileInfo.photoURL ? (
                            <img src={profileInfo.photoURL} alt="Profile" className="profile-photo" />
                        ) : (
                            <div className="profile-initials">{profileInfo.initials}</div>
                        )
                    ) : (
                        'Login'
                    )}
                </Link>

                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                    {isMobile ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
