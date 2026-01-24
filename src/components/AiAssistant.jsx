import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaPaperPlane, FaRobot, FaTimes, FaPaperclip, FaEraser, FaStop } from "react-icons/fa";

// IMPORT THE UTILS WE MADE IN STEP 2
import { extractTextFromLocalFile, extractTextFromPDF } from "./pdfUtils";
import "./AiAssistant.css"; // Ensure you have the CSS file from the previous response

const AiAssistant = ({ isOpen, onClose, pdfUrl }) => {
  // 1. SETUP API KEY
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfText, setPdfText] = useState(""); // Stores the document text
  const [status, setStatus] = useState("idle");

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 2. INITIALIZE PDF (If URL provided)
  useEffect(() => {
    if (isOpen && pdfUrl && !pdfText) {
      setStatus("loading");
      setMessages([{ role: "system", content: "🔍 **Reading Document...**" }]);
      
      extractTextFromPDF(pdfUrl).then(result => {
        if(result.success) {
          setPdfText(result.text);
          setStatus("ready");
          setMessages(prev => [...prev, { role: "system", content: "✅ **Ready!** I have read the document. Ask me questions." }]);
        } else {
          setStatus("error");
          setMessages(prev => [...prev, { role: "system", content: "❌ **Error:** Could not read PDF. Try uploading it manually." }]);
        }
      });
    }
  }, [isOpen, pdfUrl]);

  // 3. SEND MESSAGE TO AI
  const handleSend = async () => {
    if (!input.trim()) return;
    if (!API_KEY) {
      alert("Please set REACT_APP_GEMINI_API_KEY in your .env file");
      return;
    }

    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Construct Prompt
      const prompt = `
        You are a helpful AI assistant.
        
        CONTEXT (The Document Content):
        "${pdfText ? pdfText.substring(0, 30000) : "No document loaded."}"
        
        USER QUESTION: "${userMessage}"
        
        INSTRUCTIONS:
        - Answer based on the CONTEXT provided above.
        - If the answer isn't in the context, say so.
        - Use Markdown (bold, lists) for clarity.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: "ai", content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "system", content: `❌ Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  // 4. HANDLE MANUAL UPLOAD
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: "system", content: `📂 **Processing:** ${file.name}...` }]);

    const result = await extractTextFromLocalFile(file);
    
    if (result.success) {
      setPdfText(result.text);
      setMessages(prev => [...prev, { role: "system", content: "✅ **Success!** File loaded." }]);
    } else {
      setMessages(prev => [...prev, { role: "system", content: "❌ **Failed** to read file." }]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-backdrop">
      <div className="ai-window">
        {/* SIDEBAR */}
        <div className="ai-sidebar">
           <div className="sidebar-header">AI ASSISTANT</div>
           <div className="sidebar-content">
             <button className="sidebar-btn" onClick={() => setMessages([])}><FaEraser /> New Chat</button>
             <button className="sidebar-btn" onClick={() => fileInputRef.current.click()}><FaPaperclip /> Upload PDF</button>
             
             <div style={{ marginTop: 20 }}>
               <h4>Try Asking:</h4>
               <button className="sidebar-btn" onClick={() => { setInput("Summarize this"); handleSend(); }}>Summarize</button>
               <button className="sidebar-btn" onClick={() => { setInput("Key Takeaways"); handleSend(); }}>Key Points</button>
             </div>
           </div>
        </div>

        {/* MAIN CHAT */}
        <div className="ai-main">
          <div className="chat-header">
             <div className="header-brand"><FaRobot /> Chat</div>
             <button className="icon-btn" onClick={onClose}><FaTimes /></button>
          </div>

          <div className="chat-viewport">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-row ${msg.role}`}>
                <div className="msg-bubble">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && <div className="msg-row ai"><div className="msg-bubble">Thinking...</div></div>}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-zone">
            <div className="input-pill">
              <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} accept="application/pdf" />
              <button className="icon-btn" onClick={() => fileInputRef.current.click()}><FaPaperclip /></button>
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the document..."
              />
              <button className="send-btn active" onClick={handleSend}><FaPaperPlane /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;