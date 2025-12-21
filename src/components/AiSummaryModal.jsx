import React, { useState, useEffect } from "react";
import { FaMagic, FaTimes, FaCopy, FaRobot, FaLightbulb, FaCheck, FaRedo } from "react-icons/fa";
import "./AiSummaryModal.css";

const AiSummaryModal = ({ isOpen, onClose, fileName }) => {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [tag, setTag] = useState("General");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setCopied(false);
      determineCategory(fileName);
      
      // Simulate AI "Thinking" time (1.5 seconds)
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fileName]);

  // Mock logic to categorize document based on name
  const determineCategory = (name) => {
    const n = (name || "").toLowerCase();
    if (n.includes("report") || n.includes("finance")) setTag("Finance");
    else if (n.includes("code") || n.includes("tech") || n.includes("java")) setTag("Technical");
    else if (n.includes("guide") || n.includes("manual")) setTag("Instructional");
    else setTag("General Reading");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`AI Summary for ${fileName}: \n- Key Insight 1\n- Key Insight 2`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-backdrop" onClick={onClose}>
      <div className="ai-card" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="ai-header">
          <div className="ai-title">
            <div className="ai-icon-box">
              <FaMagic className="magic-icon" />
            </div>
            <div>
              <h3>AI Insights</h3>
              <span className="ai-badge">{tag}</span>
            </div>
          </div>
          <button onClick={onClose} className="ai-close-btn">
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <div className="ai-body">
          {loading ? (
            <div className="ai-skeleton-wrapper">
              <p className="ai-status-text">Analyzing <strong>{fileName}</strong>...</p>
              <div className="sk-line w-100"></div>
              <div className="sk-line w-90"></div>
              <div className="sk-line w-70"></div>
              <div className="sk-block"></div>
            </div>
          ) : (
            <div className="ai-results fade-in-up">
              
              {/* Quick Summary Section */}
              <div className="ai-section">
                <h4><FaRobot /> Executive Summary</h4>
                <p className="ai-text">
                  This document appears to be a <strong>{tag}</strong> resource. 
                  It covers core concepts regarding <em>{fileName}</em>, focusing on 
                  structural implementation and best practices.
                </p>
              </div>

              {/* Key Takeaways Section */}
              <div className="ai-section highlight-box">
                <h4><FaLightbulb /> Key Takeaways</h4>
                <ul className="ai-list">
                  <li>Overview of primary objectives and goals.</li>
                  <li>Detailed breakdown of methodology.</li>
                  <li>Critical data points and conclusion metrics.</li>
                </ul>
              </div>

            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="ai-footer">
          <button className="ai-secondary-btn" onClick={() => setLoading(true)}>
            <FaRedo /> Regenerate
          </button>
          <button className={`ai-primary-btn ${copied ? "success" : ""}`} onClick={handleCopy}>
            {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy Summary</>}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AiSummaryModal;