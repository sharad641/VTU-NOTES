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
    <div className="papers-portal-root dark" style={{ background: '#030712', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '800px', background: 'radial-gradient(circle at 50% 10%, rgba(112, 0, 255, 0.15), transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05), transparent 70%)', pointerEvents: 'none' }}></div>

      <div className="portal-container" style={{ paddingTop: '120px', position: 'relative', zIndex: 2 }}>
        
        {/* Header Ad */}
        <div style={{ marginBottom: '40px' }}>
           <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" style={{ minHeight: '150px' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="papers-hero-card"
          style={{ 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.9) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px'
          }}
        >
           <div className="hero-brand">
              <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '8px', 
                  background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', 
                  padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', 
                  fontWeight: '700', marginBottom: '20px', letterSpacing: '1px'
              }}>
                  <HiSparkles /> CAREER ACCELERATOR 2026
              </div>

              <h1 style={{ 
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                  letterSpacing: '-1px', 
                  background: 'linear-gradient(to right, #fff, #94a3b8)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 20px 0'
              }}>
                  Build Your Future <br/>
                  <span style={{ color: '#00F0FF', WebkitTextFillColor: '#00F0FF' }}>In Tech.</span>
              </h1>
              
              <p className="hero-p" style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '600px' }}>
                 Premium resources, 3D interactive roadmaps, and insider guides to help you land high-paying roles in 2026.
              </p>
           </div>

           <div className="hero-stats-island" style={{ gap: '20px' }}>
              <div className="hero-stat" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <span className="stat-value" style={{ color: '#00F0FF', textShadow: '0 0 20px rgba(0,240,255,0.5)' }}><HiCurrencyDollar /></span>
                 <span className="stat-tag">High Pay</span>
              </div>
              <div className="hero-stat" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <span className="stat-value" style={{ color: '#7000FF', textShadow: '0 0 20px rgba(112,0,255,0.5)' }}><HiRocketLaunch /></span>
                 <span className="stat-tag">Fast Growth</span>
              </div>
           </div>
        </motion.div>

        {/* Filter Bar */}
        <div className="papers-island-controls" style={{ margin: '40px 0' }}>
           <div className="filter-pill-group" style={{ overflowX: 'auto', padding: '5px' }}>
              {['All', 'Software / Tech', 'Career Focus', 'Productivity / Dev Tools', 'Projects'].map(cat => (
                 <button 
                    key={cat} 
                    onClick={() => setFilter(cat)}
                    className={`cat-chip ${filter === cat ? 'active' : ''}`}
                    style={{
                        background: filter === cat ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                        color: filter === cat ? '#00F0FF' : '#94A3B8',
                        border: filter === cat ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease'
                    }}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

        {/* Articles Grid */}
        <div className="papers-high-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
           {filteredArticles.map((article, idx) => (
              <React.Fragment key={article.id}>
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.1 }}
                   className="paper-high-card"
                   style={{ 
                       background: 'rgba(15, 23, 42, 0.6)',
                       border: '1px solid rgba(255, 255, 255, 0.05)',
                       borderRadius: '20px',
                       overflow: 'hidden',
                       display: 'flex', 
                       flexDirection: 'column',
                       backdropFilter: 'blur(10px)',
                       transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                   }}
                   whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0, 240, 255, 0.15)', borderColor: 'rgba(0, 240, 255, 0.3)' }}
                 >
                    {/* Image Thumbnail */}
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                        {article.imageUrl ? (
                            <img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e293b, #0f172a)' }}></div>
                        )}
                        <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
                             <span className="paper-type-tag" style={{ 
                                 background: 'rgba(0,0,0,0.6)', 
                                 backdropFilter: 'blur(4px)',
                                 color: '#00F0FF', 
                                 border: '1px solid rgba(0, 240, 255, 0.2)',
                                 fontSize: '0.75rem'
                             }}>
                                {article.category}
                             </span>
                        </div>
                    </div>

                    <div className="paper-card-body" style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                       <h3 style={{ fontSize: '1.25rem', color: '#F1F5F9', marginBottom: '15px', lineHeight: '1.4' }}>{article.title}</h3>
                       
                       <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                          {article.summary}
                       </p>

                       <div className="paper-card-footer" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <button 
                            className="paper-prime-btn view" 
                            style={{ 
                                background: 'transparent', 
                                color: '#00F0FF', 
                                width: '100%', 
                                border: '1px solid rgba(0, 240, 255, 0.2)',
                                padding: '12px',
                                borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => navigate(`/career-tools/${article.id}`)}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                             Read Article <HiArrowRight />
                          </button>
                       </div>
                    </div>
                 </motion.div>

                 {/* Inject Ad after every 3rd item */}
                 {(idx + 1) % 4 === 0 && (
                    <div className="ad-card-container paper-high-card" style={{ 
                        gridColumn: '1 / -1',
                        background: 'rgba(0,0,0,0.2)', 
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        padding: '20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        minHeight: '200px'
                    }}>
                       <AdSenseAd 
                          adClient="ca-pub-9499544849301534" 
                          adSlot="3936951010" 
                          adFormat="fluid" 
                          layoutKey="-fb+5w+4e-db+86"
                          style={{ display: 'block', width: '100%' }}
                       />
                    </div>
                 )}
              </React.Fragment>
           ))}
        </div>

        <div style={{ margin: '80px 0' }}>
           <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="5502713194" adFormat="autorelaxed" />
        </div>

      </div>
    </div>
  );
};

export default CareerToolsPage;
