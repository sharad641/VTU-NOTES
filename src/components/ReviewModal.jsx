import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, ChevronRight, ArrowLeft, User, Building2, 
  Sparkles, Wand2, Briefcase, Hash 
} from 'lucide-react';
import './ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const experienceRef = useRef(null);

  // Form State matching the screenshot + required fields
  const [formData, setFormData] = useState({
    // Personal Info (From Screenshot)
    isAnonymous: false,
    currentStatus: 'B.Tech Student',
    college: '',
    gradYear: '',
    currentRole: '', // "Your current job title or student"
    
    // Interview Details
    company: '',
    jobRole: '', // Role applied for
    ctc: '',
    placementType: 'On-Campus',
    verdict: 'Selected',
    
    // Experience
    rounds: [],
    experience: ''
  });

  const [tagInput, setTagInput] = useState('');

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handlers
  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!formData.rounds.includes(tagInput.trim())) {
        setFormData(prev => ({ ...prev, rounds: [...prev.rounds, tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, rounds: prev.rounds.filter(r => r !== tag) }));
  };

  const insertTemplate = (type) => {
    let text = "";
    if (type === 'STAR') text = `**Situation:**\n\n**Task:**\n\n**Action:**\n\n**Result:**`;
    else if (type === 'Structure') text = `**Round 1: Online Assessment**\n\n**Round 2: Technical**\n\n**Round 3: HR**`;
    
    setFormData(prev => ({ ...prev, experience: prev.experience + (prev.experience ? '\n\n' : '') + text }));
    setTimeout(() => experienceRef.current?.focus(), 100);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Format CTC
    let formattedCTC = formData.ctc;
    if (formattedCTC && !formattedCTC.toLowerCase().includes('lpa')) formattedCTC += ' LPA';

    const payload = {
      ...formData,
      ctc: formattedCTC,
      status: formData.verdict, // Map 'verdict' to 'status' for DB
      author: {
        name: formData.isAnonymous ? 'Anonymous' : (currentUser?.displayName || 'Student'),
        photoURL: formData.isAnonymous ? null : currentUser?.photoURL,
        uid: currentUser?.uid
      },
      createdAt: new Date(),
    };

    await onSubmit(payload);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
      >
        
        {/* Header */}
        <div className="modal-header">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
            <div>
              <h2 className="header-title">Share Your Interview Experience</h2>
              <p className="header-subtitle">Help fellow students and professionals by sharing your journey</p>
            </div>
            <button onClick={onClose} style={{background:'none', border:'none', cursor:'pointer', color:'#64748b'}}>
              <X size={24}/>
            </button>
          </div>
          <div className="progress-container">
            <div className={`progress-step active`}><div className="progress-fill"></div></div>
            <div className={`progress-step ${step === 2 ? 'active' : ''}`}><div className="progress-fill"></div></div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <AnimatePresence mode='wait'>
            
            {/* STEP 1: PERSONAL & JOB DETAILS */}
            {step === 1 ? (
              <motion.div key="step1" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}}>
                
                {/* Section 1: Personal Information (Matches Screenshot) */}
                <div style={{marginBottom:32}}>
                  <div className="form-section-title"><User size={18}/> Personal Information</div>
                  
                  {/* Anonymous Checkbox */}
                  <div 
                    className={`checkbox-wrapper ${formData.isAnonymous ? 'checked' : ''}`}
                    onClick={() => setFormData({...formData, isAnonymous: !formData.isAnonymous})}
                  >
                    <div className="custom-checkbox">{formData.isAnonymous && <Check size={14} strokeWidth={3}/>}</div>
                    <span className="checkbox-label">Post anonymously (your profile won't be displayed)</span>
                  </div>

                  <div className="form-grid">
                    <div className="input-group">
                      <label className="form-label">Current Status *</label>
                      <select 
                        className="modern-select" 
                        value={formData.currentStatus}
                        onChange={e => setFormData({...formData, currentStatus: e.target.value})}
                      >
                        <option>B.Tech Student</option><option>M.Tech Student</option><option>Working Professional</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="form-label">College Name</label>
                      <input 
                        className="modern-input" placeholder="Your college/university name"
                        value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label className="form-label">Graduation Year</label>
                      <input 
                        className="modern-input" placeholder="e.g., 2024"
                        value={formData.gradYear} onChange={e => setFormData({...formData, gradYear: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label className="form-label">Current Role</label>
                      <input 
                        className="modern-input" placeholder="Your current job title or student"
                        value={formData.currentRole} onChange={e => setFormData({...formData, currentRole: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div style={{height:1, background:'#f1f5f9', margin:'20px 0'}}></div>

                {/* Section 2: Interview Details */}
                <div>
                   <div className="form-section-title"><Building2 size={18}/> Interview Details</div>
                   <div className="form-grid">
                      <div className="input-group">
                        <label className="form-label">Company Name *</label>
                        <input 
                          className="modern-input" placeholder="e.g. Google, Amazon" autoFocus
                          value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div className="input-group">
                        <label className="form-label">Role Applied For *</label>
                        <input 
                          className="modern-input" placeholder="e.g. SDE-1"
                          value={formData.jobRole} onChange={e => setFormData({...formData, jobRole: e.target.value})}
                        />
                      </div>
                      <div className="input-group">
                        <label className="form-label">CTC Offered</label>
                        <input 
                          className="modern-input" placeholder="e.g. 18 LPA"
                          value={formData.ctc} onChange={e => setFormData({...formData, ctc: e.target.value})}
                        />
                      </div>
                      <div className="input-group">
                        <label className="form-label">Placement Type</label>
                        <select 
                          className="modern-select"
                          value={formData.placementType} onChange={e => setFormData({...formData, placementType: e.target.value})}
                        >
                          <option>On-Campus</option><option>Off-Campus</option><option>Internship</option>
                        </select>
                      </div>
                   </div>

                   {/* Verdict */}
                   <div className="input-group">
                      <label className="form-label">Interview Verdict</label>
                      <div className="verdict-options">
                        {['Selected', 'Rejected', 'Pending'].map(v => (
                          <button 
                            key={v}
                            className={`verdict-btn ${formData.verdict === v ? v.toLowerCase() : ''}`}
                            onClick={() => setFormData({...formData, verdict: v})}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>

              </motion.div>
            ) : (

            /* STEP 2: EXPERIENCE (SMART WRITER) */
              <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}}>
                <div style={{marginBottom:24}}>
                   <div className="form-section-title"><Briefcase size={18}/> Interview Rounds</div>
                   <div className="input-group">
                      <label className="form-label">Add Rounds (Press Enter)</label>
                      <input 
                        className="modern-input" placeholder="e.g. Coding Round, HR..."
                        value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown}
                      />
                      <div className="chips-container" style={{background:'none', border:'none', padding:'8px 0'}}>
                        {formData.rounds.map(r => (
                          <span key={r} className="topic-chip" onClick={() => removeTag(r)} style={{background:'#eff6ff', borderColor:'#bfdbfe', color:'#1e40af'}}>
                            {r} <X size={12} style={{display:'inline', marginLeft:4}}/>
                          </span>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="smart-writer-container">
                   <div className="writer-toolbar">
                      <button className="tool-btn magic" onClick={() => insertTemplate('Structure')}><Sparkles size={14}/> Auto-Structure</button>
                      <button className="tool-btn" onClick={() => insertTemplate('STAR')}><Wand2 size={14}/> STAR Method</button>
                   </div>
                   <textarea 
                     ref={experienceRef}
                     className="writer-area"
                     placeholder="Describe your interview process detailedly..."
                     value={formData.experience}
                     onChange={e => setFormData({...formData, experience: e.target.value})}
                   />
                   <div className="chips-container">
                      <span style={{fontSize:'0.75rem', fontWeight:600, color:'#94a3b8', marginRight:8}}>QUICK TOPICS:</span>
                      {['DSA', 'System Design', 'DBMS', 'OS', 'Projects'].map(t => (
                        <span key={t} className="topic-chip" onClick={() => setFormData(p => ({...p, experience: p.experience + ` #${t} `}))}>
                          <Hash size={10} style={{display:'inline', marginRight:2}}/> {t}
                        </span>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="modal-footer">
           {step === 1 ? (
             <>
               <div></div>
               <button className="btn-primary" onClick={() => setStep(2)}>
                 Next Step <ChevronRight size={18}/>
               </button>
             </>
           ) : (
             <>
               <button className="btn-secondary" onClick={() => setStep(1)}>
                 <ArrowLeft size={18}/> Back
               </button>
               <button 
                 className="btn-primary" 
                 onClick={handleSubmit} 
                 disabled={loading || !formData.experience}
               >
                 {loading ? 'Submitting...' : 'Submit Story'}
               </button>
             </>
           )}
        </div>

      </motion.div>
    </div>
  );
};

export default ReviewModal;