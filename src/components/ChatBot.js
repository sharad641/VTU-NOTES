import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState('');   // Define state variables
  const [messages, setMessages] = useState([]);  // Define state for messages

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setInput('');  // Clear input field after sending message

    try {
      const response = await fetch('https://api.gemini.com/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY', // Replace with actual API key
        },
        body: JSON.stringify({ prompt: input })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('No response from Gemini API');
      }

      const botMessage = { text: data.response, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error fetching the response: ", error);

      const botMessage = { text: "Sorry, there was an error processing your request. Please try again later.", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
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

export default ChatBot;  // Ensure it's being exported
