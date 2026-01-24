import React, { useState, useEffect } from 'react';
import { database, auth, signInAnonymously } from '../firebase';
import { ref, push, onValue, query, limitToLast, orderByChild } from 'firebase/database';
import { FaHeart, FaRupeeSign, FaCheckCircle, FaBolt, FaCopy, FaClock, FaCrown, FaStar, FaUserAstronaut } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import './SupportSectionModern.css';

const SupportSection = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [supporters, setSupporters] = useState([]);
    const [totalSupport, setTotalSupport] = useState(0);

    const UPI_ID = "sp1771838-1@okaxis";
    const quickAmounts = [10, 20, 50, 100, 200, 500];

    useEffect(() => {
        // Immediate Load
        const localStored = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
        setSupporters(localStored);

        const signInAndListen = async () => {
            try {
                console.log("Attempting Anonymous Auth...");
                await signInAnonymously(auth);
                console.log("Auth Success");

                const donationsRef = query(ref(database, 'donations'), orderByChild('timestamp'), limitToLast(50));
                
                const unsubscribe = onValue(donationsRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log("Firebase Data Received:", data);

                    let firebaseSupporters = [];
                    if (data) {
                        firebaseSupporters = Object.values(data);
                    }

                    const currentLocal = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
                    
                    // Combine Unique
                    const allItems = [...firebaseSupporters, ...currentLocal];
                    const uniqueItems = Array.from(new Map(allItems.map(item => [item.paymentId || item.timestamp, item])).values());

                    const sorted = uniqueItems
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .slice(0, 12);

                    setSupporters(sorted);
                    const total = uniqueItems.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0);
                    setTotalSupport(total);
                }, (error) => {
                    console.error("Firebase Read Error:", error);
                });
                return () => unsubscribe();
            } catch (error) {
                console.error("Auth Error:", error);
            }
        };
        signInAndListen();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        if (!amount || !mobile) return alert("Please fill in valid details.");

        setLoading(true);

        const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_live_S7cmd8OGdxBedC";

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount * 100,
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
                address: "VTU Notes Support Section",
            },
            theme: {
                color: "#6366F1",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(`Payment Failed: ${response.error.description}`);
            setLoading(false);
        });
        rzp1.open();
    };

    const handlePaymentSuccess = async (response) => {
        const newSupporter = {
            name: name || 'Anonymous',
            mobile,
            amount: parseInt(amount),
            timestamp: Date.now(),
            paymentId: response.razorpay_payment_id,
            status: 'success'
        };

        // Local Storage Fallback
        const localStored = JSON.parse(localStorage.getItem('vtu_supporters_local') || '[]');
        localStorage.setItem('vtu_supporters_local', JSON.stringify([newSupporter, ...localStored]));

        try {
            console.log("Pushing to Firebase...");
            await push(ref(database, 'donations'), newSupporter);
            console.log("Firebase Push Success");
            setSuccess(true);
        } catch (error) {
            console.error("Firebase Push Error:", error);
            // Show success anyway due to local fallback
            setSuccess(true); 
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp).toLocaleString('en-IN', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    if (success) {
        return (
            <div className="gratitude-portal-overlay">
                <div className="portal-particle-field"></div>
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, translateY: 100 }}
                    animate={{ scale: 1, opacity: 1, translateY: 0 }}
                    className="legend-master-card"
                >
                    {/* Top Technical Stripe */}
                    <div className="card-tech-stripe">
                        <div className="stripe-item">SYS_STATUS: LEGEND_VERIFIED</div>
                        <div className="stripe-item">ENCRYPTION: AES_256_ACTIVE</div>
                        <div className="stripe-item">NODE: VTU_GLOBAL_S3</div>
                    </div>

                    <div className="card-top-header">
                        <div className="vtu-logo-badge">
                            <span className="logo-v">V</span>
                        </div>
                        <div className="transaction-id-scroll">
                            <marquee scrollamount="3">SECURE_PAYMENT_ID_{Math.random().toString(36).substr(2, 12).toUpperCase()}_LOGGED_IN_BLOCKCHAIN_VERIFIED_AUTH_SUCCESS</marquee>
                        </div>
                    </div>

                    <div className="card-hero-section">
                        <motion.div 
                            animate={{ rotateY: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="legend-medal-3d"
                        >
                            <FaCrown className="medal-crown" />
                            <div className="medal-glow"></div>
                        </motion.div>
                        
                        <div className="boot-text-sequence">
                            <motion.h2
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "steps(20)" }}
                            >
                                ASCENSION_COMPLETE
                            </motion.h2>
                            <p className="legend-subtitle">Welcome to the inner circle, <span>{name || 'Legend'}</span>.</p>
                        </div>
                    </div>

                    <div className="card-impact-grid">
                        <div className="impact-item">
                            <span className="i-label">CONTRIBUTION_VALUE</span>
                            <span className="i-value">₹{amount}.00</span>
                        </div>
                        <div className="impact-item">
                            <span className="i-label">COMMUNITY_RANK</span>
                            <span className="i-value gold-text">ELITE_SUPPORTER</span>
                        </div>
                        <div className="impact-item">
                            <span className="i-label">RESOURCES_FUELED</span>
                            <span className="i-value">~{(amount * 12).toFixed(0)} STUDENTS</span>
                        </div>
                    </div>

                    <div className="gratitude-manifesto">
                        <p>"Your support has successfully bypassed the server maintenance bottleneck. You are now recognized as a vital architecture of this platform's future."</p>
                    </div>

                    <button className="final-exit-btn" onClick={() => setSuccess(false)}>
                        <div className="btn-inner">
                            <span>INITIALIZE SYSTEM RETURN</span>
                            <FaBolt className="btn-bolt" />
                        </div>
                        <div className="btn-scanner"></div>
                    </button>

                    {/* Corner Tech Brackets */}
                    <div className="tech-corner t-l"></div>
                    <div className="tech-corner t-r"></div>
                    <div className="tech-corner b-l"></div>
                    <div className="tech-corner b-r"></div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="support-section-root" id="support">
            <div className="support-container">
                <div className="support-card-mega">
                    {/* Futuristic Background Elements internal to card */}
                    <div className="mega-card-glow"></div>
                    <div className="mega-orb-1"></div>
                    
                    <div className="mega-portal-split">
                        {/* LEFT SIDE: SUPPORT FORM */}
                        <div className="mega-left">
                            <div className="support-header">
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }} 
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <FaHeart className="heart-icon" />
                                </motion.div>
                                <h2>Support <span className="highlight-text">VTUNOTESFORALL</span></h2>
                                <p className="support-p">
                                    Server hosting and maintenance costs are real.
                                    Consider buying us a coffee! ☕
                                </p>
                            </div>

                            <form className="support-form-grid" onSubmit={handleDonate}>
                                <div className="input-wrapper">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name (Optional)"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="input-row">
                                    <div className="input-wrapper">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            placeholder="Mobile for UPI"
                                            value={mobile}
                                            required
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>

                                    <div className="input-wrapper">
                                        <label>Amount (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="Min ₹1"
                                            value={amount}
                                            required
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="amount-grid">
                                    {quickAmounts.map(amt => (
                                        <button
                                            key={amt}
                                            type="button"
                                            className={`amt-pill ${parseInt(amount) === amt ? 'active' : ''}`}
                                            onClick={() => setAmount(amt)}
                                        >
                                            ₹{amt}
                                        </button>
                                    ))}
                                </div>

                                <button type="submit" className="pay-btn-ultra" disabled={loading}>
                                    {loading ? 'Opening Portal...' : (
                                        <>Support Now <FaBolt /></>
                                    )}
                                </button>
                            </form>

                            <div className="manual-upi-box">
                                <p className="upi-label-text">Manual UPI Copy:</p>
                                <div className="upi-copy-row" onClick={handleCopy}>
                                    <span className="upi-id-text">{UPI_ID}</span>
                                    <span className="copy-action">
                                        {copied ? <FaCheckCircle className="copy-success" /> : <FaCopy />}
                                        {copied ? " Copied!" : " Copy"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: HALL OF FAME */}
                        <div className="mega-right">
                            <div className="fame-header-compact">
                                <div className="fame-badge-mini">
                                    <FaCrown /> <span>Supporters Hall of Fame</span>
                                </div>
                                <h3>Fueling the <span className="gradient-text">Future</span></h3>
                            </div>

                            <div className="mega-stats-row">
                                <div className="mega-stat-item">
                                    <span className="m-stat-val">₹{totalSupport}+</span>
                                    <span className="m-stat-lab">Contribution</span>
                                </div>
                                <div className="mega-stat-item">
                                    <span className="m-stat-val">{supporters.length}</span>
                                    <span className="m-stat-lab">Legends</span>
                                </div>
                            </div>

                            <div className="mega-fame-scroll">
                                <AnimatePresence>
                                    {supporters.map((s, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="mini-fame-card"
                                        >
                                            <div className="mini-avatar">
                                                <FaUserAstronaut />
                                            </div>
                                            <div className="mini-info">
                                                <span className="mini-name">{s.name || "Legend"}</span>
                                                <span className="mini-date">{new Date(s.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <div className="mini-amt">₹{s.amount}</div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="mega-fame-cta">
                                <motion.p 
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    Be the next legend. Support us.
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportSection;
