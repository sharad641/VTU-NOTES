import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2'; 
import AdSenseAd from './AdSenseAd';
import './InterstitialAdModal.css';

const InterstitialAdModal = ({ isOpen, onComplete, resourceTitle, isVideoAd = false }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const duration = isVideoAd ? 10 : 5;
      setTimeLeft(duration);
      setCanClose(false);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, isVideoAd]);

  const handleClose = () => {
    if (canClose) {
      onComplete();
    }
  };

  // Use Portal to render outside root/stacking contexts
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="interstitial-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="interstitial-modal"
          >
            <div className="modal-header">
              <h3>Unlock Resource</h3>
              <div className="header-actions">
                {canClose ? (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="interstitial-close-btn" 
                    onClick={handleClose}
                  >
                    <HiXMark />
                  </motion.button>
                ) : (
                  <div className="header-timer">
                    <span className="timer-count">{timeLeft}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-body">
              <div className="ad-container-modal">
                <AdSenseAd
                  adClient="ca-pub-9499544849301534"
                  adSlot="3936951010"
                  adFormat="rectangle"
                  fullWidthResponsive={true}
                  style={{ display: 'block', minHeight: '250px' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default InterstitialAdModal;
