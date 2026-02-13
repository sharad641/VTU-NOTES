import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiArrowLeft, HiCalendar, HiTag, HiClock, 
  HiSpeakerWave, HiPause, HiBookmark, HiListBullet, HiHeart, HiShare 
} from 'react-icons/hi2';
import { RiWhatsappLine, RiTwitterXLine, RiLinkedinLine, RiLinksLine } from 'react-icons/ri';
import AdSenseAd from './AdSenseAd';
import { careerArticles } from '../data/careerData';
import './ModelPapersModern.css'; 
import './CareerArticleReader.css'; 

// Helper: Reading Progress
const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let requestRunning = null;
    const handleScroll = () => {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const pct = (scrollTop / docHeight) * 100;
          setProgress(pct);
          requestRunning = null;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="reading-progress-container">
       <div className="reading-progress-bar" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
    </div>
  );
};

const CareerArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = careerArticles.find(a => a.id === parseInt(id));
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [claps, setClaps] = useState(Math.floor(Math.random() * 500) + 120);
  const [isClapped, setIsClapped] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Extract headings for TOC
  const toc = useMemo(() => {
      if(!article?.fullContent) return [];
      return article.fullContent
        .filter(block => block.type === 'h3')
        .map(block => block.text.replace(/^[\d\.]+\s*|^\d+️⃣\s*/, ''));
  }, [article]);

  const scrollToSection = (text) => {
      const id = text.replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if(element) {
          const offset = 100; // Header offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
          setShowMobileMenu(false);
      }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = article.fullContent.map(b => b.text || b.items?.join('. ')).join('. ');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleClap = () => {
      if(!isClapped) {
          setClaps(prev => prev + 1);
          setIsClapped(true);
      }
  };

  const handleShare = () => {
      if (navigator.share) {
          navigator.share({
              title: article.title,
              text: article.summary,
              url: window.location.href,
          });
      } else {
          // Fallback or just ignore if not supported
          alert("Share link copied to clipboard!");
          navigator.clipboard.writeText(window.location.href);
      }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => window.speechSynthesis.cancel();
  }, [id]);

  if (!article) return <div>Not Found</div>;

  return (
    <div className={`papers-portal-root dark ${isFocusMode ? 'focus-mode-active' : ''}`} style={{ background: '#0B1120', minHeight: '100vh' }}>
      <ReadingProgressBar />
      
      {/* Navbar Placeholder - Hidden in Focus Mode */}
      {!isFocusMode && <div style={{ height: '80px' }}></div>}

      {/* --- IMMERSIVE PARALLAX HERO --- */}
      <div className="immersive-hero-container">
          {article.imageUrl && (
            <div className="immersive-hero-bg">
                <img src={article.imageUrl} alt="Background" />
                <div className="hero-overlay-gradient"></div>
            </div>
          )}
          
          <div className="immersive-hero-content">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                  <div className="hero-badges">
                      <span className="hero-pill">{article.category}</span>
                      <span className="hero-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                        {article.readingTime || '5 min read'}
                      </span>
                  </div>
                  
                  <h1 className="hero-title-main">{article.title}</h1>
                  
                  <div className="hero-meta-row">
                      <div className="author-group">
                          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="Author" className="author-img-lg" />
                          <div className="author-text">
                              <span className="name">VTU Editorial</span>
                              <span className="date">{article.date}</span>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </div>
      </div>

      <div className="portal-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 80px' }}>
        
        {/* Breadcrumb / Back - Hidden in Focus Mode */}
        {!isFocusMode && (
            <button 
              onClick={() => navigate('/career-tools')}
              className="back-nav-btn"
            >
              <HiArrowLeft /> BACK TO CAREER HUB
            </button>
        )}

        <div className="article-page-layout">
            
          {/* LEFT: Sidebar (Hidden in Focus/Mobile) */}
          {!isFocusMode && (
              <aside className="left-sidebar">
                  <div className="sticky-left-actions">
                      <button className="action-btn" title="Focus Mode" onClick={() => setIsFocusMode(true)}>
                          <HiBookmark />
                      </button>
                      <button className="action-btn" title="Listen" onClick={handleSpeak}>
                          {isSpeaking ? <HiPause /> : <HiSpeakerWave />}
                      </button>
                      <div className="divider-vertical"></div>
                      <button className="action-btn" onClick={handleShare}>
                          <HiShare />
                      </button>
                  </div>
              </aside>
          )}

          {/* CENTER: Main Content */}
          <main className={isFocusMode ? 'focus-content' : ''}>
              <article>
                  {/* Hero Removed (handled above) */}
                  {/* Featured Image removed (parallax handles it) */}

                    {/* Key Takeaways - Redesigned */}
                    {article.takeaways && (
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="key-takeaways-modern"
                        >
                            <div className="takeaways-header">
                                <span className="icon-box"><HiBookmark /></span>
                                <h3>Key Takeaways</h3>
                            </div>
                            <div className="takeaways-grid">
                                {article.takeaways.map((point, i) => (
                                    <div key={i} className="takeaway-card">
                                        <span className="t-num">0{i+1}</span>
                                        <p>{point}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Ad Spot */}
                    <div style={{ margin: '40px 0', minHeight: '280px', background: 'rgba(30,41,59,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />
                    </div>

                    {/* Content Rendering */}
                    <div className="article-typography">
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          className="lead-summary-modern"
                        >
                            {article.summary}
                        </motion.p>
                        
                        <div className="article-divider"></div>

                        {article.fullContent && article.fullContent.map((block, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {block.type === 'h3' && (
                                    <h3 id={block.text.replace(/\s+/g, '-').toLowerCase()} className="section-heading-modern">
                                        {block.text}
                                    </h3>
                                )}
                                
                                
                                {block.type === 'p' && (
                                    <p>
                                        {block.text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
                                            const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                                            if (match) {
                                                return <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer" className="modern-link">{match[1]}</a>;
                                            }
                                            return part;
                                        })}
                                    </p>
                                )}
                                
                                {block.type === 'ul' && (
                                    <ul className="modern-list">
                                        {block.items.map((item, idx) => <li key={idx}>{item}</li>)}
                                    </ul>
                                )}
                                
                                {block.type === 'tip' && (
                                    <div className="pro-tip-box-modern">
                                        <div className="tip-icon">💡</div>
                                        <div className="tip-content">
                                            <strong>PRO TIP</strong>
                                            <p>{block.text}</p>
                                        </div>
                                    </div>
                                )}

                                {block.type === 'warning' && (
                                    <div className="warning-box-modern">
                                        <div className="warn-icon">⚠️</div>
                                        <div className="warn-content">
                                            <strong>IMPORTANT</strong>
                                            <p>{block.text}</p>
                                        </div>
                                    </div>
                                )}

                                {block.type === 'table' && (
                                    <div className="table-responsive-container">
                                        <table className="article-table">
                                            <thead>
                                                <tr>
                                                    {block.headers.map((h, hIdx) => <th key={hIdx}>{h}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {block.rows.map((row, rIdx) => (
                                                    <tr key={rIdx}>
                                                        {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {block.type === 'code' && (
                                    <div className="code-block" style={{ position: 'relative' }}>
                                        <div className="code-header">
                                            <span>{block.language || 'Code'}</span>
                                            <button 
                                                className="copy-btn"
                                                onClick={(e) => {
                                                    navigator.clipboard.writeText(block.code);
                                                    const btn = e.target;
                                                    btn.innerText = 'Copied!';
                                                    setTimeout(() => btn.innerText = 'Copy', 2000);
                                                }}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <pre><code>{block.code}</code></pre>
                                    </div>
                                )}
                                
                                {block.type === 'step' && (
                                    <div className="step-card-modern">
                                        <div className="step-header">
                                            <h4>{block.title}</h4>
                                        </div>
                                        <p>{block.text}</p>
                                    </div>
                                )}

                                {block.type === 'image' && (
                                    <figure className="article-embedded-image">
                                        <img src={block.src} alt={block.alt} />
                                        {block.caption && <figcaption>{block.caption}</figcaption>}
                                    </figure>
                                )}
                            </motion.div>
                        ))}
                    </div>

                      {/* --- Engagement Section --- */}
                      <div className="engagement-section">
                          <div className="engagement-buttons">
                              <button 
                                className={`clap-btn-large ${isClapped ? 'clapped' : ''}`} 
                                onClick={handleClap}
                              >
                                  <HiHeart className={isClapped ? 'filled' : ''} />
                                  <span className="clap-count-badge">{claps}</span>
                              </button>
                              
                              <button 
                                className="share-btn-large" 
                                onClick={handleShare}
                              >
                                  <HiShare />
                                  <span>Share</span>
                              </button>
                          </div>
                          <p className="engagement-text">
                              Liked by <strong>{claps} future engineers</strong>. <br/>
                              Help others find this by sharing!
                          </p>
                      </div>

                      {/* --- NEXT ARTICLE RECOMMENDATION --- */}
                      {(() => {
                          const currentIndex = careerArticles.findIndex(a => a.id === article.id);
                          const nextIndex = (currentIndex + 1) % careerArticles.length;
                          const nextArticle = careerArticles[nextIndex];
                          
                          return (
                              <div className="next-article-card" onClick={() => navigate(`/career-tools/${nextArticle.id}`)}>
                                  <div className="next-label">READ NEXT</div>
                                  <h3 className="next-title">{nextArticle.title}</h3>
                                  <div className="next-arrow">Read Article →</div>
                              </div>
                          );
                      })()}
                  </article>
              </main>

          {/* RIGHT: TOC Sidebar */}
          {!isFocusMode && (
              <aside className="right-sidebar">
                  <div style={{ position: 'sticky', top: '120px' }}>
                     <div className="sidebar-widget toc-widget-modern">
                         <div className="widget-title">
                             <span className="pulse-dot"></span>
                             ON THIS PAGE
                         </div>
                         <nav className="toc-nav">
                            {toc.map((head, i) => (
                                <a 
                                    key={i} 
                                    onClick={() => scrollToSection(head)}
                                    className="toc-link-item"
                                >
                                    <span className="toc-num">{(i+1).toString().padStart(2, '0')}</span>
                                    {head}
                                </a>
                            ))}
                         </nav>
                     </div>
                     
                     <div style={{ marginTop: '20px' }}>
                        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" style={{ minHeight: '300px' }} />
                     </div>
                  </div>
              </aside>
          )}

      </div>
      </div>
      
      {/* Footer Ad */}
      <div style={{ maxWidth: '800px', margin: '60px auto' }}>
           <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="5502713194" adFormat="autorelaxed" />
      </div>

      {/* --- MOBILE BOTTOM GLASS BAR --- */}
      <div className="mobile-bottom-bar">
          <div className={`mobile-action-icon ${isClapped ? 'active' : ''}`} onClick={handleClap}>
              <HiHeart />
          </div>
          <div className="mobile-action-icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <HiListBullet />
          </div>
          <div className="mobile-action-icon" onClick={handleShare}>
              <HiShare />
          </div>
      </div>
      
      {/* Mobile TOC Sheet (Simple implementation) */}
      {showMobileMenu && (
          <div style={{
              position: 'fixed', bottom: '100px', left: '20px', right: '20px',
              background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)',
              padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
              zIndex: 101, maxHeight: '50vh', overflowY: 'auto'
          }}>
              <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '1.1rem' }}>Table of Contents</h4>
              {toc.map((head, i) => (
                <div key={i} onClick={() => scrollToSection(head)} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                    {head}
                </div>
              ))}
          </div>
      )}

    </div>
  );
};

export default CareerArticlePage;
