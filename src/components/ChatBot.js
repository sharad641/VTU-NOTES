// src/components/ChatBot.js

import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    
    const handleSend = async () => {
        if (input.trim() === '') return;
        
        // User's message
        const userMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        // Clear the input field
        setInput('');
        
        try {
            const response = await fetch('https://your-backend-url.com/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input })
            });
            const data = await response.json();
            
            const botMessage = { text: data.reply, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching the response: ", error);
        }
    };

    return (
        <div className="chatbot-container">
            <h2>Chat with Us</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
