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
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <button onClick={handleGoogleSignup} className="google-signup-button" disabled={isSubmitting}>
                {isSubmitting ? 'Signing Up with Google...' : 'Sign Up with Google'}
            </button>
            <div className="redirect-to-login">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
        </div>
    );
};

export default Signup;
