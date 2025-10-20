// src/components/ProjectEnquiry.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import { ref, push, set, onValue, off, get } from 'firebase/database';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FaLaptopCode, FaRobot, FaMicrochip, FaLightbulb, 
  FaCheckCircle, FaSpinner, FaStar 
} from 'react-icons/fa';
import ProjectReviews from './ProjectReviews';
import './ProjectEnquiry.css';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const ProjectEnquiry = () => {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState('');
  const [ideaSuggestion, setIdeaSuggestion] = useState('');
  const [aiIdeas, setAiIdeas] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [submittedProjects, setSubmittedProjects] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [allProjects, setAllProjects] = useState({}); // Admin sees all projects

  const projectTypes = [
    { icon: <FaLaptopCode size={40} />, title: 'Fullstack', desc: 'Web & mobile apps with React, Node.js, MongoDB.', color: '#3b82f6' },
    { icon: <FaRobot size={40} />, title: 'ML / AI', desc: 'Machine Learning & AI projects using Python & TensorFlow.', color: '#2563eb' },
    { icon: <FaMicrochip size={40} />, title: 'IoT', desc: 'Smart devices & automation using ESP32, Arduino.', color: '#1e40af' },
    { icon: <FaLightbulb size={40} />, title: 'Other', desc: 'Custom innovative or research projects.', color: '#60a5fa' },
  ];

  // Input change handler
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Suggest ideas based on project type
  useEffect(() => {
    const suggestions = {
      Fullstack: '💡 VTU Notes Portal, Portfolio Website, Student Management System.',
      'ML / AI': '🤖 Chatbot Assistant, Image Recognition Tool, Fake News Detector.',
      IoT: '🔌 Smart Irrigation, Air Quality Monitor, Home Automation.',
      Other: '✨ Custom innovative or research-based projects.',
    };
    setIdeaSuggestion(suggestions[formData.projectType] || '');
  }, [formData.projectType]);

  // Check admin privileges
  useEffect(() => {
    if (auth.currentUser) {
      const adminUIDs = ['ADMIN_UID_1', 'ADMIN_UID_2']; // Replace with actual admin UIDs
      setIsAdmin(adminUIDs.includes(auth.currentUser.uid));
    }
  }, []);

  // Fetch user projects or all projects for admin
  useEffect(() => {
    if (!auth.currentUser) return;
    if (isAdmin) {
      const rootRef = ref(database, 'project_enquiries');
      onValue(rootRef, snapshot => setAllProjects(snapshot.val() || {}));
      return () => off(rootRef);
    } else {
      const userRef = ref(database, `project_enquiries/${auth.currentUser.uid}`);
      onValue(userRef, snapshot => setSubmittedProjects(snapshot.val() || {}));
      return () => off(userRef);
    }
  }, [isAdmin]);

  // Submit project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, projectType } = formData;
    if (!name || !email || !projectType) return alert('⚠️ Fill all required fields.');
    if (!auth.currentUser) return alert('❌ Login required to submit.');

    setLoading(true);
    try {
      const projectRef = push(ref(database, `project_enquiries/${auth.currentUser.uid}`));
      await set(projectRef, {
        ...formData,
        steps: { step1: false, step2: false, step3: false },
        timestamp: Date.now(),
      });
      setSuccess('✅ Project request submitted successfully!');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setAiIdeas([]);
      setFavorites([]);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate AI suggestions
  const generateAiIdeas = async () => {
    if (!formData.projectType) return;
    setGenerating(true);
    try {
      const prompt = `Suggest 3 practical ${formData.projectType} project ideas with a 3-step plan.${formData.message ? ` User interest: ${formData.message}` : ''}`;
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY } }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const ideas = text.split('\n')
        .filter(line => line.trim().match(/^[\d•-]/))
        .map(line => ({ text: line.replace(/^[\d•-]+\s*/, ''), favorite: false }));

      setAiIdeas(ideas.length ? ideas : [{ text: '💡 Fallback: Portfolio Website, Student Management System.', favorite: false }]);
    } catch (err) {
      console.error(err);
      setAiIdeas([{ text: '💡 Fallback: Portfolio Website, Student Management System.', favorite: false }]);
    } finally {
      setGenerating(false);
    }
  };

  const toggleFavorite = (index) => {
    setAiIdeas(prev => {
      const updated = [...prev];
      updated[index].favorite = !updated[index].favorite;
      setFavorites(updated.filter(i => i.favorite));
      return updated;
    });
  };

  // Admin toggling steps
  const toggleStep = async (userId, projectId, step) => {
    if (!isAdmin) return;

    const projectRef = ref(database, `project_enquiries/${userId}/${projectId}/steps`);
    const snapshot = await get(projectRef);
    const steps = snapshot.val() || {};
    const newSteps = { step1: false, step2: false, step3: false };

    if (step === 'step1') newSteps.step1 = true;
    if (step === 'step2') newSteps.step1 = true; newSteps.step2 = true;
    if (step === 'step3') newSteps.step1 = true; newSteps.step2 = true; newSteps.step3 = true;

    await set(projectRef, newSteps);
  };

  // Render projects (user or admin)
  const renderProjects = (projectsData, userKey = null) => {
    return Object.entries(projectsData).map(([projId, proj]) => {
      const completedSteps = Object.values(proj.steps).filter(Boolean).length;
      const progressWidth = (completedSteps / 3) * 100;
      const userId = userKey || auth.currentUser.uid;

      return (
        <motion.div key={projId} className="project-card" whileHover={{ scale: 1.03 }}>
          <h3>{proj.projectType} Project</h3>
          <p>{proj.message}</p>
          <div className="progress-bar-container">
            <div className="progress-line">
              <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
              {['step1', 'step2', 'step3'].map((step, idx) => (
                <div
                  key={step}
                  className={`progress-step ${proj.steps[step] ? 'active' : ''} ${isAdmin ? 'admin' : 'locked'}`}
                  onClick={() => isAdmin && toggleStep(userId, projId, step)}
                >
                  {proj.steps[step] ? <FaCheckCircle /> : idx + 1}
                </div>
              ))}
            </div>
          </div>
          <small>{new Date(proj.timestamp).toLocaleString()}</small>
        </motion.div>
      );
    });
  };

  return (
    <section className="project-enquiry-section">
      {/* Hero */}
      <motion.div className="project-hero" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1>🚀 Start Your Project Journey</h1>
        <p>Submit your project request in <span>Fullstack</span>, <span>ML/AI</span>, or <span>IoT</span>. Track progress & get AI guidance.</p>
      </motion.div>

      {/* Project Types */}
      <div className="project-types">
        {projectTypes.map((type, idx) => (
          <motion.div key={idx} className="project-type-card" style={{ borderTop: `4px solid ${type.color}` }} whileHover={{ scale: 1.05 }}>
            <div className="icon-wrapper" style={{ color: type.color }}>{type.icon}</div>
            <h3>{type.title}</h3>
            <p>{type.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Idea Suggestion */}
      {ideaSuggestion && <motion.div className="idea-suggestion" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p>{ideaSuggestion}</p></motion.div>}

      {/* Form */}
      <motion.div className="project-enquiry-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {success && <p className="success-msg"><FaCheckCircle /> {success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
          <select name="projectType" value={formData.projectType} onChange={handleChange} required>
            <option value="">Select Project Type</option>
            {projectTypes.map(type => <option key={type.title} value={type.title}>{type.title}</option>)}
          </select>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your project..." maxLength={400} />

          {formData.projectType && (
            <motion.button type="button" onClick={generateAiIdeas} className="generate-btn" whileHover={{ scale: 1.05 }} disabled={generating}>
              {generating ? <FaSpinner className="spin" /> : '✨ Generate AI Ideas'}
            </motion.button>
          )}

          <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.05 }} disabled={loading}>
            {loading ? <FaSpinner className="spin" /> : '🚀 Submit Request →'}
          </motion.button>
        </form>
      </motion.div>

      {/* AI Ideas */}
      {aiIdeas.length > 0 && (
        <motion.div className="ai-ideas" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>💡 AI-Suggested Ideas</h3>
          <ul>
            {aiIdeas.map((idea, idx) => (
              <li key={idx} className="idea-card">
                {idea.text}
                <span onClick={() => toggleFavorite(idx)} className="favorite-icon">
                  <FaStar color={idea.favorite ? '#facc15' : '#cbd5e1'} />
                </span>
              </li>
            ))}
          </ul>
          {favorites.length > 0 && (
            <div className="favorites-section">
              <h4>⭐ Favorites</h4>
              <ul>{favorites.map((fav, idx) => <li key={idx}>{fav.text}</li>)}</ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Submitted Projects */}
      <div className="submitted-projects">
        <h2>📋 {isAdmin ? 'All User Projects' : 'Your Projects'}</h2>
        {isAdmin
          ? Object.keys(allProjects).length === 0
            ? <p>No projects submitted yet.</p>
            : Object.entries(allProjects).map(([userId, projects]) => (
                <div key={userId}>
                  <h4>User: {userId}</h4>
                  <div className="projects-grid">{renderProjects(projects, userId)}</div>
                </div>
              ))
          : Object.keys(submittedProjects).length === 0
            ? <p>No projects submitted yet.</p>
            : <div className="projects-grid">{renderProjects(submittedProjects)}</div>
        }
      </div>
      {/* --- Contact Info Section --- */}
{/* --- WhatsApp Contact Section --- */}
<div className="contact-info">
  <h4>📱 WhatsApp Contact</h4>
  <p>
    <a 
      href="https://wa.me/917338023261" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: '#25D366', fontWeight: 'bold' }}
    >
      Chat on WhatsApp: +91 7338023261
    </a> (Messages only, no calls)
  </p>
</div>


      <ProjectReviews />
    </section>
    
  );
};

export default ProjectEnquiry;
