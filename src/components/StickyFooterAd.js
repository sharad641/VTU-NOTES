import React, { useState, useEffect } from 'react';
import AdSenseAd from './AdSenseAd';
import { HiXMark } from 'react-icons/hi2';
import './StickyFooterAd.css';

const StickyFooterAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible || !isMobile) return null;

  return (
    <div className="sticky-footer-ad-container">
      <button className="sticky-ad-close" onClick={() => setIsVisible(false)}>
        <HiXMark />
      </button>
      <div className="sticky-ad-content">
        <AdSenseAd 
          adClient="ca-pub-9499544849301534" 
          adSlot="3936951010" 
          style={{ width: '320px', height: '50px', margin: '0 auto' }}
          format=""
        />
      </div>
    </div>
  );
};

export default StickyFooterAd;
