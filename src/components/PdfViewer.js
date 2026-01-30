import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import {
  FaDownload, FaShareAlt, FaExpand, FaCompress,
  FaArrowLeft, FaMoon, FaSun,
  FaExternalLinkAlt, FaSearchPlus, FaSearchMinus,
  FaQrcode, FaHistory, FaEye, FaRedoAlt,
  FaSpinner, FaFilePdf, FaBolt, FaTerminal
} from "react-icons/fa";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
import { IoClose, IoSettingsOutline } from "react-icons/io5";

// Component Imports
import AdSenseAd from "./AdSenseAd";
import CommentSection from "./CommentSection";
import "./PdfViewer.css";

import { motion, AnimatePresence } from "framer-motion";

// --- UTILS ---
const getDownloadLink = (url) => {
  if (!url) return null;
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url.replace('/preview', '/view?usp=sharing');
  } catch {
    return url;
  }
};

const PdfViewer = () => {
  const { pdfUrl } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  const iframeRef = useRef(null);

  // --- STATE ---
  const [meta, setMeta] = useState({
    name: "Loading Document...",
    size: "PDF Document"
  });
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ||
    localStorage.getItem("theme") === "dark"
  );
  const [cinemaMode, setCinemaMode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showQr, setShowQr] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [recentFiles, setRecentFiles] = useState([]);
  const [toast, setToast] = useState(null);
  const [connectionSpeed, setConnectionSpeed] = useState('good');
  const [showMissionControl, setShowMissionControl] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [missionTab, setMissionTab] = useState('insights');
  const [scrollProgress, setScrollProgress] = useState(0);

  const decodedUrl = decodeURIComponent(pdfUrl || "");
  const embedSrc = decodedUrl?.replace(/(\/view|\/open).*/, "/preview");
  const downloadLink = getDownloadLink(decodedUrl);

  const showNotification = useCallback((msg, type = "info") => {
    setToast({ msg, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToHistory = useCallback((name, url) => {
    try {
      let history = JSON.parse(localStorage.getItem("pdf_history") || "[]");
      history = history.filter(item => item.url !== url);
      history.unshift({
        name,
        url,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (history.length > 8) history.pop();
      localStorage.setItem("pdf_history", JSON.stringify(history));
      setRecentFiles(history);
    } catch (e) {
      console.warn("LocalStorage failed", e);
    }
  }, []);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_val = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled_val);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'm') setShowMissionControl(prev => !prev);
      if (e.key === 'Escape') setShowMissionControl(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      setConnectionSpeed(connection.downlink > 5 ? 'good' : connection.downlink > 1 ? 'medium' : 'slow');
    }
  }, []);

  useEffect(() => {
    if (!decodedUrl) return;
    setLoading(true);
    setIframeLoaded(false);
    setError(false);

    try {
      const urlObj = new URL(decodedUrl);
      let fileName = urlObj.pathname.split('/').pop();
      
      // Handle Google Drive /preview or /view ends
      if (fileName === 'preview' || fileName === 'view') {
        const parts = urlObj.pathname.split('/');
        // Usually /file/d/ID/preview
        fileName = parts[parts.length - 2] || "VTU Document";
        if (fileName.length > 20) fileName = "VTU Resource Hub";
      }

      const cleanName = decodeURIComponent(fileName)
        .replace(/\.pdf$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      
      const finalName = (cleanName && cleanName !== 'D') ? cleanName : "VTU Academic Document";
      setMeta(prev => ({ ...prev, name: finalName }));
      addToHistory(finalName, decodedUrl);
    } catch {
      setMeta(prev => ({ ...prev, name: "VTU Document" }));
    }
    logEvent(analytics, "pdf_view", { url: decodedUrl });
  }, [decodedUrl, addToHistory]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch(console.log);
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = async () => {
    const shareData = { title: meta.name, url: window.location.href };
    if (navigator.share && navigator.canShare(shareData)) {
      try { await navigator.share(shareData); } catch { }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification("Link copied", "success");
    }
  };

  return (
    <div className={`pdf-modern-root ${cinemaMode ? 'is-cinema' : ''} ${darkMode ? 'is-dark' : 'is-light'}`} ref={viewerRef}>
      {/* Ultimate Progress Line */}
      <div className="ultimate-progress-line" style={{ width: `${scrollProgress}%` }}></div>

      {/* --- Background Engine --- */}
      <div className="pdf-background-shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="geo-shape hexagon geo-1" style={{ top: '10%', left: '5%' }}></div>
        <div className="geo-shape triangle geo-2" style={{ bottom: '15%', right: '10%' }}></div>
        <div className="geo-shape hexagon geo-3" style={{ top: '60%', left: '15%' }}></div>
        <div className="geo-shape triangle geo-4" style={{ top: '20%', right: '20%' }}></div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: -50, opacity: 0, x: '-50%' }} 
            animate={{ y: 0, opacity: 1, x: '-50%' }} 
            exit={{ y: -50, opacity: 0, x: '-50%' }} 
            className={`portal-toast ${toast.type}`}
          >
            <span>{toast.msg}</span>
            <button onClick={() => setToast(null)}><IoClose /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`pdf-nav-glass ${cinemaMode ? 'nav-hidden' : ''} ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-left">
          <button onClick={() => navigate(-1)} className="glass-back-btn">
            <FaArrowLeft />
          </button>
          <div className="doc-profile">
            <div className="doc-icon-box"><FaFilePdf /></div>
            <div className="doc-info-text">
              <h1 className="doc-name-vibe">{meta.name}</h1>
              <div className="doc-info-badges mobile-hide-badges">
                <span className="info-badge-modern"><FaBolt className="speed-icon" /> {connectionSpeed.toUpperCase()}</span>
                <span className="dot-sep">•</span>
                <span className="info-badge-modern">{meta.size}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="glass-action-island">
            <button onClick={() => setZoom(z => Math.max(z - 25, 50))} className="island-btn" title="Zoom Out"><FaSearchMinus /></button>
            <span className="island-zoom">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 25, 400))} className="island-btn" title="Zoom In"><FaSearchPlus /></button>
            <div className="island-sep"></div>
            <button onClick={() => setCinemaMode(!cinemaMode)} className={`island-btn ${cinemaMode ? 'active' : ''}`} title="Cinema Mode"><FaEye /></button>
            <button onClick={() => setDarkMode(!darkMode)} className="island-btn" title="Dark Mode">{darkMode ? <FaSun /> : <FaMoon />}</button>
            <button onClick={() => setShowMissionControl(true)} className="island-btn" title="Mission Control"><IoSettingsOutline /></button>
            {downloadLink && (
              <a href={downloadLink} download className="island-btn-premium"><FaDownload /> <span>Save</span></a>
            )}
          </div>
        </div>
      </header>
      
      {/* Top Banner Ad - High Visibility */}
      <div className={`pdf-top-ad ${cinemaMode ? 'is-hidden' : ''}`} style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
          <AdSenseAd 
             adClient="ca-pub-9499544849301534" 
             adSlot="3936951010" 
             style={{ width: "100%", maxWidth: "728px", height: "90px" }} // Responsive Leaderboard
          />
      </div>

      <main className="pdf-stage" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div className="viewer-core-wrapper">
          {loading && (
            <div className="loader-portal">
              <div className="spinner-futuristic">
                <div className="spinner-ring"></div>
                <FaFilePdf className="spinner-icon" />
              </div>
              <p>Preparing Document...</p>
            </div>
          )}

          {error && (
            <div className="error-portal">
              <div className="error-card-vibe">
                <div className="error-icon-vibe">⚠️</div>
                <h2>Oops! View Unavailable</h2>
                <p>We couldn't load the preview. Try downloading instead.</p>
                <div className="error-btn-group">
                  <button onClick={() => window.location.reload()} className="btn-retry-modern"><FaRedoAlt /> Retry</button>
                  <a href={downloadLink} className="btn-download-modern"><FaDownload /> Download PDF</a>
                </div>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ 
              opacity: iframeLoaded ? 1 : 0, 
              scale: iframeLoaded ? (zoom / 100) : 0.95,
              filter: iframeLoaded ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="iframe-container-vibe"
          >
            <div className="ambient-glow-aura"></div>
            <iframe
              ref={iframeRef}
              src={embedSrc}
              title={meta.name}
              className="iframe-actual"
              onLoad={() => { setLoading(false); setIframeLoaded(true); }}
              onError={() => { setLoading(false); setError(true); }}
              allow="autoplay; fullscreen"
            />
          </motion.div>
        </div>

        {/* ✅ SIDEBAR AD (High Value) */}
        {!cinemaMode && (
          <aside className="pdf-sidebar-ad mobile-hide-ad" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
             <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsored</p>
                <AdSenseAd 
                    adClient="ca-pub-9499544849301534" 
                    adSlot="3936951010" 
                    style={{ minHeight: "600px", width: "100%" }} 
                />
             </div>
          </aside>
        )}

        <AnimatePresence>
          {cinemaMode && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCinemaMode(false)} className="exit-cinema-fab">
              <IoClose /> Exit Focus
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      <div className={`pdf-floating-actions ${cinemaMode ? 'is-hidden' : ''}`}>
        <button onClick={toggleFullscreen} className="fab-item" title="Fullscreen">
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
        <button onClick={handleShare} className="fab-item" title="Share">
          <FaShareAlt />
        </button>
      </div>

      <AnimatePresence>
        {showMissionControl && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sidebar-overlay-dim"
              onClick={() => setShowMissionControl(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mission-control-sidebar"
            >
              <div className="sidebar-header">
                <h2><FaTerminal /> Mission Control</h2>
                <button className="island-btn" onClick={() => setShowMissionControl(false)}><IoClose /></button>
              </div>

              <div className="mission-tab-group">
                <button className={`mission-tab ${missionTab === 'insights' ? 'active' : ''}`} onClick={() => setMissionTab('insights')}>Insights</button>
                <button className={`mission-tab ${missionTab === 'history' ? 'active' : ''}`} onClick={() => setMissionTab('history')}>History</button>
                <button className={`mission-tab ${missionTab === 'share' ? 'active' : ''}`} onClick={() => setMissionTab('share')}>Share</button>
              </div>

              <div className="mission-content-vibe">
                {missionTab === 'insights' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="stats-grid-mission">
                      <div className="stat-item-mission">
                        <span>Quality</span>
                        <h4>HD Preview</h4>
                      </div>
                      <div className="stat-item-mission">
                        <span>Speed</span>
                        <h4>{connectionSpeed.toUpperCase()}</h4>
                      </div>
                    </div>
                    <div className="insight-card-vibe">
                      <h4><HiOutlineLightBulb /> Tech Insight</h4>
                      <p>Currently viewing {meta.name} in Accelerated Fusion Mode. Zooming to {zoom}% enhances pixel density.</p>
                    </div>
                  </motion.div>
                )}

                {missionTab === 'history' && (
                   <div className="history-scroll-v2">
                    {recentFiles.map((file, i) => (
                      <div key={i} className="hist-item-modern" onClick={() => { navigate(`/pdf/${encodeURIComponent(file.url)}`); setShowMissionControl(false); }}>
                        <div className="hist-icon-v2"><FaFilePdf /></div>
                        <div className="hist-text-v2">
                          <h4>{file.name}</h4>
                          <span>{file.date} at {file.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {missionTab === 'share' && (
                  <div className="share-mission-panel">
                    <div className="qr-wrapper-v2" style={{ marginBottom: '20px' }}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}`} alt="QR" style={{ borderRadius: '12px' }} />
                    </div>
                    <button className="btn-copy-link" style={{ width: '100%', padding: '12px' }} onClick={() => { navigator.clipboard.writeText(window.location.href); showNotification("Copied to system buffer", "success"); }}>
                      Copy Access Protocol
                    </button>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 'auto' }}>
                 <button className="dock-item-prime" style={{ width: '100%', border: 'none', cursor: 'pointer' }} onClick={handleShare}>
                    <FaShareAlt /> <span>Initialize Protocol</span>
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className={`pdf-mobile-dock ${cinemaMode ? 'is-hidden' : ''}`}>
        <button onClick={() => navigate(-1)} className="dock-item"><FaArrowLeft /><span>Back</span></button>
        <button onClick={handleShare} className="dock-item"><FaShareAlt /><span>Share</span></button>
        <button onClick={() => setDarkMode(!darkMode)} className="dock-item">{darkMode ? <FaSun /> : <FaMoon />}<span>Look</span></button>
        {downloadLink && <a href={downloadLink} className="dock-item-prime"><FaDownload /><span>Save</span></a>}
      </div>

      <div className={`pdf-footer-ad-section ${cinemaMode ? 'is-hidden' : ''}`}>
        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" adFormat="auto" fullWidthResponsive={true} />
        <CommentSection />
      </div>
    </div>

  );
};

export default PdfViewer;