import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Signup successful!');
            navigate('/login'); // Redirect to login page
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
            <div className="redirect-to-login">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default Signup;
