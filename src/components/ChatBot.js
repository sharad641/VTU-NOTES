import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faTimes, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messageEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll to bottom whenever new message comes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message to API
  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setTyping(true);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 
      if (!apiKey) throw new Error('API Key is missing');

      const model = 'gemini-2.0-flash';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage.text }] }]
          })
        }
      );

      if (!response.ok) {
        const errorText = response.status === 429
          ? 'Too many requests. Please try again later.'
          : response.status === 400
          ? 'Bad request. Please refine your query.'
          : `Server error: ${response.status}`;
        throw new Error(errorText);
      }

      const data = await response.json();
      const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || '🤖 I couldn’t process that.';
      const botMessage = { text: botResponse, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { text: `⚠️ Error: ${error.message}`, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Voice Input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice input.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.onerror = () => alert('Voice recognition error.');
      recognitionRef.current = recognition;
    }
    recognitionRef.current.start();
  };

  if (!isVisible) return null;

  return (
    <div className={`chatbot-container ${isFullscreen ? 'fullscreen' : ''}`} data-theme="light">
      <div className="chatbot-header">
        <h2>💬 SmartSaver ChatBot</h2>
        <div className="chatbot-controls">
          <button className="fullscreen-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{msg.text}</ReactMarkdown>
            </div>
            <div className="timestamp">{msg.timestamp}</div>
          </div>
        ))}
        {typing && (
          <div className="message bot">
            <div className="message-text">
              <span className="typing-indicator"><span></span><span></span><span></span></span> Typing...
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={loading}
        />
        <button className="mic-btn" onClick={handleVoiceInput} title="Voice Input">
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button className="send-btn" onClick={handleSend} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
