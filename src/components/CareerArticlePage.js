import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiArrowLeft, HiCalendar, HiTag, HiClock, 
  HiSpeakerWave, HiPause, HiBookmark 
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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrollTop / docHeight) * 100;
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="reading-progress-container">
       <div className="reading-progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const CareerArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = careerArticles.find(a => a.id === parseInt(id));
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Extract headings for TOC
  const toc = useMemo(() => {
      if(!article?.fullContent) return [];
      return article.fullContent
        .filter(block => block.type === 'h3')
        .map(block => block.text);
  }, [article]);

  const scrollToSection = (text) => {
      const id = text.replace(/\\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if(element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => window.speechSynthesis.cancel();
  }, [id]);

  if (!article) return <div>Not Found</div>;

  return (
    <div className="papers-portal-root dark" style={{ background: '#0B1120', minHeight: '100vh' }}>
      <ReadingProgressBar />
      
      {/* Navbar Placeholder */}
      <div style={{ height: '80px' }}></div>

      <div className="portal-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px 80px' }}>
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => navigate('/career-tools')}
          style={{ background: 'transparent', border: 'none', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}
        >
          <HiArrowLeft /> BACK TO CAREER HUB
        </button>

        <div className="article-page-layout">
            
            {/* LEFT: Sticky Sharing Actions */}
            <aside>
                <div className="sticky-left-actions">
                    <button className="action-btn" title="Listen to Article" onClick={handleSpeak} style={isSpeaking ? { color: '#34D399', borderColor: '#34D399' } : {}}>
                        {isSpeaking ? <HiPause /> : <HiSpeakerWave />}
                    </button>
                    <button className="action-btn" title="Save Bookmark">
                        <HiBookmark />
                    </button>
                    <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>
                    <button className="action-btn" title="Share on WhatsApp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`)}>
                        <RiWhatsappLine />
                    </button>
                    <button className="action-btn" title="Share on Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`)}>
                        <RiTwitterXLine />
                    </button>
                    <button className="action-btn" title="Share on LinkedIn" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}>
                        <RiLinkedinLine />
                    </button>
                    <button className="action-btn" title="Copy Link" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                        <RiLinksLine />
                    </button>
                </div>
            </aside>

            {/* CENTER: Main Content */}
            <main>
                <article>
                    
                    {/* Premium Hero */}
                    <div className="article-hero-modern">
                        <div className="hero-pill">
                            <HiTag /> {article.category}
                        </div>
                        <h1>{article.title}</h1>
                        
                        <div className="author-strip">
                            <div className="author-info">
                                <div className="author-avatar">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="Author" />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ color: 'white', fontWeight: '600' }}>VTU Editorial Team</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Posted on {article.date}</div>
                                </div>
                            </div>
                            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <HiClock style={{ color: '#34D399' }} /> {article.readingTime || '5 min read'}
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {article.imageUrl && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="article-featured-image"
                        >
                            <img src={article.imageUrl} alt={article.title} />
                        </motion.div>
                    )}

                    {/* Key Takeaways */}
                    {article.takeaways && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="key-takeaways-box"
                        >
                            <h3><HiBookmark /> Key Takeaways</h3>
                            <ul className="key-takeaways-list">
                                {article.takeaways.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* Ad Spot */}
                    <div style={{ margin: '40px 0', minHeight: '280px', background: 'rgba(30,41,59,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="3936951010" />
                    </div>

                    {/* Content Rendering */}
                    <div className="article-typography">
                        <motion.p 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="lead-summary"
                        >
                            {article.summary}
                        </motion.p>

                        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '40px 0' }}></div>

                        {article.fullContent && article.fullContent.map((block, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {block.type === 'h3' && (
                                    <h3 id={block.text.replace(/\s+/g, '-').toLowerCase()}>
                                        {block.text}
                                    </h3>
                                )}
                                
                                {block.type === 'p' && <p>{block.text}</p>}
                                
                                {block.type === 'ul' && (
                                    <ul>
                                        {block.items.map((item, idx) => <li key={idx}>{item}</li>)}
                                    </ul>
                                )}
                                
                                {block.type === 'tip' && (
                                    <div className="pro-tip-box">
                                        <strong>Pro Tip</strong>
                                        <div>{block.text}</div>
                                    </div>
                                )}

                                {block.type === 'warning' && (
                                    <div className="warning-box">
                                        <strong>⚠️ {block.title || 'Important'}</strong>
                                        <div>{block.text}</div>
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
                                    <div className="code-block">
                                        <div className="code-header">
                                            <span>{block.language || 'Code'}</span>
                                        </div>
                                        <pre>
                                            <code>{block.code}</code>
                                        </pre>
                                    </div>
                                )}

                                {block.type === 'step' && (
                                    <div className="timeline-step">
                                        <div className="step-marker"></div>
                                        <div className="step-content">
                                            <h4>{block.title}</h4>
                                            <p>{block.text}</p>
                                        </div>
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

                </article>
            </main>

            {/* RIGHT: Sidebar (TOC + Ads) */}
            <aside style={{ display: 'none', lg: { display: 'block' } }}>
                <div style={{ position: 'sticky', top: '120px' }}>
                   
                   {/* TOC Widget */}
                   <div className="sidebar-widget">
                       <div className="widget-title">Table of Contents</div>
                       <nav>
                          {toc.map((head, i) => (
                              <a 
                                  key={i} 
                                  onClick={() => scrollToSection(head)}
                                  className="toc-link-modern"
                                  style={{ cursor: 'pointer' }}
                              >
                                  {head}
                              </a>
                          ))}
                       </nav>
                   </div>

                   {/* Ad Widget */}
                   <div className="sidebar-widget" style={{ padding: '10px' }}>
                        <div className="widget-title" style={{ paddingLeft: '10px' }}>SPONSORED</div>
                        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" style={{ minHeight: '300px' }} />
                   </div>

                </div>
            </aside>

        </div>
        
        {/* Footer Ad */}
        <div style={{ marginTop: '80px', maxWidth: '800px', margin: '80px auto 0' }}>
             <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="5502713194" adFormat="autorelaxed" />
        </div>

      </div>
    </div>
  );
};

export default CareerArticlePage;
