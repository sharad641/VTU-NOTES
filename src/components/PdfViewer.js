import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import {
  FaDownload, FaShareAlt, FaExpand, FaCompress,
  FaArrowLeft, FaMoon, FaSun,
  FaExternalLinkAlt, FaSearchPlus, FaSearchMinus,
  FaQrcode, FaHistory, FaEye, FaRedoAlt,
  FaSpinner, FaFilePdf, FaBolt
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Component Imports
import AdSenseAd from "./AdSenseAd";
import CommentSection from "./CommentSection";
import "./PdfViewer.css";

// --- UTILS ---
const getDownloadLink = (url) => {
  if (!url) return null;
  try {
    // Extract Google Drive ID
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
  const [loadTime, setLoadTime] = useState(0);
  
  // Appearance & UI States
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches || 
    localStorage.getItem("theme") === "dark"
  );
  const [cinemaMode, setCinemaMode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Modals
  const [showQr, setShowQr] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Interaction States
  const [recentFiles, setRecentFiles] = useState([]);
  const [toast, setToast] = useState(null);
  const [connectionSpeed, setConnectionSpeed] = useState('good');

  // --- DERIVED VALUES ---
  const decodedUrl = decodeURIComponent(pdfUrl || "");
  const embedSrc = decodedUrl?.replace(/(\/view|\/open).*/, "/preview");
  const downloadLink = getDownloadLink(decodedUrl);

  // --- HELPERS ---
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
      console.warn("LocalStorage access failed", e);
    }
  }, []);

  // --- EFFECTS ---

  // 1. Theme Sync
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // 2. Performance Monitoring
  useEffect(() => {
    const startTime = performance.now();
    
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const speed = connection.downlink > 5 ? 'good' : connection.downlink > 1 ? 'medium' : 'slow';
      setConnectionSpeed(speed);
    }

    return () => {
      const endTime = performance.now();
      setLoadTime(Math.round(endTime - startTime));
    };
  }, []);

  // 3. PDF Loading
  useEffect(() => {
    if (!decodedUrl) return;

    const loadStartTime = performance.now();
    setLoading(true);
    setIframeLoaded(false);
    setError(false);

    // Extract filename
    setTimeout(() => {
      try {
        const urlObj = new URL(decodedUrl);
        const pathParts = urlObj.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const cleanName = decodeURIComponent(fileName)
          .replace(/\.pdf$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        setMeta(prev => ({ 
          ...prev, 
          name: cleanName || "Document"
        }));
        addToHistory(cleanName || "Document", decodedUrl);
      } catch {
        setMeta(prev => ({ ...prev, name: "Document" }));
      }
    }, 300);

    // Analytics
    logEvent(analytics, "pdf_view", { 
      url: decodedUrl,
      connection_speed: connectionSpeed
    });

    return () => {
      const loadEndTime = performance.now();
      console.log(`PDF load attempt took: ${Math.round(loadEndTime - loadStartTime)}ms`);
    };
  }, [decodedUrl, addToHistory, connectionSpeed]);

  // 4. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (cinemaMode) setCinemaMode(false);
        if (isFullscreen) document.exitFullscreen();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [cinemaMode, isFullscreen]);

  // --- HANDLERS ---
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen({ navigationUI: 'hide' }).catch(console.log);
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: meta.name,
      text: `Check out this PDF: ${meta.name}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        logEvent(analytics, "pdf_shared");
      } catch (err) {
        console.log("Share cancelled:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification("Link copied to clipboard", "success");
    }
  };

  const handleZoom = (action) => {
    if (action === 'in') {
      setZoom(z => Math.min(z + 25, 200));
    } else if (action === 'out') {
      setZoom(z => Math.max(z - 25, 50));
    } else {
      setZoom(100);
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
    setIframeLoaded(true);
    showNotification("Document loaded successfully", "success");
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
    showNotification("Failed to load document", "warning");
  };

  // --- RENDER ---
  return (
    <div 
      className={`pdf-viewer-container ${cinemaMode ? 'cinema-mode' : ''} ${darkMode ? 'dark-theme' : ''}`}
      ref={viewerRef}
    >
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-content">
            <span>{toast.msg}</span>
          </div>
          <button onClick={() => setToast(null)} className="toast-close">
            <IoClose />
          </button>
        </div>
      )}

      {/* Header */}
      <header className={`viewer-header ${cinemaMode ? 'hidden' : ''}`}>
        <div className="header-left">
          <button 
            onClick={() => navigate(-1)}
            className="nav-btn back-btn"
            aria-label="Go back"
          >
            <FaArrowLeft />
            <span className="btn-label">Back</span>
          </button>
          
          <div className="document-info">
            <div className="doc-icon">
              <FaFilePdf />
            </div>
            <div className="doc-details">
              <h1 className="doc-title" title={meta.name}>
                {meta.name}
              </h1>
              <div className="doc-meta">
                <span className="meta-item">
                  <FaBolt /> {connectionSpeed === 'good' ? 'Fast' : connectionSpeed === 'medium' ? 'Medium' : 'Slow'} connection
                </span>
                <span className="meta-item">
                  • {meta.size}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="header-right">
          {/* Desktop Actions */}
          <div className="action-group">
            <button 
              onClick={() => handleZoom('out')}
              className="action-btn"
              title="Zoom out"
            >
              <FaSearchMinus />
            </button>
            <div className="zoom-display">
              <span>{zoom}%</span>
            </div>
            <button 
              onClick={() => handleZoom('in')}
              className="action-btn"
              title="Zoom in"
            >
              <FaSearchPlus />
            </button>
            
            <div className="divider"></div>
            
            <button
              onClick={() => setCinemaMode(!cinemaMode)}
              className={`action-btn ${cinemaMode ? 'active' : ''}`}
              title="Focus mode"
            >
              <FaEye />
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="action-btn"
              title="Toggle theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            <button
              onClick={() => setShowQr(true)}
              className="action-btn"
              title="QR code"
            >
              <FaQrcode />
            </button>
            
            <button
              onClick={() => setShowHistory(true)}
              className="action-btn"
              title="History"
            >
              <FaHistory />
            </button>
            
            {downloadLink && (
              <a
                href={downloadLink}
                download
                className="download-btn"
                title="Download PDF"
              >
                <FaDownload />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Viewer */}
      <main className="viewer-main">
        {cinemaMode && (
          <div className="cinema-controls">
            <button 
              onClick={() => setCinemaMode(false)}
              className="exit-cinema-btn"
            >
              <IoClose />
              Exit Focus Mode
            </button>
          </div>
        )}

        <div className="viewer-stage">
          {/* Loading Overlay */}
          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="spinner-container">
                  <FaSpinner className="spinner" />
                </div>
                <p className="loading-text">Loading document...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <div className="error-content">
                <div className="error-icon">⚠️</div>
                <h3>Document Unavailable</h3>
                <p>Unable to load the document preview.</p>
                <div className="error-actions">
                  <button 
                    onClick={() => window.location.reload()}
                    className="action-btn primary"
                  >
                    <FaRedoAlt /> Retry
                  </button>
                  <a 
                    href={embedSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn secondary"
                  >
                    <FaExternalLinkAlt /> Open Directly
                  </a>
                  {downloadLink && (
                    <a 
                      href={downloadLink}
                      className="action-btn success"
                    >
                      <FaDownload /> Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          {!error && (
            <div 
              className={`pdf-container ${iframeLoaded ? 'loaded' : ''}`}
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <iframe
                ref={iframeRef}
                src={embedSrc}
                title={`PDF: ${meta.name}`}
                className="pdf-iframe"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="autoplay; fullscreen"
                loading="eager"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          )}
        </div>
      </main>

      {/* Floating Actions - Simplified */}
      <div className={`floating-actions ${cinemaMode ? 'hidden' : ''}`}>
        <button 
          className="floating-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
        
        <button 
          className="floating-btn"
          onClick={handleShare}
          title="Share document"
        >
          <FaShareAlt />
        </button>
      </div>

      {/* QR Modal */}
      {showQr && (
        <div className="modal-overlay" onClick={() => setShowQr(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share via QR Code</h3>
              <button onClick={() => setShowQr(false)} className="modal-close">
                <IoClose />
              </button>
            </div>
            <div className="modal-body">
              <div className="qr-container">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=10&data=${encodeURIComponent(window.location.href)}`}
                  alt="QR Code"
                  className="qr-image"
                />
              </div>
              <p className="qr-instruction">Scan this QR code to open on another device</p>
              <button 
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="copy-link-btn"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="modal wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaHistory /> Recent Documents</h3>
              <button onClick={() => setShowHistory(false)} className="modal-close">
                <IoClose />
              </button>
            </div>
            <div className="modal-body">
              {recentFiles.length === 0 ? (
                <div className="empty-history">
                  <FaHistory size={48} />
                  <p>No recent documents</p>
                </div>
              ) : (
                <div className="history-list">
                  {recentFiles.map((file, index) => (
                    <div 
                      key={index}
                      className="history-item"
                      onClick={() => {
                        const encoded = encodeURIComponent(file.url);
                        navigate(`/view/${encoded}`);
                        setShowHistory(false);
                      }}
                    >
                      <div className="history-icon">
                        <FaFilePdf />
                      </div>
                      <div className="history-details">
                        <h4>{file.name}</h4>
                        <p>{file.date} • {file.time}</p>
                      </div>
                      <FaExternalLinkAlt className="history-arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className={`mobile-bar ${cinemaMode ? 'hidden' : ''}`}>
        <div className="mobile-controls">
          <button 
            onClick={handleShare}
            className="mobile-btn"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="mobile-btn"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>Theme</span>
          </button>
          
          <button 
            onClick={() => setZoom(zoom === 100 ? 130 : 100)}
            className="mobile-btn"
          >
            {zoom > 100 ? <FaSearchMinus /> : <FaSearchPlus />}
            <span>{zoom > 100 ? 'Zoom Out' : 'Zoom In'}</span>
          </button>
          
          {downloadLink ? (
            <a 
              href={downloadLink}
              download
              className="mobile-btn"
            >
              <FaDownload />
              <span>Save</span>
            </a>
          ) : (
            <button 
              onClick={() => setCinemaMode(true)}
              className="mobile-btn"
            >
              <FaEye />
              <span>Focus</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className={`content-area ${cinemaMode ? 'hidden' : ''}`}>
        <div className="ad-section">
          <div className="ad-label">Advertisement</div>
          <AdSenseAd
            adClient="ca-pub-9499544849301534"
            adSlot="7579321744"
            adFormat="auto"
            fullWidthResponsive={true}
          />
        </div>
        <CommentSection />
      </div>
    </div>
  );
};

export default PdfViewer;