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
                    📢 Latest Updates: New notes for the 5th Semester are now available! (Not all) Check them out!
                    <span style={{ display: 'block', marginTop: '10px' }}></span>
                    "The notes for ECE have not been uploaded yet; work is in progress. Please wait for some time."
                </div>
            </div>
            

            <div className="vtu-notes-info-box">
                <h2>About VTU Notes</h2>
                <p>
                VTU-NOTES is your go-to resource for academic success! We offer curated notes, extensive question banks, and essential questions to help you excel in your exams.
                </p>
            </div>
            <div className="news-box">
             <h2>Placement Preparation Guide & Internship Opportunities link </h2>
             <div className="link-button">
           {/* Link to the Placement Guide component */}
               <Link to="/placement-guide" className="button">👉 Placement & Internship Guide</Link>
      </div>
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

                <p>VTU-NOTES serves as your trusted guide through academic challenges. Explore our extensive offerings to find the notes you need for success in your studies.</p>
            </div>
            

            {/* SGPA Calculator Link */}
            <div className="calculator-box">
                <h2>VTU Calculators</h2>
                <p>Need help calculating your SGPA, CGPA? Use our calculator for accurate results!</p>
                <Link to="/calculator" className="calculator-link">Go to SGPA Calculator</Link>
            </div>

            {/* News and Internship Opportunities */}
           

            {/* Upload Notes Link */}
            <div className="upload-notes-box">
                <h2>Upload Your Notes</h2>
                <p>Do you have notes that can assist fellow students? Share your materials and contribute to our growing resource library! </p>
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
           
            <div className="faq-box">
    <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions (FAQs)</h2>
        <p className="faq-description">If you have any questions regarding your courses, exams, or other related topics, feel free to explore our FAQs for comprehensive and detailed answers!</p>
        <Link to="/faqs" className="faq-link">Go to FAQs</Link>
    </div>
</div>



            {/* Contact Box */}
            <div className="contact-box">
                <h2>Contact</h2>
                <p>If you have any questions or require assistance regarding notes, please don’t hesitate to reach out to us. We are here to help you succeed!</p>
                <p>
                    Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a>
                </p>
                <p>
                    Phone: <a href="tel:+916364060716" className="contact-link">+91 </a>
                </p>
            </div>
        </div>
    );
};

export default Home;
