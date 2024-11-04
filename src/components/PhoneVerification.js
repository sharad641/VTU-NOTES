// src/components/PhoneVerification.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure this path is correct
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './PhoneVerification.css'; // Optional: Add CSS for styling

const PhoneVerification = ({ onVerified }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
                // Recaptcha solved - can proceed with phone number verification
                handleSendVerificationCode();
            },
            defaultCountry: "US" // Change this to your desired default country code
        }, auth);
    };

    const handleSendVerificationCode = async () => {
        setError('');
        setIsVerifying(true);
        setupRecaptcha();

        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(confirmation);
            console.log("SMS sent");
        } catch (error) {
            console.error("Failed to send verification code", error);
            setError("Failed to send verification code. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await confirmationResult.confirm(verificationCode);
            console.log("Phone number verified!");
            onVerified(); // Call the onVerified callback to indicate success
        } catch (error) {
            console.error("Invalid verification code", error);
            setError("Invalid verification code. Please try again.");
        }
    };

    return (
        <div className="phone-verification-container">
            <h2>Phone Verification</h2>
            {error && <p className="error-message">{error}</p>}
            {!confirmationResult ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSendVerificationCode(); }}>
                    <div>
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div id="recaptcha-container"></div>
                    <button type="submit" disabled={isVerifying}>
                        {isVerifying ? 'Sending...' : 'Send Verification Code'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyCode}>
                    <div>
                        <label>Verification Code:</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Verify Code</button>
                </form>
            )}
        </div>
    );
};

export default PhoneVerification;
