import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, User, Briefcase,
  Target, FileText, Trash2, Loader2, Wand2,
  Send, ExternalLink, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- FIREBASE IMPORTS ---
import { auth, database } from '../firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

import './PlacementModern.css';

const ShareExperiencePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  // --- Link Management ---
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
      // Clean up legacy fields processing if they are empty
      const techArray = formData.technologies ? formData.technologies.split(',').map(s => s.trim()).filter(s => s) : [];
      const resArray = formData.resources ? formData.resources.split(',').map(s => s.trim()).filter(s => s) : [];
      // Fix regex warning: unescaped * is fine in []
      const tipsArray = formData.placementTips ? formData.placementTips.split('\n').map(s => s.replace(/^[•\-*]\s*/, '').trim()).filter(s => s) : [];
      const studyArray = formData.studySuggestions ? formData.studySuggestions.split('\n').map(s => s.replace(/^[•\-*]\s*/, '').trim()).filter(s => s) : [];

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
    <div className="placement-page-container share-story-container">
      <div className="placement-background-engine">
        <div className="engine-shape blob-1"></div>
        <div className="engine-shape blob-2"></div>
      </div>

      <div className="placement-content-wrapper">
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost"
          style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} /> Back to Stories
        </button>

        <div className="share-header-section">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Share Your Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your experience can guide thousands of juniors. Help build the community knowledge base.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card-form"
        >
          <form onSubmit={handleSubmit}>

            {/* --- Personal Info Section --- */}
            <div style={{ marginBottom: '50px' }}>
              <div className="form-section-title">
                <User size={24} /> <span>Personal Info</span>
              </div>
              <div className="form-grid-2">
                <div className="modern-input-group">
                  <label>Current Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="modern-input">
                    <option>B.Tech Student</option>
                    <option>Alumni</option>
                  </select>
                </div>
                <div className="modern-input-group">
                  <label>Passout Year</label>
                  <input name="gradYear" value={formData.gradYear} onChange={handleChange} className="modern-input" placeholder="e.g. 2025" />
                </div>
              </div>
              <label className="modern-checkbox-label">
                <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} />
                <span>Post Anonymously (Hide my name and photo)</span>
              </label>
            </div>

            {/* --- Job Details Section --- */}
            <div style={{ marginBottom: '50px' }}>
              <div className="form-section-title">
                <Briefcase size={24} /> <span>Role & Company</span>
              </div>

              <div className="form-grid-2">
                <div className="modern-input-group">
                  <label>Company Name *</label>
                  <input name="company" value={formData.company} onChange={handleChange} className="modern-input" required placeholder="e.g. Google" />
                </div>
                <div className="modern-input-group">
                  <label>Role / Position *</label>
                  <input name="role" value={formData.role} onChange={handleChange} className="modern-input" required placeholder="e.g. SDE Intern" />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="modern-input-group">
                  <label>CTC Offered</label>
                  <input name="ctc" value={formData.ctc} onChange={handleChange} className="modern-input" placeholder="e.g. 24 LPA" />
                </div>
                <div className="modern-input-group">
                  <label>Work Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="modern-input" placeholder="e.g. Bangalore" />
                </div>
                <div className="modern-input-group">
                  <label>Opportunity Type</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange} className="modern-input">
                    <option>On-Campus</option>
                    <option>Off-Campus</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
            </div>

            {/* --- Outcome Analysis --- */}
            <div style={{ marginBottom: '50px' }}>
              <div className="form-section-title">
                <Target size={24} /> <span>Process Analysis</span>
              </div>
              <div className="form-grid-2">
                <div className="modern-input-group">
                  <label>Perceived Difficulty</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="modern-input">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div className="modern-input-group">
                  <label>Final Verdict</label>
                  <select name="offerStatus" value={formData.offerStatus} onChange={handleChange} className="modern-input">
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* --- Experience & Rounds --- */}
            <div style={{ marginBottom: '50px' }}>
              <div className="form-section-title">
                <FileText size={24} /> <span>Detailed Experience</span>
              </div>

              <div className="modern-input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label>Overall Experience Summary *</label>
                  <button type="button" onClick={insertTemplate} className="btn-ghost" style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Wand2 size={14} /> Auto-fill Template
                  </button>
                </div>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="modern-input"
                  style={{ minHeight: '180px', resize: 'vertical', lineHeight: '1.6' }}
                  required
                  placeholder="Share a comprehensive summary of your interview experience. What did they ask? How did you approach the problems?"
                />
              </div>

              <div style={{ marginTop: '30px' }}>
                <label style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '16px', display: 'block', color: 'white' }}>Interview Rounds Breakdown</label>
                {formData.rounds.map((round, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="round-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-neon)' }}>Round {index + 1}</span>
                      {formData.rounds.length > 1 && (
                        <button type="button" onClick={() => removeRound(index)} className="delete-btn-icon">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <input
                      placeholder="Round Title (e.g. 'Coding Round 1', 'System Design')"
                      value={round.title}
                      onChange={e => handleRoundChange(index, 'title', e.target.value)}
                      className="modern-input"
                      style={{ marginBottom: '12px' }}
                    />
                    <textarea
                      placeholder="Describe the questions asked in this round..."
                      value={round.description}
                      onChange={e => handleRoundChange(index, 'description', e.target.value)}
                      className="modern-input"
                      style={{ minHeight: '80px' }}
                    />
                  </motion.div>
                ))}

                <button type="button" onClick={addRound} className="add-btn-dashed">
                  <Plus size={20} /> Add Another Round
                </button>
              </div>
            </div>

            {/* --- Resources & Tips --- */}
            <div style={{ marginBottom: '30px' }}>
              <div className="form-section-title">
                <ExternalLink size={24} /> <span>Resources & Links</span>
              </div>

              <div className="modern-input-group">
                <label>External Links (Notes, Portfolios, etc.)</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    name="title" placeholder="Link Title (e.g. My Resume)"
                    value={currentLink.title} onChange={handleLinkInput}
                    className="modern-input" style={{ flex: 1 }}
                  />
                  <input
                    name="url" placeholder="URL (https://...)"
                    value={currentLink.url} onChange={handleLinkInput}
                    className="modern-input" style={{ flex: 2 }}
                  />
                  <button type="button" onClick={addLink} className="btn-primary-neon" style={{ padding: '0 20px', borderRadius: '12px' }}>
                    <Plus size={20} />
                  </button>
                </div>

                {formData.externalLinks.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {formData.externalLinks.map((link, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                        <a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-neon)', textDecoration: 'none' }}>{link.title}</a>
                        <button type="button" onClick={() => removeLink(idx)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: 0 }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="action-bar-sticky">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-neon"
                style={{ minWidth: '180px', justifyContent: 'center' }}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                Publish Story
              </button>
            </div>

          </form>
        </motion.div>

        {/* Success Modal */}
        {showSubmitSuccess && (
          <div className="download-overlay" style={{ zIndex: 2000 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="download-modal"
              style={{ maxWidth: '450px', background: 'rgba(10, 10, 20, 0.95)', border: '1px solid var(--primary-neon)' }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-neon), var(--success))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', boxShadow: '0 0 40px rgba(0, 240, 255, 0.4)'
              }}>
                <CheckCircle size={40} color="black" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', background: 'linear-gradient(to right, white, var(--primary-neon))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Success!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0' }}>
                Your story has been published successfully. Thank you for contributing to the community!
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareExperiencePage;