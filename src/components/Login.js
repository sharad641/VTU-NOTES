import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleAuthProvider, onAuthStateChanged } from '../firebase';
import './Login.css';
import googleLogo from '../assets/goo.png';  // Assuming the Google logo is at this path

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                navigate(from);
            }
        });
        return () => unsubscribe();
    }, [setIsAuthenticated, navigate, from]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
            navigate(from || '/');
        } catch (err) {
            console.error('Login failed:', err);  // Log error for debugging
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
            await signInWithPopup(auth, googleAuthProvider);
            setIsAuthenticated(true);
            navigate(from || '/');
        } catch (err) {
            console.error('Google login failed:', err);  // Log error for debugging
            setError(`Google login failed. Error: ${err.message || 'Unknown error'}`);
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
                </div>
                <p className="signup-text">
                    Don't have an account? <span onClick={() => navigate('/signup')} className="signup-link">Sign up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
