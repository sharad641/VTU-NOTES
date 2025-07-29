// D:\vtu-notes\client\src\components\Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    auth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    googleAuthProvider, 
    signInAnonymously 
} from '../firebase';
import './Login.css';
import googleLogo from '../assets/goo.png';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const adminEmail = "sp1771838@gmail.com";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
            if (email === adminEmail) {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError(`Invalid email or password. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, googleAuthProvider);
            setIsAuthenticated(true);
            if (result.user.email === adminEmail) {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError(`Google login failed. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAdminGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, googleAuthProvider);
            if (result.user.email === adminEmail) {
                setIsAuthenticated(true);
                navigate('/admin-dashboard', { replace: true });
            } else {
                setError('You are not authorized as Admin.');
            }
        } catch (err) {
            setError(`Admin Google login failed. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await signInAnonymously(auth);
            setIsAuthenticated(true);
            navigate(from, { replace: true });
        } catch (err) {
            setError(`Guest login failed. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-heading">Welcome Back!</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                        placeholder="Enter your email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="Enter your password"
                    />
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="social-login">
                    <button className="google-login-button" onClick={handleGoogleLogin} disabled={loading}>
                        <img src={googleLogo} alt="Google Logo" className="google-logo" />
                        {loading ? 'Logging in...' : 'Login with Google'}
                    </button>
                    <button className="guest-login-button" onClick={handleGuestLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login as Guest'}
                    </button>
                    <button className="admin-login-button" onClick={handleAdminGoogleLogin} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login as Admin (Google)'}
                    </button>
                </div>
                <p className="signup-text">
                    Don't have an account? <span onClick={() => navigate('/signup')} className="signup-link">Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
