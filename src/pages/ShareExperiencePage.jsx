import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, User, Briefcase, BookOpen,
  Target, FileText, Plus, Trash2, Loader2, Sparkles, Wand2,
  Lightbulb, ChevronRight, GraduationCap, MapPin,
  Link2, PlusCircle, X, Upload, Send, CheckSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- FIREBASE IMPORTS ---
import { auth, database } from '../firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

import './PlacementModern.css'; // CHANGED: Modern CSS

// --- Smart Suggestions Data ---
const SUGGESTED_RESOURCES = ["LeetCode", "GeeksforGeeks", "Striver SDE Sheet", "System Design Primer", "NeetCode 150", "InterviewBit", "Glassdoor"];
const SUGGESTED_TECH = ["Java", "C++", "Python", "React.js", "Node.js", "SQL", "AWS", "Docker", "Kubernetes", "Spring Boot"];
const SUGGESTED_TIPS = [
  "Focus on communication skills",
  "Prepare for behavioral questions (STAR method)",
  "Network effectively on LinkedIn",
  "Review core CS fundamentals (OS, DBMS)",
  "Be honest about what you don't know"
];
const SUGGESTED_STUDY = [
  "Master Dynamic Programming and Graphs",
  "Understand OOPS concepts deeply",
  "Build 2-3 strong full-stack projects",
  "Participate in weekly coding contests",
  "Read 'Cracking the Coding Interview'"
];

const ShareExperiencePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  // Helper state for adding links one by one
  const [currentLink, setCurrentLink] = useState({ title: '', url: '' });

  const [formData, setFormData] = useState({
    isAnonymous: false,
    status: 'B.Tech Student', college: '', gradYear: '',
    company: '', role: '', jobType: 'On-Campus',
    location: '', duration: '', ctc: '',
    resources: '', technologies: '',
    rounds: [{ title: '', date: '', description: '' }],
    experience: '', difficulty: 'Medium', offerStatus: 'Selected',
    // New Fields
    placementTips: '',
    studySuggestions: '',
    externalLinks: [] // Stores objects: { title: 'Notes', url: 'drive.google...' }
  });

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleChipAdd = (field, value) => {
    const current = formData[field];
    const currentArray = current.split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
    if (!currentArray.includes(value.toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        [field]: current ? `${current}, ${value}` : value
      }));
    }
  };

  const insertIntoTextarea = (field, text) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] ? `${prev[field]}\n• ${text}` : `• ${text}`
    }));
  };

  // --- Link Management (New Feature) ---
  const handleLinkInput = (e) => {
    const { name, value } = e.target;
    setCurrentLink(prev => ({ ...prev, [name]: value }));
  };

  const addLink = () => {
    if (currentLink.title.trim() && currentLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        externalLinks: [...prev.externalLinks, currentLink]
      }));
      setCurrentLink({ title: '', url: '' }); // Reset inputs
    }
  };

  const removeLink = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, index) => index !== indexToRemove)
    }));
  };

  // --- Round Management ---
  const handleRoundChange = (index, field, value) => {
    const newRounds = [...formData.rounds];
    newRounds[index][field] = value;
    setFormData(prev => ({ ...prev, rounds: newRounds }));
  };
  const addRound = () => setFormData(prev => ({ ...prev, rounds: [...prev.rounds, { title: '', date: '', description: '' }] }));
  const removeRound = (index) => {
    if (formData.rounds.length > 1) {
      setFormData(prev => ({ ...prev, rounds: prev.rounds.filter((_, i) => i !== index) }));
    }
  };

  const insertTemplate = () => {
    const template = "**Round 1 (Online Assessment):**\n\n**Round 2 (Technical):**\n\n**Round 3 (HR):**\n\n";
    setFormData(prev => ({ ...prev, experience: prev.experience + template }));
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth.currentUser) {
      alert("Please login to submit.");
      setLoading(false);
      return;
    }

    if (!formData.company.trim() || !formData.role.trim() || !formData.experience.trim()) {
      alert("Please fill in the required fields (Company, Role, Experience).");
      setLoading(false);
      return;
    }

    try {
      const techArray = formData.technologies.split(',').map(s => s.trim()).filter(s => s);
      const resArray = formData.resources.split(',').map(s => s.trim()).filter(s => s);
      const tipsArray = formData.placementTips.split('\n').map(s => s.replace(/^[•\-\*]\s*/, '').trim()).filter(s => s);
      const studyArray = formData.studySuggestions.split('\n').map(s => s.replace(/^[•\-\*]\s*/, '').trim()).filter(s => s);

      let formattedCTC = formData.ctc;
      if (formattedCTC && !formattedCTC.toLowerCase().includes('lpa') && !isNaN(parseFloat(formattedCTC))) {
        formattedCTC += ' LPA';
      }

      const payload = {
        ...formData,
        ctc: formattedCTC,
        technologies: techArray,
        resources: resArray,
        placementTips: tipsArray,
        studySuggestions: studyArray,
        author: {
          name: formData.isAnonymous ? 'Anonymous' : (auth.currentUser.displayName || "Student"),
          uid: auth.currentUser.uid,
          photoURL: formData.isAnonymous ? null : auth.currentUser.photoURL
        },
        createdAt: serverTimestamp()
      };

      await push(ref(database, 'placement_reviews'), payload);
      setShowSubmitSuccess(true);
      setTimeout(() => navigate('/placement-stories'), 2000);

    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="placement-page-container">
      <div className="placement-background-engine">
        <div className="engine-shape blob-1"></div>
        <div className="engine-shape blob-2"></div>
      </div>

      <div className="placement-content-wrapper" style={{ paddingTop: '40px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.8)', border: 'none', padding: '10px 20px', borderRadius: '100px',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', cursor: 'pointer',
            marginBottom: '30px', backdropFilter: 'blur(10px)'
          }}
        >
          <ArrowLeft size={18} /> Cancel
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-glass-container"
        >
          <div className="form-header-modern">
            <h1>Share Your Story</h1>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>Help juniors by sharing your interview experience</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><User className="text-accent" /> Personal Info</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="modern-input-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="modern-input">
                    <option>B.Tech Student</option><option>Alumni</option>
                  </select>
                </div>
                <div className="modern-input-group">
                  <label>Grad Year</label>
                  <input name="gradYear" value={formData.gradYear} onChange={handleChange} className="modern-input" placeholder="2025" />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '600' }}>
                <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} />
                Post Anonymously
              </label>
            </div>

            {/* Job Info */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Briefcase className="text-accent" /> Job Details</h3>
              <div className="modern-input-group">
                <label>Company *</label>
                <input name="company" value={formData.company} onChange={handleChange} className="modern-input" required placeholder="e.g. Google" />
              </div>
              <div className="modern-input-group">
                <label>Role *</label>
                <input name="role" value={formData.role} onChange={handleChange} className="modern-input" required placeholder="e.g. SDE Intern" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="modern-input-group">
                  <label>CTC</label>
                  <input name="ctc" value={formData.ctc} onChange={handleChange} className="modern-input" placeholder="e.g. 12 LPA" />
                </div>
                <div className="modern-input-group">
                  <label>Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="modern-input" placeholder="e.g. Bangalore" />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FileText className="text-accent" /> Experience</h3>
              <div className="modern-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label>Your Journey</label>
                  <button type="button" onClick={insertTemplate} style={{ background: 'none', border: 'none', color: 'var(--pm-accent)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Wand2 size={14} /> Use Template</button>
                </div>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="modern-input"
                  style={{ minHeight: '200px', resize: 'vertical' }}
                  required
                  placeholder="Describe your interview process, difficulty, and experience..."
                />
              </div>

              {/* Rounds */}
              <div>
                <label style={{ fontWeight: '700', display: 'block', marginBottom: '10px' }}>Interview Rounds</label>
                {formData.rounds.map((round, index) => (
                  <div key={index} style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '600' }}>Round {index + 1}</span>
                      {formData.rounds.length > 1 && <button type="button" onClick={() => removeRound(index)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}><Trash2 size={16} /></button>}
                    </div>
                    <input
                      placeholder="Round Title (e.g. Coding Round)"
                      value={round.title}
                      onChange={e => handleRoundChange(index, 'title', e.target.value)}
                      className="modern-input"
                      style={{ marginBottom: '10px' }}
                    />
                    <textarea
                      placeholder="Description of the round..."
                      value={round.description}
                      onChange={e => handleRoundChange(index, 'description', e.target.value)}
                      className="modern-input"
                      style={{ minHeight: '80px' }}
                    />
                  </div>
                ))}
                <button type="button" onClick={addRound} style={{ background: 'none', border: '1px dashed var(--pm-accent)', color: 'var(--pm-accent)', padding: '10px', width: '100%', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}>+ Add Round</button>
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{ background: 'transparent', border: 'none', padding: '12px 24px', fontSize: '1rem', fontWeight: '600', color: 'var(--text-gray)', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg, var(--pm-accent), #EC4899)',
                  color: 'white', border: 'none', padding: '12px 32px', borderRadius: '12px',
                  fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                  boxShadow: '0 10px 20px var(--pm-accent-glow)',
                  display: 'flex', alignItems: 'center', gap: '10px'
                }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                Publish Story
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ShareExperiencePage;