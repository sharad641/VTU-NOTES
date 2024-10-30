import React, { useState } from 'react';
import { auth } from '../firebase'; // Adjust the path based on your structure
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setIsSubmitting(true); // Set loading state

        try {
            // Create a new user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', email);
            alert('Signup successful!'); // Optional: Notify the user
        } catch (err) {
            setError(`Error: ${err.message}`); // Set error message
            console.error('Error signing up:', err.message);
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        setIsSubmitting(true); // Set loading state
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            console.log('User signed up with Google:', result.user);
            alert('Signup with Google successful!'); // Optional: Notify the user
        } catch (err) {
            setError(`Error: ${err.message}`); // Set error message
            console.error('Error signing up with Google:', err.message);
        } finally {
            setIsSubmitting(false); // Reset loading state
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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <button className="google-signup" onClick={handleGoogleSignup} disabled={isSubmitting}>
                {isSubmitting ? 'Signing Up with Google...' : 'Sign Up with Google'}
            </button>
        </div>
    );
};

export default Signup;
