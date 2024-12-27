import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState(''); // State for user input
  const [messages, setMessages] = useState([]); // State for chat messages
  const [isVisible, setIsVisible] = useState(true); // State to toggle chatbot visibility

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput(''); // Clear input field

    try {
      // Make sure the API key is present
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyCg_8qBmih5Z_kT9DwRS8QYBrz9yrXXP9M';
      if (!apiKey) {
        throw new Error('API key is missing.');
      }

      // Send the request to the Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!botResponse) {
        throw new Error('Invalid response from Gemini API');
      }

      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching the response:', error);

      const botMessage = {
        text: `Sorry, there was an error processing your request: ${error.message}. Please try again later.`,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  if (!isVisible) return null; // Don't render the chatbot if it's not visible

  return (
    <div className="chatbot-container">
      <div className="chatbot-close" onClick={() => setIsVisible(false)}>
        ×
      </div>
      <h2>Chat with Us</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
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
