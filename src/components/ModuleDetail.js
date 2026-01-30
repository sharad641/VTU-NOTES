// src/components/ModuleDetail.js - MODERNIZED & OPTIMIZED
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModuleDetailModern.css";
import {
  HiOutlineEye, HiOutlineCloudArrowDown, HiOutlineBookOpen,
  HiOutlineFolderOpen, HiOutlineDocumentText, HiOutlineFire,
  HiOutlineArchiveBox, HiOutlineCheckCircle, HiOutlineLightBulb,
  HiOutlineBeaker, HiOutlineClock, HiOutlineSquares2X2,
  HiOutlineExclamationTriangle
} from "react-icons/hi2";
import {
  FaUniversity, FaChevronRight, FaClock, FaChevronLeft
} from "react-icons/fa";
import { AiOutlineHome, AiOutlineFilePdf } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "./CommentSection";
import AdSenseAd from "./AdSenseAd";
import InterstitialAdModal from "./InterstitialAdModal";
import { moduleDetails } from "../data/moduleDetails";

const ModuleDetail = () => {
  const { branch, semester, subjectName } = useParams();
  const navigate = useNavigate();

  // State
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const [activeDownload, setActiveDownload] = useState(null);
  
  // Ad Wall State
  const [showAdWall, setShowAdWall] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // { type: 'download' | 'preview', payload: any }
  
  // Computed Data
  const subjectData = useMemo(() => {
    const branchData = moduleDetails[branch?.toLowerCase()] || moduleDetails["first-year"];
    return branchData?.[parseInt(semester)]
      ?.find((subject) => subject.title === subjectName);
  }, [branch, semester, subjectName]);

  const stats = useMemo(() => {
    if (!subjectData?.modules) return { total: 0, notes: 0, pyq: 0, solutions: 0, important: 0 };
    return {
      total: subjectData.modules.length,
      notes: subjectData.modules.filter(m => m.type === 'notes').length,
      pyq: subjectData.modules.filter(m => m.category === 'pyq').length,
      solutions: subjectData.modules.filter(m => m.type === 'solutions').length,
      important: subjectData.modules.filter(m => m.category === 'important-questions').length,
    };
  }, [subjectData]);

  const categorizedModules = useMemo(() => {
    if (!subjectData?.modules) return {};
    const categories = { "notes": [], "pyq": [], "important-questions": [] }; // Init common ones
    subjectData.modules.forEach(m => {
       if(!categories[m.category]) categories[m.category] = [];
       categories[m.category].push(m);
    });
    return categories;
  }, [subjectData]);

  const filteredModules = useMemo(() => {
    if (!subjectData?.modules) return [];
    let modules = [...subjectData.modules];
    if (activeCategory !== "all") {
      modules = modules.filter(m => m.category === activeCategory);
    }
    // Default Sort: Essential first
    return modules.sort((a, b) => (b.essential ? 1 : 0) - (a.essential ? 1 : 0));
  }, [subjectData, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const showToast = (msg, type = 'success') => {
      // Simple custom toast implementation or use a library
      // For now, avoiding external deps not listed in package.json
      // Assuming a global toast or skip
      console.log(`[${type}] ${msg}`);
  };

  const executeDownload = useCallback((module) => {
    // 1. Trigger Futuristic Popup
    setActiveDownload(module.title);
    setShowDownloadProgress(true);
    setDownloadProgress(0);

    // 2. Simulate preparation/scanning progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 3. Complete & Open
          setTimeout(() => {
            window.open(module.fileUrl, '_blank', 'noopener,noreferrer');
            showToast(`Download Started: ${module.title}`, "success");
            
            // Close modal after a brief success state
            setTimeout(() => {
                setShowDownloadProgress(false);
                setActiveDownload(null);
            }, 1000);
          }, 500);
          
          return 100;
        }
        return prev + 10; // 10 steps * 100ms = ~1 sec duration
      });
    }, 100);
  }, []);

  const handleDownloadTrigger = useCallback((module) => {
    if (!module.fileUrl || module.fileUrl === "#") {
        showToast("Link not available", "warning");
        return;
    }
    setPendingAction({ type: 'download', payload: module });
    setShowAdWall(true);
  }, []);

  const executePreview = (url) => {
    if (url && url !== "#") {
      navigate(`/pdf/${encodeURIComponent(url)}`);
    } else {
      showToast("Preview not available", "warning");
    }
  };

  const handlePreviewTrigger = (url) => {
     setPendingAction({ type: 'preview', payload: url });
     setShowAdWall(true);
  };

  const handleAdWallComplete = () => {
      setShowAdWall(false);
      if (pendingAction) {
          if (pendingAction.type === 'download') {
              executeDownload(pendingAction.payload);
          } else if (pendingAction.type === 'preview') {
              executePreview(pendingAction.payload);
          }
          setPendingAction(null);
      }
  };

  const handleBatchDownload = (modules, label) => {
     if(!modules.length) return;
      if(window.confirm(`Download all ${modules.length} ${label} files?`)) {
          // Note: Batch download logic might need refinement for ad strategy, 
          // currently treating as one action or leaving as is.
          // For now, let's just trigger them directly to avoid spamming the user with 10 ads.
          modules.forEach((m, i) => setTimeout(() => executeDownload(m), i * 1500));
      }
  };

  const getModuleIcon = (cat) => {
      const map = {
          'notes': <HiOutlineBookOpen />, 'pyq': <FaUniversity />, 'important-questions': <HiOutlineFire />,
          'solved-qp': <HiOutlineCheckCircle />, 'question-bank': <HiOutlineArchiveBox />
      };
      return map[cat] || <HiOutlineDocumentText />;
  };

  const getCategoryLabel = (cat) => {
      const map = {
          'notes': 'Notes', 'pyq': 'Question Papers', 'important-questions': 'Important Qs',
          'solved-qp': 'Solved Papers', 'question-bank': 'Question Bank',
          'lab-manual': 'Lab Manual'
      };
      return map[cat] || cat;
  };

  // Animation Variants
  const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (loading) return (
      <div className="portal-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-spinner"></div>
      </div>
  );

  if (!subjectData) return (
      <div className="portal-container error-state-wrapper">
          <div className="module-background-engine"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="error-glass-card"
          >
              <div className="error-icon-glow">
                  <HiOutlineExclamationTriangle />
              </div>
              <h2 className="error-title">Subject Missing</h2>
              <p className="error-message">
                  We couldn't find the subject you're looking for.<br/>
                  It might have been moved or doesn't exist in this semester.
              </p>
              <div className="error-actions">
                  <button onClick={() => navigate(-1)} className="btn-primary-neon">
                      <FaChevronLeft style={{ marginRight: '8px' }} /> Go Back
                  </button>
                  <button onClick={() => navigate('/')} className="btn-secondary-glass">
                      <AiOutlineHome style={{ marginRight: '8px' }} /> Home
                  </button>
              </div>
          </motion.div>
      </div>
  );

  return (
    <div className="portal-container">
      {/* Background FX */}
      <div className="module-background-engine"></div>

      <InterstitialAdModal 
        isOpen={showAdWall} 
        onClose={() => setShowAdWall(false)}
        onComplete={handleAdWallComplete}
        resourceTitle={pendingAction?.type === 'download' ? pendingAction.payload.title : 'Preview Document'}
      />

      {/* Download Overlay */}
      <AnimatePresence>
        {showDownloadProgress && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="download-overlay">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="download-modal glass-noise">
              <HiOutlineCloudArrowDown className="download-icon" />
              <h3>Downloading...</h3>
              <p className="download-filename">{activeDownload}</p>
              <div className="progress-container">
                <div className="progress-fill" style={{ width: `${downloadProgress}%` }}></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="content-wrapper">
        
        {/* Breadcrumb */}
        <nav className="breadcrumb-modern-container">
            <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><button onClick={() => navigate('/')}><AiOutlineHome /> Home</button></li>
                <li className="breadcrumb-separator"><FaChevronRight size={10} /></li>
                <li className="breadcrumb-item"><button onClick={() => navigate(`/branch/${branch}/${semester}`)}>Semester {semester}</button></li>
                <li className="breadcrumb-separator"><FaChevronRight size={10} /></li>
                <li className="breadcrumb-item active">{subjectName}</li>
            </ul>
        </nav>

        <div className="module-grid-layout">
          {/* Sidebar */}
          <aside className="module-sidebar">
             <div className="sidebar-sticky-content">
                 <div className="sidebar-icon-box"><HiOutlineBookOpen /></div>
                 <div className="sidebar-subject-card">
                     <h1>{subjectName}</h1>
                     <div className="sidebar-meta">
                         <span className="info-pill">{subjectData.code}</span>
                         <span className="info-pill">CREDITS: {subjectData.credits}</span>
                     </div>
                 </div>
                 
                 <div className="sidebar-actions">
                     <button className="sidebar-btn-modern primary" onClick={() => handleBatchDownload(subjectData.modules, "All")}>
                         <HiOutlineCloudArrowDown /> Download All
                     </button>
                      <button className="sidebar-btn-modern important" onClick={() => handleBatchDownload(categorizedModules['important-questions'] || [], "Important")}>
                         <HiOutlineFire /> Important Qs
                     </button>
                      <button className="sidebar-btn-modern secondary" onClick={() => handleBatchDownload(categorizedModules['pyq'] || [], "PYQ")}>
                         <FaUniversity /> PYQ Papers
                     </button>
                 </div>
                 
                 <div style={{ marginTop: '30px' }}>
                    <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" style={{ minHeight: "300px" }} />
                 </div>
             </div>
          </aside>

          {/* Main Content */}
          <main className="module-main-content">
              {/* Hero Banner */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="content-hero-banner-modern"
              >
                  <div>
                      <h1 className="banner-title">{subjectName}</h1>
                      <div className="banner-subtitle">
                          <span className="info-pill">2022 SCHEME</span>
                          <span className="info-pill">UPDATED 2024</span>
                      </div>
                  </div>
                  <div className="credits-badge-modern">
                      <span className="credits-number">{stats.total}</span>
                      <span className="credits-label">FILES</span>
                  </div>
              </motion.div>

              {/* Stats Grid */}
              <section className="portal-stats-overview-modern">
                  <motion.div whileHover={{ y: -5 }} className="stat-glass-card">
                      <div className="stat-card-icon"><HiOutlineDocumentText /></div>
                      <div className="stat-card-info"><h3>{stats.notes}</h3><p>Notes</p></div>
                  </motion.div>
                   <motion.div whileHover={{ y: -5 }} className="stat-glass-card">
                      <div className="stat-card-icon"><FaUniversity /></div>
                      <div className="stat-card-info"><h3>{stats.pyq}</h3><p>PYQs</p></div>
                  </motion.div>
                   <motion.div whileHover={{ y: -5 }} className="stat-glass-card">
                      <div className="stat-card-icon"><HiOutlineCheckCircle /></div>
                      <div className="stat-card-info"><h3>{stats.solutions}</h3><p>Solved</p></div>
                  </motion.div>
                   <motion.div whileHover={{ y: -5 }} className="stat-glass-card important">
                      <div className="stat-card-icon" style={{ color: '#FF0055' }}><HiOutlineFire /></div>
                      <div className="stat-card-info"><h3>{stats.important}</h3><p>Important</p></div>
                  </motion.div>
              </section>

              {/* Filters */}
              <div className="portal-filter-grid">
                  <button onClick={() => setActiveCategory('all')} className={`portal-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}>
                      <HiOutlineSquares2X2 /> All
                  </button>
                  {Object.keys(categorizedModules).map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)} className={`portal-filter-pill ${activeCategory === cat ? 'active' : ''}`}>
                          {getModuleIcon(cat)} {getCategoryLabel(cat)}
                      </button>
                  ))}
              </div>

              {/* Module Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="modules-grid-modern"
              >
                  <AnimatePresence mode="popLayout">
                      {filteredModules.map((module, idx) => (
                          <React.Fragment key={module.id}>
                          <motion.div
                              layout
                              variants={itemVariants}
                              className={`module-card-modern ${module.essential ? 'premium' : ''}`}
                          >
                              <div className="card-type-header">
                                  <span className="card-type-icon">{getModuleIcon(module.category)}</span>
                                  <span className="card-type-label">{getCategoryLabel(module.category)}</span>
                                  {module.essential && <span className="status-badge-neon" style={{background: '#FFB800', color: 'black', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold'}}>ESSENTIAL</span>}
                              </div>
                              <h3 className="module-title-modern">{module.title}</h3>
                              <p className="module-description-modern">{module.description}</p>
                              
                              <div className="module-meta-modern" style={{ display: 'flex', gap: '15px', color: '#8F9BB3', fontSize: '0.85rem', marginBottom: '20px' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><HiOutlineDocumentText /> {module.fileSize} MB</span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaClock /> {module.uploadedDate}</span>
                              </div>

                              <div className="module-card-footer-modern" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                  <button onClick={() => handleDownloadTrigger(module)} className="card-action-btn download">
                                      <HiOutlineCloudArrowDown /> Download
                                  </button>
                                  <button onClick={() => handlePreviewTrigger(module.previewUrl)} className="card-action-btn preview">
                                      <HiOutlineEye /> Preview
                                  </button>
                              </div>
                          </motion.div>
                          
                          {/* Inject Ad after every 3rd item (High Frequency) */}
                          {(idx + 1) % 3 === 0 && (
                             <div className="in-feed-ad-container" style={{ gridColumn: '1 / -1', margin: '20px 0' }}>
                                <AdSenseAd 
                                   adClient="ca-pub-9499544849301534" 
                                   adSlot="3936951010" 
                                   // format="fluid" 
                                   style={{ display: 'block', minHeight: '150px' }}
                                />
                             </div>
                          )}
                          </React.Fragment>
                      ))}
                  </AnimatePresence>
              </motion.div>
          </main>
        </div>
      </div>
      
      {/* Footer Comments */}
      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
         <CommentSection />
      </div>

    </div>
  );
};

export default ModuleDetail;
