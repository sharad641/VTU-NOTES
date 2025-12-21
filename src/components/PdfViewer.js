import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import {
  FaDownload, FaShareAlt, FaExpand, FaCompress,
  FaArrowLeft, FaMoon, FaSun, FaHeart,
  FaExternalLinkAlt, FaSearchPlus, FaSearchMinus,
  FaQrcode, FaPrint, FaHistory, FaEye, FaRedoAlt
} from "react-icons/fa";
import { IoSparkles, IoClose } from "react-icons/io5";

// Component Imports
import AdSenseAd from "./AdSenseAd";
import CommentSection from "./CommentSection";
import "./PdfViewer.css";

// --- UTILS ---
const getDownloadLink = (url) => {
  if (!url) return null;
  const idMatch = url.match(/\/d\/(.*?)\//);
  return idMatch ? `https://drive.google.com/uc?export=download&id=${idMatch[1]}` : url;
};

const triggerConfetti = () => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    // Random positioning around center
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    
    Object.assign(confetti.style, {
      left: '50%',
      top: '50%',
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      transform: `translate(${x}px, ${y}px)`,
    });
    
    document.body.appendChild(confetti);
    // Cleanup DOM element after animation
    setTimeout(() => confetti.remove(), 1000);
  }
};

const PdfViewer = () => {
  const { pdfUrl } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  
  // --- STATE ---
  const [meta, setMeta] = useState({ name: "Loading...", size: "Unknown" });
  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false); // For smooth transition
  const [error, setError] = useState(false);
  
  // Appearance (Lazy Init for Performance)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [cinemaMode, setCinemaMode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Modals
  const [showQr, setShowQr] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Interaction
  const [likes, setLikes] = useState(() => Number(localStorage.getItem("pdf-likes")) || 128);
  const [isLiked, setIsLiked] = useState(() => localStorage.getItem("pdf-liked") === "true");
  const [recentFiles, setRecentFiles] = useState([]);
  const [toast, setToast] = useState(null);

  // --- DERIVED VALUES ---
  const decodedUrl = decodeURIComponent(pdfUrl || "");
  // Ensure we force preview mode for Google Drive
  const embedSrc = decodedUrl?.replace(/\/view.*|\/open.*/, "/preview");
  const downloadLink = getDownloadLink(decodedUrl);

  // --- HELPERS ---
  const showNotification = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  const addToHistory = useCallback((name, url) => {
    try {
      let history = JSON.parse(localStorage.getItem("pdf_history") || "[]");
      // Remove duplicates based on URL
      history = history.filter(item => item.url !== url);
      // Add to top
      history.unshift({ name, url, date: new Date().toLocaleDateString() });
      // Limit to 5
      if (history.length > 5) history.pop();
      
      localStorage.setItem("pdf_history", JSON.stringify(history));
      setRecentFiles(history);
    } catch (e) {
      console.warn("LocalStorage access failed", e);
    }
  }, []);

  // --- EFFECTS ---

  // 1. Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 2. Load PDF & History
  useEffect(() => {
    if (!decodedUrl) return;

    setLoading(true);
    setIframeLoaded(false);
    setError(false);
    logEvent(analytics, "pdf_view", { url: decodedUrl });

    // Extract Filename logic
    try {
      const parts = decodedUrl.split("/");
      const rawName = parts.pop().split("?")[0];
      const cleanName = decodeURIComponent(rawName).replace(/[-_]/g, " ");
      setMeta({ name: cleanName, size: "PDF Document" });
      addToHistory(cleanName, decodedUrl);
    } catch {
      setMeta({ name: "Secure Document", size: "PDF" });
    }

    // Load History from storage
    const history = JSON.parse(localStorage.getItem("pdf_history") || "[]");
    setRecentFiles(history);
  }, [decodedUrl, addToHistory]);

  // 3. Keyboard Shortcuts & Fullscreen Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && cinemaMode) setCinemaMode(false);
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [cinemaMode]);

  // --- HANDLERS ---

  const handleLike = () => {
    if (isLiked) return showNotification("Already added to favorites!", "warning");
    
    setIsLiked(true);
    setLikes(prev => prev + 1);
    localStorage.setItem("pdf-liked", "true");
    localStorage.setItem("pdf-likes", String(likes + 1));
    logEvent(analytics, "pdf_liked");
    triggerConfetti();
    showNotification("Added to favorites!", "success");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: meta.name, url: window.location.href });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification("Link copied to clipboard", "success");
    }
  };

  const handleHistoryClick = (url) => {
    if (url === decodedUrl) return; // Prevent reload if same
    
    // Check if the URL is internal or external logic, usually for this viewer we likely
    // want to keep the same route structure: /view/ENCODED_URL
    const encoded = encodeURIComponent(url);
    navigate(`/view/${encoded}`);
    setShowHistory(false);
  };

  // --- RENDER ---
  return (
    <div className={`app-container ${cinemaMode ? 'cinema-active' : ''}`} ref={viewerRef}>
      
      <div className="mesh-gradient-bg"></div>
      
      {/* TOAST NOTIFICATION */}
      <div className={`modern-toast-container ${toast ? 'show' : ''}`}>
        {toast && (
          <div className={`modern-toast ${toast.type}`}>
            <IoSparkles className="toast-icon" /> 
            <span>{toast.msg}</span>
          </div>
        )}
      </div>

      {/* --- HEADER --- */}
      <nav className={`glass-header ${cinemaMode ? 'hidden' : ''}`}>
        <div className="nav-left">
          <button 
            onClick={() => navigate(-1)} 
            className="nav-icon-btn back-btn"
            aria-label="Go Back"
          >
            <FaArrowLeft />
          </button>
          <div className="file-info">
            <h1 className="file-title" title={meta.name}>{meta.name}</h1>
            <div className="status-badges">
              <span className="file-badge">
                <span className="pulsing-dot"></span> Live
              </span>
            </div>
          </div>
        </div>

        <div className="nav-right desktop-only">
          <div className="tool-group">
            <button onClick={() => setZoom(z => Math.max(z - 10, 50))} className="tool-btn" aria-label="Zoom Out">
              <FaSearchMinus />
            </button>
            <span className="zoom-label">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(z + 10, 200))} className="tool-btn" aria-label="Zoom In">
              <FaSearchPlus />
            </button>
          </div>
          
          <div className="divider-vertical"></div>

          <button onClick={() => setCinemaMode(!cinemaMode)} className="nav-icon-btn" title="Cinema Mode (Esc)">
             <FaEye />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="nav-icon-btn" title="Toggle Theme">
            {darkMode ? <FaSun className="text-warning" /> : <FaMoon />}
          </button>
          <button onClick={() => setShowQr(true)} className="nav-icon-btn" title="QR Code">
            <FaQrcode />
          </button>
          <button onClick={() => setShowHistory(true)} className="nav-icon-btn" title="Recent Files">
            <FaHistory />
          </button>
          
          {downloadLink && (
            <a href={downloadLink} target="_blank" rel="noreferrer" className="gradient-btn">
              <FaDownload /> <span className="btn-text">Download</span>
            </a>
          )}
        </div>
      </nav>

      {/* --- MAIN STAGE --- */}
      <main className="main-viewport">
        {cinemaMode && (
          <button className="exit-cinema-btn" onClick={() => setCinemaMode(false)}>
            <IoClose /> Exit Focus Mode
          </button>
        )}

        <div className="pdf-stage">
          {loading && (
            <div className="modern-loader">
              <div className="loader-spinner"></div>
              <p>Securely loading document...</p>
            </div>
          )}

          {error ? (
            <div className="error-card glass-panel">
              <div className="error-icon">⚠️</div>
              <h3>Preview Unavailable</h3>
              <p>This document cannot be embedded due to provider restrictions.</p>
              <div className="error-actions">
                <button onClick={() => window.location.reload()} className="retry-btn">
                  <FaRedoAlt /> Retry
                </button>
                <a href={embedSrc} target="_blank" rel="noreferrer" className="gradient-btn">
                  <FaExternalLinkAlt /> Open Externally
                </a>
              </div>
            </div>
          ) : (
            <div 
              className="iframe-wrapper" 
              style={{ 
                width: `${zoom}%`, 
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease-in' 
              }}
            >
              <iframe
                src={embedSrc}
                title={`PDF Viewer - ${meta.name}`}
                onLoad={() => {
                  setLoading(false);
                  setIframeLoaded(true);
                }}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
                allow="autoplay; fullscreen"
              />
            </div>
          )}
        </div>
      </main>

      {/* --- FLOATING ACTIONS --- */}
      <div className={`floating-actions ${cinemaMode ? 'dimmed' : ''}`}>
        <button 
          className={`fab-like ${isLiked ? 'liked' : ''}`} 
          onClick={handleLike}
          aria-label="Like Document"
        >
          <FaHeart />
          <span className="fab-count">{likes}</span>
        </button>
        <button 
          className="fab-secondary" 
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      {/* --- MODALS --- */}
      
      {/* QR Modal */}
      {showQr && (
        <div className="modal-overlay" onClick={() => setShowQr(false)}>
          <div className="modal-card bounce-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share via QR</h3>
              <button onClick={() => setShowQr(false)} className="close-btn"><IoClose /></button>
            </div>
            <div className="qr-box">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`} 
                alt="QR Code" 
                loading="lazy"
              />
              <p>Scan to read on mobile</p>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="modal-card wide bounce-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaHistory /> Recently Viewed</h3>
              <button onClick={() => setShowHistory(false)} className="close-btn"><IoClose /></button>
            </div>
            <div className="history-list">
              {recentFiles.length === 0 ? (
                <div className="empty-state">
                  <FaHistory className="empty-icon"/>
                  <p>No recently viewed files.</p>
                </div>
              ) : (
                recentFiles.map((f, i) => (
                  <div key={i} className="history-item" onClick={() => handleHistoryClick(f.url)}>
                    <div className="icon"><FaPrint /></div>
                    <div className="details">
                      <strong>{f.name}</strong>
                      <small>{f.date}</small>
                    </div>
                    <FaExternalLinkAlt className="link-icon"/>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- BOTTOM CONTENT --- */}
      <section className={`content-area ${cinemaMode ? 'hidden' : ''}`}>
        {/* Memoized Ad Component could go here if prop drilling is heavy, standard import is fine */}
        <div className="ad-wrapper-modern">
          <span className="ad-tag">Advertisement</span>
          <AdSenseAd
             adClient="ca-pub-9499544849301534"
             adSlot="7579321744"
             adFormat="auto"
             fullWidthResponsive={true}
          />
        </div>
        <CommentSection />
      </section>

      {/* --- MOBILE DOCK --- */}
      <nav className={`mobile-dock-modern ${cinemaMode ? 'hidden' : ''}`}>
        <button onClick={handleShare} aria-label="Share">
            <FaShareAlt /><span>Share</span>
        </button>
        <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
            {darkMode ? <FaSun /> : <FaMoon />}<span>Theme</span>
        </button>
        
        {/* Central Floating Action Button */}
        <div className="dock-fab-placeholder" onClick={handleLike}>
          <div className={`dock-fab ${isLiked ? 'liked-pulse' : ''}`}>
            <FaHeart />
          </div>
        </div>
        
        <button onClick={() => setZoom(z => z > 100 ? 100 : 130)} aria-label="Toggle Zoom">
            {zoom > 100 ? <FaSearchMinus /> : <FaSearchPlus />}<span>Zoom</span>
        </button>
        {downloadLink ? (
            <a href={downloadLink} target="_blank" rel="noreferrer" aria-label="Download">
                <FaDownload /><span>Save</span>
            </a>
        ) : (
             <button onClick={() => setCinemaMode(true)} aria-label="Focus Mode">
                <FaEye /><span>Focus</span>
             </button>
        )}
      </nav>
    </div>
  );
};

export default PdfViewer;