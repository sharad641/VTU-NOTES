import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { database, auth, signInAnonymously } from '../firebase';
import { ref, push, onValue, query, limitToLast, orderByChild } from 'firebase/database';
import { FaHeart, FaTimes, FaCoffee, FaBolt, FaCopy, FaCreditCard, FaClock, FaFire } from 'react-icons/fa';
import { FaUserAstronaut } from 'react-icons/fa6';
import { HiOutlineFire } from 'react-icons/hi2';
import './SupportModal.css';

const SupportModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState(20);
  const [supporters, setSupporters] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const presetAmounts = [10, 20, 50, 100, 200, 500];
  const upiId = "sp1771838-1@okaxis";

  useEffect(() => {
    // 1. Immediate Load from LocalStorage (Fastest Feedback)
    const localStored = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
    setSupporters(localStored);

    const signInAndListen = async () => {
        try {
            console.log("Attempting Anonymous Auth...");
            await signInAnonymously(auth);
            console.log("Auth Success");
            
            const donationsRef = query(ref(database, 'donations'), orderByChild('timestamp'), limitToLast(10));
            const unsubscribe = onValue(donationsRef, (snapshot) => {
                const data = snapshot.val();
                console.log("Firebase Data Received:", data);
                
                let firebaseSupporters = [];
                if (data) {
                    firebaseSupporters = Object.values(data);
                }

                // Re-read local storage to be safe
                const currentLocal = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
                
                // Combine: Unique by paymentId if possible, but simple concat & sort is fine for now
                // We map to avoid duplicates if local storage has same item as firebase
                const allItems = [...firebaseSupporters, ...currentLocal];
                const uniqueItems = Array.from(new Map(allItems.map(item => [item.paymentId || item.timestamp, item])).values());

                const sorted = uniqueItems
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 10);

                setSupporters(sorted);
            }, (error) => {
                console.error("Firebase Read Error:", error);
                // On error, we already have local data set initially.
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Auth/Firebase Error:", error);
        }
    };

    signInAndListen();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_live_S7cmd8OGdxBedC"; 

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "VTU Notes For All",
      description: "Support Contribution",
      image: "/logovtu.png",
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: name,
        contact: mobile,
      },
      notes: {
        address: "VTU Notes Support",
      },
      theme: {
        color: "#6366F1",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(`Payment Failed: ${response.error.description}`);
    });
    rzp1.open();
  };

  const handlePaymentSuccess = async (response) => {
    console.log("💰 Razorpay Success Response:", response);
    
    const newSupporter = {
        name: name || 'Anonymous Legend',
        mobile: mobile || 'N/A',
        amount: parseInt(amount),
        timestamp: Date.now(),
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id || 'N/A',
        signature: response.razorpay_signature || 'N/A',
        status: 'success'
    };

    // 1. Fail-Safe: Save to LocalStorage immediately
    try {
        const localStored = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
        localStorage.setItem('vtu_supporters_local', JSON.stringify([newSupporter, ...localStored]));
        console.log("✅ Saved to LocalStorage");
    } catch (e) {
        console.error("LocalStorage Error:", e);
    }

    // 2. Sync to Firebase
    try {
        console.log("📡 Syncing to Firebase Hall of Fame...");
        // Ensure we are using the Realtime Database 'donations' node
        const donationsRef = ref(database, 'donations');
        await push(donationsRef, newSupporter);
        console.log("✨ Firebase Sync Complete!");
    } catch (error) {
        console.error("❌ Firebase Sync Failed:", error);
        alert("Payment was successful, but we had trouble updating the Hall of Fame. Our team will verify it manually!");
    }
    
    alert(`Thank you, ${newSupporter.name}! Your support means the world to us.`);
    onClose();
    // Refresh the local state if needed (though useEffect should catch it via Firebase listener)
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="support-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="support-modal-container"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button moved inside the container but with fixed-like behavior via CSS or absolute top-level */}
            <motion.button
              className="close-modal-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              title="Close Portal"
            >
              <FaTimes />
            </motion.button>

            <div className="modal-inner-scroll">
              <div className="modal-header">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="heart-icon-wrapper"
                >
                  <FaHeart />
                </motion.div>
                <h2>
                  Support <span className="highlight-text">VTUNOTESFORALL</span>
                </h2>
                <p>
                  We are students dedicating our time to manage this platform. 
                  Hosting costs are real. If we helped you, consider supporting us!
                </p>
              </div>

            <form className="support-form" onSubmit={handlePayment}>
              <div className="form-group">
                <label htmlFor="supporterName">Your Name</label>
                <input
                  type="text"
                  id="supporterName"
                  placeholder="Enter your name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number (For UPI)</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  // required removed as per user screenshot might be optional but logic implies need for receipt? 
                  // Keeping standard HTML5 validation for now unless user clears it.
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                />
                <div className="amount-chips">
                    {presetAmounts.map((val) => (
                        <button
                            type="button"
                            key={val}
                            className={`amt-chip ${amount == val ? 'active' : ''}`}
                            onClick={() => setAmount(val)}
                        >
                            ₹{val}
                        </button>
                    ))}
                </div>
              </div>

              <button type="submit" className="pay-now-btn support-glow-btn">
                <span>Support Now</span>
                <FaBolt style={{ marginLeft: '8px' }} />
                <div className="btn-shine"></div>
              </button>
            </form>

            <div className="upi-manual-section">
                <p>Or copy UPI ID manually:</p>
                <div className="upi-copy-box">
                    <span>{upiId}</span>
                    <button onClick={handleCopy} className="copy-btn">
                        {copySuccess ? "Copied!" : <><FaCopy /> Copy</>}
                    </button>
                </div>
            </div>

            {/* Recent Supporters Display */}
            {supporters.length > 0 && (
                <div className="recent-supporters-section">
                    <h3><HiOutlineFire className="hot-icon" /> <span>The Hall of Fame</span></h3>
                    <div className="supporters-list">
                        <AnimatePresence>
                        {supporters.map((s, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="supporter-badge"
                            >
                                <div className="s-avatar">
                                    <FaUserAstronaut />
                                </div>
                                <div className="s-content">
                                    <div className="s-info">
                                        <span className="s-name">{s.name}</span>
                                        <span className="s-date">{formatDate(s.timestamp)}</span>
                                    </div>
                                    <span className="s-amt">₹{s.amount}</span>
                                </div>
                                <div className="badge-glow"></div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
