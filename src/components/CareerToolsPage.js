import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiBriefcase, HiCpuChip, HiAcademicCap, HiArrowRight, HiMagnifyingGlass,
  HiCurrencyDollar, HiRocketLaunch, HiSparkles 
} from 'react-icons/hi2';
import AdSenseAd from './AdSenseAd';
import { careerArticles } from '../data/careerData';
import './ModelPapersModern.css'; // Main theme

const CareerToolsPage = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const filteredArticles = filter === 'All' 
    ? careerArticles 
    : careerArticles.filter(a => a.category.includes(filter) || (filter === 'High CPC' && a.cpcLevel === 'High'));

  return (
    <main className="papers-portal-root dark" style={{ background: '#020617', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Tech Grid Background */}
      <div className="tech-grid-bg" style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(112, 0, 255, 0.1), transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08), transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

      <div className="portal-container" style={{ paddingTop: '100px', position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '100px 20px 40px' }}>
        
        {/* Futuristic Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-section-advanced"
          style={{ 
            textAlign: 'center', marginBottom: '80px', position: 'relative'
          }}
        >
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
             className="hero-badge-glow"
             style={{ 
                 display: 'inline-flex', alignItems: 'center', gap: '10px', 
                 background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(0, 240, 255, 0.3)', 
                 padding: '8px 20px', borderRadius: '100px', marginBottom: '30px',
                 boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
             }}
           >
               <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                  <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#00F0FF', opacity: 0.75, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '10px', width: '10px', background: '#00F0FF' }}></span>
               </span>
               <span style={{ color: '#00F0FF', fontWeight: '700', letterSpacing: '2px', fontSize: '0.85rem' }}>CAREER OS 2.0</span>
           </motion.div>

           <h1 style={{ 
               fontSize: 'clamp(3rem, 6vw, 5rem)', 
               fontWeight: '900', 
               lineHeight: '1',
               color: 'white',
               marginBottom: '25px',
               textShadow: '0 0 40px rgba(0,0,0,0.5)'
           }}>
               Architect Your <br/>
               <span className="text-glow-cyan" style={{ color: '#00F0FF' }}>Digital Future</span>
           </h1>
           
           <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              The ultimate knowledge base for engineering students. <br/>
              Master <span style={{ color: '#F8FAFC', fontWeight: '600' }}>AI, Cloud, and Cyber Security</span> with our premium roadmaps.
           </p>
        </motion.div>

        {/* Filter Bar (Glass Pill) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
            <div className="filter-pill-group" style={{ 
                background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', padding: '8px'
            }}>
              {['All', 'Software / Tech', 'Career Focus', 'Productivity / Dev Tools'].map(cat => (
                 <button 
                    key={cat} 
                    onClick={() => setFilter(cat)}
                    style={{
                        background: filter === cat ? 'linear-gradient(135deg, #00F0FF, #00A3FF)' : 'transparent',
                        color: filter === cat ? '#020617' : '#94A3B8',
                        border: 'none',
                        padding: '12px 28px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: filter === cat ? '700' : '500',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        boxShadow: filter === cat ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none'
                    }}
                 >
                    {cat}
                 </button>
              ))}
            </div>
        </div>

        {/* Articles Grid (3D Hover Cards) */}
        <div className="papers-high-grid" style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' 
        }}>
           {filteredArticles.map((article, idx) => (
              <React.Fragment key={article.id}>
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05 }}
                   className="gradient-border-card"
                   style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                 >
                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        {article.imageUrl ? (
                            <motion.img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0f172a, #1e293b)' }}></div>
                        )}
                        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                             <span style={{ 
                                 background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                                 color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.3)',
                                 padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'
                             }}>
                                {article.category}
                             </span>
                        </div>
                    </div>

                    <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                       <h3 style={{ fontSize: '1.4rem', color: '#F8FAFC', marginBottom: '15px', fontWeight: '700', lineHeight: '1.3' }}>
                           {article.title}
                       </h3>
                       
                       <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>
                          {article.summary}
                       </p>

                       <button 
                         onClick={() => navigate(`/career-tools/${article.id}`)}
                         className="read-more-btn"
                         style={{ 
                             background: 'rgba(255,255,255,0.05)', 
                             color: 'white', 
                             border: '1px solid rgba(255,255,255,0.1)',
                             padding: '14px', borderRadius: '12px',
                             display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                             fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease'
                         }}
                         onMouseEnter={(e) => {
                             e.currentTarget.style.background = '#00F0FF';
                             e.currentTarget.style.color = '#020617';
                             e.currentTarget.style.borderColor = '#00F0FF';
                         }}
                         onMouseLeave={(e) => {
                             e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                             e.currentTarget.style.color = 'white';
                             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                         }}
                       >
                          READ GUIDE <HiArrowRight />
                       </button>
                    </div>
                 </motion.div>

                 {/* In-Feed Ad (Clean & Minimal) */}
                 {(idx + 1) % 5 === 0 && (
                    <div style={{ 
                        gridColumn: '1 / -1',
                        background: 'rgba(15, 23, 42, 0.4)', 
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginTop: '20px', marginBottom: '20px'
                    }}>
                       <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
                            <p style={{ color: '#475569', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '15px', textTransform: 'uppercase' }}>Sponsored Content</p>
                            <AdSenseAd 
                                adClient="ca-pub-9499544849301534" 
                                adSlot="3936951010" 
                                adFormat="fluid" 
                                layoutKey="-fb+5w+4e-db+86"
                                style={{ display: 'block', width: '100%' }}
                            />
                       </div>
                    </div>
                 )}
              </React.Fragment>
           ))}
        </div>

        <div style={{ margin: '80px auto', maxWidth: '800px' }}>
           <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="5502713194" adFormat="autorelaxed" />
        </div>

      </div>
    </main>
  );
};

export default CareerToolsPage;
