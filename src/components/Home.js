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

            {/* Scheme Selection */}
            <div className="scheme-selection-box">
                <h2>Select Scheme</h2>
                <Link to="/branch-selection/2022" className="scheme-link">2022 Scheme</Link>
                <p>VTU-NOTES is your go-to resource for academic success. We offer curated notes, extensive question banks, and important questions to help you excel in your exams.</p>
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
                <h2>Contact </h2>
                <p>Email: sharadpatilrocks42@gmail.com</p>
                <p>Phone: +91 6364060716</p>
            </div>
        </div>
    );
};

export default Home;
