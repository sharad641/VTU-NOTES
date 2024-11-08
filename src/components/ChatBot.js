// src/Chatbot.js

import React, { useState } from 'react';
import './ChatBot.css';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Hi there! How can I help you today?', sender: 'bot' }
    ]);

    const handleSendMessage = () => {
        if (userInput.trim()) {
            // Add the user message
            setMessages([...messages, { text: userInput, sender: 'user' }]);

            // Simulate a bot response
            setTimeout(() => {
                const botResponse = 'I am still learning. How can I assist you with VTU Notes?';
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botResponse, sender: 'bot' }
                ]);
            }, 1000);

            // Clear the user input
            setUserInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>Chat with Us!</h2>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chatbot-input-container">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
