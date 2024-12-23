// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

import './Home.css';
import ChatBot from './ChatBot'; // Importing the ChatBot component

const Home = () => {
    const [message, setMessage] = useState('');  // For displaying messages about scheme availability
    const [showMessage, setShowMessage] = useState(false); // To show/hide the message
    const [showChatbot, setShowChatbot] = useState(false); // To toggle the visibility of the ChatBot

    // Handle Scheme Click
    const handleSchemeClick = (scheme) => {
        // Log the scheme selection event
        logEvent(analytics, 'scheme_click', { scheme_name: scheme });

        // Hide the message after 4 seconds
        setTimeout(() => {
            setMessage('');
            setShowMessage(false);
        }, 4000);
    };

    // Toggle the visibility of the chatbot
    const toggleChatbot = () => setShowChatbot(!showChatbot);

    return (
        <div className="home-container">
            {/* Headline with marquee effect */}
            <div className="headline-message">
                <div className="marquee-text">
                    A new feature has been added for placement test login. Please review it.
                    <span> "The notes for ECE have not been uploaded yet; work is in progress. Please wait for some time."</span>
                </div>
            </div>

            {/* VTU Notes Info Box */}
            <section className="vtu-notes-info-box">
                <h2>About VTU Notes</h2>
                <p>VTU-NOTES is your go-to resource for academic success! We offer curated notes, question banks, and essential questions to help you excel in your exams.</p>
            </section>

            {/* Placement Preparation Link */}
            <section className="news-box">
                <h2>Placement Preparation Guide & Internship Opportunities</h2>
                <Link to="/placement-guide" className="button">👉 Placement & Internship Guide</Link>
                <div className="test-link-container">
                    <Link to="/test" className="test-link-button">Take the Practice Test</Link>
                </div>
            </section>

            {/* Scheme Selection */}
            <section className="scheme-selection-box">
                <h2>Select Scheme For Notes</h2>
                <Link to="/branch-selection/2022" className="scheme-link">2022 Scheme</Link>
                <span className="scheme-link clickable" onClick={() => handleSchemeClick('2021')}>2021 Scheme</span>
                <span className="scheme-link clickable" onClick={() => handleSchemeClick('2018')}>2018 Scheme</span>
                {showMessage && <p className="info-message">{message}</p>}
            </section>

            {/* SGPA Calculator */}
            <section className="calculator-box">
                <h2>VTU Calculators</h2>
                <p>Need help calculating your SGPA or CGPA? Use our calculator for accurate results!</p>
                <Link to="/calculator" className="calculator-link">Go to SGPA Calculator</Link>
            </section>

           

            {/* Upload Notes */}
            <section className="upload-notes-box">
                <h2>Upload Your Notes</h2>
                <p>Have notes that could help other students? Share your materials and contribute to our growing library!</p>
                <Link to="/upload" className="upload-link">Upload Notes</Link>
            </section>

            {/* FAQs Section */}
            <section className="faq-box">
                <h2>Frequently Asked Questions (FAQs)</h2>
                <p>If you have questions about your courses, exams, or related topics, check out our FAQs for answers!</p>
                <Link to="/faqs" className="faq-link">Go to FAQs</Link>
            </section>
             {/* Study Planner Link */}
             <section className="study-planner-box">
                <h2>Study Planner</h2>
                <p>Organize your studies efficiently with our Study Planner. Track your tasks and stay ahead!</p>
                <Link to="/study-planner" className="study-planner-link">Go to Study Planner</Link>
            </section>

            {/* Chatbot Toggle */}
            <div className="chatbot-button-container">
                <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
                    {showChatbot ? 'Hide Chatbot' : 'Chat with Us!'}
                </button>
            </div>

            {/* Conditionally render the ChatBot component */}
            {showChatbot && <ChatBot />}

            {/* Contact Box */}
            <section className="contact-box">
                <h2>Contact</h2>
                <p>If you have questions or need assistance with notes, please reach out to us. We’re here to help!</p>
                <p>Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a></p>
                <p>Phone: <a href="tel:+916364060716" className="contact-link">+91 6364060716</a></p>
                <ul className="follow-us-list1">
                    <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 1</a></li>
                    <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 2</a></li>
                </ul>
            </section>

            {/* Discussion Section */}
            <section className="discussion-section">
                <h2>Share Your Thoughts</h2>
                <p>
                    Be a part of the conversation! Share your insights, ask questions, or provide feedback to engage with the community.
                </p>
                <Link to="/comments" className="discussion-button">
                    Explore Discussions
                </Link>
            </section>
        </div>
    );
};

export default Home;
