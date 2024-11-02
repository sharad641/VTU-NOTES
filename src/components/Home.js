// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Message/Headline with marquee effect */}
            <div className="headline-message">
                <div className="marquee-text">
                    📢 Latest Updates: New notes for 3rd Semester are now available! Check them out! 
                    <span style={{ display: 'block', marginTop: '10px' }}></span> {/* Line break */}
                    📢 Don't miss the webinar on exam preparation this Saturday!
                </div>
            </div>
            <div className="vtu-notes-info-box">
                <h2>About VTU Notes</h2>
                <p>
                   VTU-NOTES is your go-to resource for academic success. We offer curated notes, extensive question banks, and important questions to help you excel in your exams. Currently, we are focusing exclusively on the 2022 scheme. Follow us for more updates!
                </p>
                <p>Let’s work together to create a valuable resource for everyone! Remember, these VTU notes are handled by students just like you, currently studying at various VTU colleges. Your contributions make a difference! </p>
            </div>

            {/* Scheme Selection */}
            <div className="scheme-selection-box">
                <h2>Select Scheme</h2>
                <Link to="/branch-selection/2022" className="scheme-link">2022 Scheme</Link>
                
                <p>VTU-NOTES is your go-to resource for academic success. We offer curated notes, extensive question banks, and important questions to help you excel in your exams. </p>
                <p>Currently, we are focusing exclusively on the 2022 scheme, so be sure to go through it to access all the relevant notes. Follow us for more updates!</p>
            </div>

            {/* Upload Notes Link */}
            <div className="upload-notes-box">
                <h2>Upload Your Notes</h2>
                <p>Do you have notes to share? Upload your materials to help fellow students! Take this step to contribute and support others in their studies.  </p>
                <p>Please ensure that your submissions contain valid notes, whether they are study guides, question papers, or question banks. Let’s work together to create a valuable resource for everyone!</p>
                <Link to="/upload" className="upload-link"> Upload Notes</Link> {/* Updated link to match the route */}
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
    <p>
        Email: <a href="mailto:vtunotes5@gmail.com" className="contact-link">vtunotes5@gmail.com</a>
    </p>
    <p>
        Phone: <a href="tel:+916364060716" className="contact-link">+91 6364060716</a>
    </p>
</div>

        </div>
    );
};

export default Home;
