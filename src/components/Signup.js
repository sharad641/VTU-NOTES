import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', email);
            alert('Signup successful!');
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error signing up:', err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User signed up with Google:', result.user);
            alert('Signup with Google successful!');
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error signing up with Google:', err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <button
                className="google-signup"
                onClick={handleGoogleSignup}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Signing Up with Google...' : 'Sign Up with Google'}
            </button>
        </div>
    );
};

export default Signup;
