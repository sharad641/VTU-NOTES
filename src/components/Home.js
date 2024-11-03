import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase'; // Import analytics
import { logEvent } from 'firebase/analytics';
import './Home.css';

const Home = () => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleSchemeClick = (scheme) => {
        setMessage(`The ${scheme} Scheme is currently under development. Please check back later!`);
        setShowMessage(true);

        // Log the event to Firebase Analytics
        logEvent(analytics, 'scheme_click', { scheme_name: scheme }); // Log the scheme click event

        // Clear the message after 5 seconds
        setTimeout(() => {
            setMessage('');
            setShowMessage(false);
        }, 4000);
    };

    return (
        <div className="home-container">
            {/* Logo Display */}
            
            {/* Message/Headline with marquee effect */}
            <div className="headline-message">
                <div className="marquee-text">
                    📢 Latest Updates: New notes for 5th Semester are now available!(Not All) Check them out!
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    "The notes for ECE have not been uploaded yet; work is in progress. Please wait for some time."
                </div>
            </div>
            <div className="vtu-notes-info-box">
                <h2>About VTU Notes</h2>
                <p>
                    VTU-NOTES is your go-to resource for academic success. We offer curated notes, extensive question banks, and important questions to help you excel in your exams. Remember, these VTU notes are handled by students just like you, currently studying at various VTU colleges. Your contributions make a difference!
                </p>
               
            </div>

            {/* Scheme Selection */}
            <div className="scheme-selection-box">
                <h2>Select Scheme For Notes</h2>
                <Link to="/branch-selection/2022" className="scheme-link">2022 Scheme</Link>
                <span 
                    className="scheme-link clickable" 
                    onClick={() => handleSchemeClick('2021')}>
                    2021 Scheme
                </span>
                <span 
                    className="scheme-link clickable" 
                    onClick={() => handleSchemeClick('2018')}>
                    2018 Scheme
                </span>
                
                {showMessage && <p className="info-message">{message}</p>}

                <p>VTU-NOTES is your go-to resource for academic success. We offer curated notes, extensive question banks, and important questions to help you excel in your exams.</p>
                
            </div>

            {/* Upload Notes Link */}
            <div className="upload-notes-box">
                <h2>Upload Your Notes</h2>
                <p>Do you have notes to share? Upload your materials to help fellow students! Take this step to contribute and support others in their studies.</p>
               
                <Link to="/upload" className="upload-link">Upload Notes</Link>
            </div>

            {/* Social Links */}
            <div className="social-links-box">
                <h2>Student Discussion Group Links</h2>
                <div className="social-links-container">
                    <a href="https://www.instagram.com/vtuno_tes/" target="_blank" rel="noopener noreferrer" className="social-link instagram">Instagram</a>
                    <a href="https://t.me/+stUpGmJvk1JkNWE1" target="_blank" rel="noopener noreferrer" className="social-link telegram">Telegram</a>
                    <a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">WhatsApp</a>
                </div>
            </div>

            {/* Contact Box */}
            <div className="contact-box">
                <h2>Contact</h2>
                <p>If you have any questions or need assistance regarding notes, study-related issues, or any other concerns, please don’t hesitate to contact us.</p>
                
                <p>
                    Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a>
                </p>
                <p>
                    Phone:6364 <a href="tel:+916364060716" className="contact-link">+91</a>
                </p>
            </div>
        </div>
    );
};

export default Home;
