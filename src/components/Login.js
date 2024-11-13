import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';
import googleLogo from '../assets/goo.png';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to redirect after login
    const provider = new GoogleAuthProvider();

    const from = location.state?.from?.pathname || '/';  // Capture the previous page URL

    // Effect hook to check if the user is already authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                navigate(from);  // Redirect back to the previous page
            }
        });

        return () => unsubscribe(); // Cleanup listener on component unmount
    }, [setIsAuthenticated, navigate, from]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
            navigate(from || '/'); // Redirect after login
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            provider.setCustomParameters({ prompt: 'select_account' });
            await signInWithPopup(auth, provider);
            setIsAuthenticated(true);
            navigate(from || '/');
        } catch (error) {
            console.error("Google Login failed", error);
            setError("Failed to login with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="headline-messageess">
                <div className="marquee-text">
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    WELCOME TO VTU-NOTES WEBSITE
                </div>
            </div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="input-field"
                            placeholder="Enter your email"
                            aria-label="Email address"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="input-field"
                            placeholder="Enter your password"
                            aria-label="Password"
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="signup-notice">
                    Don't have an account? <a href="/signup">Sign up here</a>.
                </p>
                <button onClick={handleGoogleLogin} className="google-login-button" aria-label="Login with Google" disabled={loading}>
                    <img src={googleLogo} alt="Google Logo" className="google-logo" />
                    {loading ? 'Logging in...' : 'Login with Google'}
                </button>
            </div>
        </div>
    );
};

export default Login;
