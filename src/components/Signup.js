import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    // Handle normal email/password signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Signup successful!');
            navigate('/login'); // Redirect to login page after successful signup
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Google signup
    const handleGoogleSignup = async () => {
        setError('');
        setIsSubmitting(true);

        try {
            await signInWithPopup(auth, provider);
            alert('Google Signup successful!');
            navigate('/login'); // Redirect to login page after successful Google signup
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Headline Message Section */}
            <div className="headline-messageess">
                <div className="marquee-text">
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    WELCOME TO VTU-NOTES WEBSITE
                </div>
            </div>

            <div className="signup-container">
                <h2>Sign Up</h2>

                {/* Error message display */}
                {error && <p className="error">{error}</p>}

                {/* Signup form for email/password */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                            aria-label="Email address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                            aria-label="Password"
                        />
                    </div>

                    <button type="submit" className="signup-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                {/* Google Signup Button */}
                <button
                    onClick={handleGoogleSignup}
                    className="google-signup-button"
                    disabled={isSubmitting}
                    aria-label="Sign up with Google"
                >
                    {isSubmitting ? 'Signing Up with Google...' : 'Sign Up with Google'}
                </button>

                {/* Redirect to login if already have an account */}
                <div className="redirect-to-login">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
