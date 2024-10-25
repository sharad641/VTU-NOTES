import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this path is correct
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', email);
            // Optionally redirect or show a success message
        } catch (err) {
            setError(err.message); // Set error message
            console.error('Error signing up:', err.message);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            console.log('User signed up with Google:', result.user);
            // Optionally redirect or show a success message
        } catch (err) {
            setError(err.message); // Set error message
            console.error('Error signing up with Google:', err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>} {/* Display error message */}
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
                <button type="submit">Sign Up</button>
            </form>
            <button className="google-signup" onClick={handleGoogleSignup}>
                Sign Up with Google
            </button>
        </div>
    );
};

export default Signup;
