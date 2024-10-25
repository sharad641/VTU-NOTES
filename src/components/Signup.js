import React, { useState } from 'react';
<<<<<<< HEAD
import { auth } from '../firebase'; // Adjust the path based on your structure
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
=======
import { auth } from './firebase'; // Adjust the path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
>>>>>>> e2c69ec53730cd7d81a7da9b660faed126fb9efe
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
<<<<<<< HEAD
            // Optionally redirect or show a success message
=======
            // You can redirect the user or show a success message here
>>>>>>> e2c69ec53730cd7d81a7da9b660faed126fb9efe
        } catch (err) {
            setError(err.message); // Set error message
            console.error('Error signing up:', err.message);
        }
    };

<<<<<<< HEAD
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
=======
    const handleGoogleSignup = () => {
        // Handle Google signup logic here
        console.log('Sign up with Google');
>>>>>>> e2c69ec53730cd7d81a7da9b660faed126fb9efe
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
