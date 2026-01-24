import React, { useState, useEffect } from 'react';
import { database, auth, signInAnonymously } from '../firebase';
import { ref, push, onValue, query, limitToLast, orderByChild } from 'firebase/database';
import { FaHeart, FaRupeeSign, FaCheckCircle, FaBolt, FaCopy, FaClock } from 'react-icons/fa';
import { FaUserAstronaut } from 'react-icons/fa6';
import './SupportSectionModern.css';

const SupportSection = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [supporters, setSupporters] = useState([]);

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

                const donationsRef = query(ref(database, 'donations'), orderByChild('timestamp'), limitToLast(10));
                
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
                        .slice(0, 10);

                    setSupporters(sorted);
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
            <div className="thank-you-overlay">
                <div className="thank-you-modal">
                    <FaCheckCircle className="success-icon" />
                    <h3>Thank You, {name || 'Friend'}!</h3>
                    <p>Your contribution has been received.</p>
                    <div className="modal-divider"></div>
                    <p className="ty-msg">"Your support keeps VTUNOTESFORALL alive!"</p>
                    <button className="close-modal-btn" onClick={() => setSuccess(false)}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="support-section-root" id="support">
            <div className="support-container">
                <div className="support-card">
                    <div className="support-header">
                        <FaHeart className="heart-icon" />
                        <h2>Support <span className="highlight-text">VTUNOTESFORALL</span></h2>
                        <p className="support-p">
                            We are students dedicating our time to manage this platform.
                            Server hosting and maintenance costs are real.
                            If we helped you, consider buying us a coffee! ☕
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

                        <div className="input-wrapper">
                            <label>Mobile Number (For UPI)</label>
                            <input
                                type="tel"
                                placeholder="10-digit mobile number"
                                value={mobile}
                                required
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label>Amount (₹)</label>
                            <input
                                type="number"
                                placeholder="Enter amount (min ₹1)"
                                value={amount}
                                required
                                onChange={(e) => setAmount(e.target.value)}
                            />

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
                        </div>

                        <button type="submit" className="pay-btn-large" disabled={loading}>
                            {loading ? 'Processing...' : (
                                <>Support Now <FaBolt /></>
                            )}
                        </button>
                    </form>

                    {/* Manual Copy Section */}
                    <div className="manual-upi-box">
                        <p className="upi-label-text">Or copy UPI ID manually:</p>
                        <div className="upi-copy-row" onClick={handleCopy}>
                            <span className="upi-id-text">{UPI_ID}</span>
                            <span className="copy-action">
                                {copied ? <FaCheckCircle className="copy-success" /> : <FaCopy />}
                                {copied ? " Copied!" : " Copy"}
                            </span>
                        </div>
                    </div>

                    {/* Recent Supporters Display */}
                    {supporters.length > 0 && (
                        <div className="recent-supporters-section-card">
                            <h3><FaUserAstronaut style={{ marginRight: '10px', color: '#6366F1' }} />Recent Supporters</h3>
                            <div className="supporters-list-card">
                                {supporters.map((s, idx) => (
                                    <div key={idx} className="supporter-badge-card">
                                        <div className="s-avatar">
                                            <FaUserAstronaut />
                                        </div>
                                        <div className="s-content">
                                            <div className="s-info">
                                                <span className="s-name">{s.name}</span>
                                                <span className="s-date"><FaClock style={{ fontSize: '0.7em', marginRight: '4px' }}/>{formatDate(s.timestamp)}</span>
                                            </div>
                                            <span className="s-amt">₹{s.amount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SupportSection;
