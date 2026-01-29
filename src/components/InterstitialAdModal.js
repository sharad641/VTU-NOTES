import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiClock } from 'react-icons/hi2';
import AdSenseAd from './AdSenseAd';
import './InterstitialAdModal.css';

const InterstitialAdModal = ({ isOpen, onClose, onComplete, resourceTitle }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(5);
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
  }, [isOpen]);

  const handleClose = () => {
    if (canClose) {
      onComplete();
    }
  };

  return (
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
              <button 
                className={`close-modal-btn ${!canClose ? 'disabled' : ''}`} 
                onClick={handleClose}
                disabled={!canClose}
              >
                <HiXMark />
              </button>
            </div>

            <div className="modal-body">
              <p className="support-msg">
                Please wait <strong>{timeLeft}s</strong> to support us.
                <br />
                <span className="sub-msg">Your resource "{resourceTitle}" is loading...</span>
              </p>

              <div className="ad-container-modal">
                <AdSenseAd
                  adClient="ca-pub-9499544849301534"
                  adSlot="3936951010" // Using a display unit
                  adFormat="rectangle"
                  fullWidthResponsive={true}
                  style={{ display: 'block', minHeight: '250px' }}
                />
              </div>

              <div className="action-area">
                {canClose ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="continue-btn"
                    onClick={handleClose}
                  >
                    Continue to Resource
                  </motion.button>
                ) : (
                  <div className="timer-badge">
                    <HiClock className="spin-icon" />
                    <span>Please Wait {timeLeft}s...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InterstitialAdModal;
