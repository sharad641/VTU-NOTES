import React, { useState } from 'react';
import { auth } from './firebase'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
            // You can redirect the user or show a success message here
        } catch (err) {
            setError(err.message); // Set error message
            console.error('Error signing up:', err.message);
        }
    };

    const handleGoogleSignup = () => {
        // Handle Google signup logic here
        console.log('Sign up with Google');
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
