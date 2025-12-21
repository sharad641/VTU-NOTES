import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, User, Briefcase, BookOpen, 
  Target, FileText, Plus, Trash2, Loader2, Sparkles, Wand2, 
  Lightbulb, ChevronRight, GraduationCap, MapPin, 
  Link2, PlusCircle, X 
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- FIREBASE IMPORTS ---
import { auth, database } from '../firebase'; 
import { ref, push, serverTimestamp } from 'firebase/database';

import './ShareExperience.css';

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

// --- Contextual Tips for Sidebar ---
const SECTION_TIPS = {
  personal: "We verify students to keep the community authentic. You can choose to be anonymous.",
  job: "For 'Role', try to be specific (e.g., 'SDE-1 (Backend)' instead of just 'SDE').",
  prep: "Sharing Google Drive links to your notes or Resume templates helps others immensely!",
  rounds: "Detailing the exact coding problems (or similar ones) is the most valuable part.",
  exp: "Use the 'Structure' button to auto-format your answer for better readability.",
  advice: "Share your wisdom! Your personal tips and study advice are gold for juniors."
};

const ShareExperiencePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

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

  // --- Auto-Save Simulation ---
  useEffect(() => {
    if (formData.company.trim()) {
      setSaving(true);
      const timer = setTimeout(() => setSaving(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  // --- Scroll Spy Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['personal', 'job', 'prep', 'rounds', 'exp', 'advice']; 
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) { 
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if(element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      setActiveSection(id);
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth.currentUser) { alert("Please login to submit."); setLoading(false); return; }

    try {
      // Data Transformation
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
        // externalLinks is already an array of objects, passed directly
        author: {
          name: formData.isAnonymous ? 'Anonymous' : (auth.currentUser.displayName || "Student"),
          uid: auth.currentUser.uid,
          photoURL: formData.isAnonymous ? null : auth.currentUser.photoURL
        },
        createdAt: serverTimestamp()
      };

      await push(ref(database, 'placement_reviews'), payload);
      navigate('/placement-stories');
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="share-container">
      
      {/* 1. Sticky Navbar */}
      <nav className="share-nav">
        <button type="button" onClick={() => navigate(-1)} className="nav-btn-text"><ArrowLeft size={18}/> Cancel</button>
        <div className="save-indicator">
           {saving ? <><Loader2 className="animate-spin" size={14}/> Saving...</> : <><CheckCircle size={14}/> Draft Saved</>}
        </div>
        <button onClick={handleSubmit} className="nav-btn-primary">Publish <ChevronRight size={16}/></button>
      </nav>

      <div className="main-layout">
        
        {/* 2. Sidebar Navigation */}
        <aside className="sidebar-sticky">
           <div className="nav-card">
              <div className="nav-title">Sections</div>
              <div className={`nav-item ${activeSection==='personal'?'active':''}`} onClick={()=>scrollTo('personal')}><User size={16}/> Personal</div>
              <div className={`nav-item ${activeSection==='job'?'active':''}`} onClick={()=>scrollTo('job')}><Briefcase size={16}/> Job Info</div>
              <div className={`nav-item ${activeSection==='prep'?'active':''}`} onClick={()=>scrollTo('prep')}><BookOpen size={16}/> Preparation</div>
              <div className={`nav-item ${activeSection==='rounds'?'active':''}`} onClick={()=>scrollTo('rounds')}><Target size={16}/> Rounds</div>
              <div className={`nav-item ${activeSection==='exp'?'active':''}`} onClick={()=>scrollTo('exp')}><FileText size={16}/> Experience</div>
              <div className={`nav-item ${activeSection==='advice'?'active':''}`} onClick={()=>scrollTo('advice')}><Lightbulb size={16}/> Advice</div>
           </div>
           
           <motion.div 
             key={activeSection}
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             className="tip-box"
           >
              <div className="tip-header"><Sparkles size={14}/> Quick Tip</div>
              <p>{SECTION_TIPS[activeSection]}</p>
           </motion.div>
        </aside>

        {/* 3. Main Form */}
        <form onSubmit={handleSubmit} className="form-content">
           
           {/* Section: Personal */}
           <div id="personal" className="form-section">
              <div className="section-header">
                 <div className="icon-bg"><User size={20}/></div>
                 <h2>Personal Information</h2>
              </div>
              <div className="form-grid">
                 <div className="form-group full-width">
                    <label className="checkbox-card">
                       <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange}/>
                       <div className="chk-content">
                          <span className="chk-title">Post Anonymously</span>
                          <span className="chk-desc">Your name and photo will be hidden from the public view.</span>
                       </div>
                       {formData.isAnonymous && <CheckCircle className="chk-icon" size={20}/>}
                    </label>
                 </div>
                 <div className="form-group">
                    <label>Current Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                       <option>B.Tech Student</option><option>M.Tech Student</option><option>Alumni</option>
                    </select>
                 </div>
                 <div className="form-group">
                    <label>Graduation Year</label>
                    <input name="gradYear" placeholder="2025" value={formData.gradYear} onChange={handleChange}/>
                 </div>
              </div>
           </div>

           {/* Section: Job Info */}
           <div id="job" className="form-section">
              <div className="section-header"><div className="icon-bg"><Briefcase size={20}/></div><h2>Job Information</h2></div>
              <div className="form-grid">
                 <div className="form-group">
                    <label>Company Name <span className="req">*</span></label>
                    <input name="company" placeholder="e.g. Microsoft" value={formData.company} onChange={handleChange} required/>
                 </div>
                 <div className="form-group">
                    <label>Role / Title <span className="req">*</span></label>
                    <input name="role" placeholder="e.g. SDE Intern" value={formData.role} onChange={handleChange} required/>
                 </div>
                 <div className="form-group">
                    <label>Job Type</label>
                    <div className="chip-group">
                       {['On-Campus', 'Off-Campus', 'Internship'].map(t => (
                          <button key={t} type="button" className={`chip-select ${formData.jobType===t?'active':''}`} onClick={()=>setFormData({...formData, jobType:t})}>{t}</button>
                       ))}
                    </div>
                 </div>
                 <div className="form-group">
                    <label>CTC / Stipend</label>
                    <input name="ctc" placeholder="e.g. 15 LPA or 40k/mo" value={formData.ctc} onChange={handleChange}/>
                 </div>
                 <div className="form-group">
                    <label>Location</label>
                    <div className="input-icon-wrap">
                        <MapPin size={16}/>
                        <input name="location" placeholder="e.g. Hyderabad" value={formData.location} onChange={handleChange}/>
                    </div>
                 </div>
                 <div className="form-group">
                    <label>Duration</label>
                    <input name="duration" placeholder="e.g. 6 Months (if intern)" value={formData.duration} onChange={handleChange}/>
                 </div>
              </div>
           </div>

           {/* Section: Preparation */}
           <div id="prep" className="form-section">
              <div className="section-header"><div className="icon-bg"><BookOpen size={20}/></div><h2>Preparation</h2></div>
              
              <div className="form-group full-width">
                 <label>Resources Used (Text)</label>
                 <input name="resources" placeholder="e.g. LeetCode, YouTube..." value={formData.resources} onChange={handleChange}/>
                 <div className="suggestions">
                    {SUGGESTED_RESOURCES.map(r => (
                       <button type="button" key={r} onClick={()=>handleChipAdd('resources', r)}>+ {r}</button>
                    ))}
                 </div>
              </div>

              {/* NEW: External Links Section */}
              <div className="form-group full-width">
                <label>Study Material & Drive Links</label>
                <div className="link-add-container" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                   <input 
                      type="text" 
                      name="title" 
                      placeholder="Link Title (e.g. My Resume / Notes)" 
                      value={currentLink.title} 
                      onChange={handleLinkInput}
                      style={{ flex: 1 }}
                   />
                   <input 
                      type="text" 
                      name="url" 
                      placeholder="Paste URL (Google Drive, GitHub...)" 
                      value={currentLink.url} 
                      onChange={handleLinkInput}
                      style={{ flex: 2 }}
                   />
                   <button type="button" onClick={addLink} className="btn-add-round" style={{ margin: 0, padding: '0 15px' }}>
                      <PlusCircle size={18} /> Add
                   </button>
                </div>
                
                {formData.externalLinks.length > 0 && (
                  <div className="added-links-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                     {formData.externalLinks.map((link, idx) => (
                        <div key={idx} className="link-chip" style={{ 
                           background: '#eef2ff', padding: '6px 12px', borderRadius: '20px', 
                           display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#4f46e5', border: '1px solid #c7d2fe' 
                        }}>
                           <Link2 size={14}/> 
                           <span style={{ fontWeight: 500 }}>{link.title}</span>
                           <button type="button" onClick={() => removeLink(idx)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}>
                             <X size={14} color="#ef4444"/>
                           </button>
                        </div>
                     ))}
                  </div>
                )}
              </div>
              {/* End New Section */}

              <div className="form-group full-width">
                 <label>Tech Stack / Topics</label>
                 <input name="technologies" placeholder="e.g. Java, DBMS, OOPS..." value={formData.technologies} onChange={handleChange}/>
                 <div className="suggestions">
                    {SUGGESTED_TECH.map(t => (
                       <button type="button" key={t} onClick={()=>handleChipAdd('technologies', t)}>+ {t}</button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Section: Rounds */}
           <div id="rounds" className="form-section">
              <div className="section-header"><div className="icon-bg"><Target size={20}/></div><h2>Interview Rounds</h2></div>
              {formData.rounds.map((round, index) => (
                 <div key={index} className="round-card">
                    <div className="round-header">
                       <span>Round {index+1}</span>
                       {formData.rounds.length > 1 && <button type="button" onClick={()=>removeRound(index)} className="btn-del"><Trash2 size={16}/></button>}
                    </div>
                    <div className="form-grid">
                       <div className="form-group full-width">
                          <input placeholder="Round Title (e.g. Coding Round)" value={round.title} onChange={e=>handleRoundChange(index, 'title', e.target.value)}/>
                       </div>
                       <div className="form-group full-width">
                          <textarea placeholder="Describe the problems asked..." value={round.description} onChange={e=>handleRoundChange(index, 'description', e.target.value)}/>
                       </div>
                    </div>
                 </div>
              ))}
              <button type="button" className="btn-add-round" onClick={addRound}><Plus size={16}/> Add Round</button>
           </div>

           {/* Section: Experience */}
           <div id="exp" className="form-section">
              <div className="section-header"><div className="icon-bg"><FileText size={20}/></div><h2>Overall Experience</h2></div>
              <div className="form-group full-width">
                 <div className="toolbar">
                    <button type="button" onClick={insertTemplate}><Wand2 size={12}/> Use Template</button>
                 </div>
                 <textarea className="lg-area" name="experience" placeholder="Share your story..." value={formData.experience} onChange={handleChange} required/>
              </div>
              <div className="form-grid">
                 <div className="form-group">
                    <label>Difficulty Level</label>
                    <div className="chip-group">
                       {['Easy', 'Medium', 'Hard'].map(d => (
                          <button key={d} type="button" className={`chip-select ${formData.difficulty===d?'active':''}`} onClick={()=>setFormData({...formData, difficulty:d})}>{d}</button>
                       ))}
                    </div>
                 </div>
                 <div className="form-group">
                    <label>Outcome</label>
                    <div className="chip-group">
                       {['Selected', 'Rejected'].map(s => (
                          <button 
                            key={s} type="button"
                            className={`chip-select ${s.toLowerCase()} ${formData.offerStatus===s?'active':''}`} 
                            onClick={()=>setFormData({...formData, offerStatus:s})}
                          >
                             {s}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Section: Advice (NEW) */}
           <div id="advice" className="form-section">
              <div className="section-header"><div className="icon-bg gold"><Lightbulb size={20}/></div><h2>Advice & Guidance</h2></div>
              
              <div className="form-group full-width">
                 <label>Placement Tips</label>
                 <textarea 
                   name="placementTips" 
                   placeholder="General advice for juniors..." 
                   value={formData.placementTips} 
                   onChange={handleChange}
                 />
                 <div className="suggestions">
                    {SUGGESTED_TIPS.map(tip => (
                       <button type="button" className="pill-gold" key={tip} onClick={() => insertIntoTextarea('placementTips', tip)}>
                          <Sparkles size={12}/> {tip}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="form-group full-width">
                 <label>Study Suggestions</label>
                 <textarea 
                   name="studySuggestions" 
                   placeholder="Technical topics to focus on..." 
                   value={formData.studySuggestions} 
                   onChange={handleChange}
                 />
                 <div className="suggestions">
                    {SUGGESTED_STUDY.map(study => (
                       <button type="button" className="pill-gold" key={study} onClick={() => insertIntoTextarea('studySuggestions', study)}>
                          <GraduationCap size={12}/> {study}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="mobile-submit-spacer"></div>
           <button type="submit" className="btn-mobile-submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Experience"}
           </button>

        </form>
      </div>
    </div>
  );
};

export default ShareExperiencePage;