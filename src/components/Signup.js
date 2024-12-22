import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from '../firebase';
import './Signup.css';
import googleLogo from '../assets/goo.png';  // Assuming the Google logo is at this path

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            console.error('Signup failed:', err);
            setError(`Signup failed. Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);
        try {
            googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
            await signInWithPopup(auth, googleAuthProvider);
            navigate('/');
        } catch (err) {
            console.error('Google signup failed:', err);
            setError(`Google signup failed. Error: ${err.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-heading">Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignup} className="signup-form">
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
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="social-signup">
                    <button className="google-signup-button" onClick={handleGoogleSignup} disabled={loading}>
                        <img src={googleLogo} alt="Google Logo" className="google-logo" />
                        {loading ? 'Signing up...' : 'Sign Up with Google'}
                    </button>
                </div>
                <p className="login-text">
                    Already have an account? <span onClick={() => navigate('/login')} className="login-link">Login</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
