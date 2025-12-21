import React, { useState, useEffect, useRef } from 'react';
import { auth, database } from '../firebase';
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { 
  ref, get, update, remove, onValue, query, orderByChild, equalTo 
} from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  FaCamera, FaPen, FaSave, FaTimes, FaSignOutAlt, FaTrash, 
  FaKey, FaUniversity, FaPhone, FaEnvelope, FaTrophy, FaClipboardList,
  FaShieldAlt, FaBuilding, FaUserTie, FaCalendarAlt, FaEdit, FaCheck
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Profile Data
  const [profileInfo, setProfileInfo] = useState({
    displayName: 'Guest User',
    email: 'guest@example.com',
    phoneNumber: '',
    collegeName: '',
    photoURL: '',
  });
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Data States
  const [testResults, setTestResults] = useState([]);
  const [stats, setStats] = useState({ totalTests: 0, avgScore: 0 });
  const [adminReviews, setAdminReviews] = useState([]); 
  const [myReviews, setMyReviews] = useState([]); // User's own reviews

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const navigate = useNavigate();
  const storage = getStorage();
  const fileInputRef = useRef(null);
  
  const adminEmail = 'sp1771838@gmail.com';

  const generateDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    return `https://ui-avatars.com/api/?name=${initial}&background=4F46E5&color=fff&bold=true`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const adminStatus = currentUser.email === adminEmail;
        setIsAdmin(adminStatus);

        if (currentUser.isAnonymous) {
          setProfileInfo({
            displayName: 'Guest User',
            email: 'guest@example.com',
            photoURL: generateDefaultAvatar('Guest User'),
          });
          setTestResults([]);
        } else {
          // 1. Fetch User Data
          const userRef = ref(database, `users/${currentUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const name = currentUser.displayName || data.displayName || 'User';
            setProfileInfo({
              displayName: name,
              email: currentUser.email || '',
              phoneNumber: data.phoneNumber || '',
              collegeName: data.collegeName || '',
              photoURL: data.photoURL || currentUser.photoURL || generateDefaultAvatar(name),
            });
          }

          // 2. Fetch User's Test Results
          const testResultsRef = ref(database, `users/${currentUser.uid}/testResults`);
          onValue(testResultsRef, (snapshot) => {
            if (snapshot.exists()) {
              const results = snapshot.val();
              const formattedResults = Object.entries(results).map(([testID, testData]) => ({
                testID,
                ...testData,
                timestamp: testData.timestamp || null,
              })).reverse();
              
              setTestResults(formattedResults);

              const total = formattedResults.length;
              const avg = total > 0 
                ? (formattedResults.reduce((acc, curr) => acc + (parseFloat(curr.percentage) || 0), 0) / total).toFixed(1)
                : 0;
              setStats({ totalTests: total, avgScore: avg });

            } else {
              setTestResults([]);
              setStats({ totalTests: 0, avgScore: 0 });
            }
          });

          // 3. Fetch User's Own Placement Reviews
          const myReviewsQuery = query(
            ref(database, 'placement_reviews'), 
            orderByChild('author/uid'), 
            equalTo(currentUser.uid)
          );
          
          onValue(myReviewsQuery, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const reviewsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
              })).reverse();
              setMyReviews(reviewsArray);
            } else {
              setMyReviews([]);
            }
          });

          // 4. ADMIN ONLY: Fetch All Placement Reviews
          if (adminStatus) {
            const reviewsRef = ref(database, 'placement_reviews');
            onValue(reviewsRef, (snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                const reviewsArray = Object.keys(data).map(key => ({
                  id: key,
                  ...data[key]
                })).reverse();
                setAdminReviews(reviewsArray);
              } else {
                setAdminReviews([]);
              }
            });
          }
        }
      } else {
        setUser(null);
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // --- General Handlers ---
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleSave = async () => {
    if (user.isAnonymous) return alert('Guest users cannot edit profile.');
    if (!profileInfo.displayName.trim()) return alert('Name required.');

    setLoading(true);
    try {
      const userRef = ref(database, `users/${user.uid}`);
      let updatedProfileInfo = { ...profileInfo };

      if (file) {
        const photoRef = storageRef(storage, `profile_photos/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(photoRef, file);
        
        uploadTask.on('state_changed', null, console.error, async () => {
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
          updatedProfileInfo.photoURL = photoURL;
          await update(userRef, updatedProfileInfo);
          setProfileInfo(updatedProfileInfo);
          setEditMode(false);
          setLoading(false);
        });
      } else {
        await update(userRef, updatedProfileInfo);
        setEditMode(false);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // --- REVIEW EDIT HANDLERS ---
  const openEditModal = (review) => {
    setEditingReview({ ...review });
    setShowEditModal(true);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setEditingReview(prev => ({ ...prev, [name]: value }));
  };

  const saveReviewChanges = async () => {
    if (!editingReview) return;
    try {
      const reviewRef = ref(database, `placement_reviews/${editingReview.id}`);
      // Only update specific fields to prevent overwriting critical data
      await update(reviewRef, {
        company: editingReview.company,
        role: editingReview.role,
        ctc: editingReview.ctc,
        status: editingReview.status || editingReview.offerStatus, // Handle legacy field names
        offerStatus: editingReview.status || editingReview.offerStatus,
        experience: editingReview.experience,
      });
      setShowEditModal(false);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if(!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await remove(ref(database, `placement_reviews/${reviewId}`));
      await remove(ref(database, `placement_experience_comments/${reviewId}`));
    } catch (error) {
      console.error(error);
    }
  };

  // --- PASSWORD & ACCOUNT ---
  const handleChangePassword = async () => {
    if(user.isAnonymous) return;
    const newPass = prompt("Enter new password:");
    if(!newPass) return;
    const oldPass = prompt("Verify current password:");
    if(!oldPass) return;
    try {
      const cred = EmailAuthProvider.credential(user.email, oldPass);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPass);
      alert("Password updated!");
    } catch(e) { alert(e.message); }
  };

  const handleDeleteAccount = async () => {
    if(user.isAnonymous) return;
    if(!window.confirm("Delete account permanently?")) return;
    try {
      await remove(ref(database, `users/${user.uid}`));
      await deleteUser(user);
      navigate('/signup');
    } catch(e) { alert(e.message); }
  };

  const profileLink = `https://yourwebsite.com/profile/${user?.uid}`;

  if (!user) return <div className="profile-loader">Loading Profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-background-mesh"></div>
      
      <div className="profile-main-card">
        
        {/* HEADER */}
        <div className="profile-banner"><div className="banner-overlay"></div></div>

        <div className="profile-header-content">
          <div className="avatar-container">
            <div className="avatar-circle">
              <img src={previewUrl || profileInfo.photoURL || generateDefaultAvatar(profileInfo.displayName)} alt="Profile" />
              {editMode && <button className="camera-btn" onClick={triggerFileInput}><FaCamera /></button>}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*"/>
            </div>
          </div>

          <div className="header-text">
            {editMode ? (
              <input className="edit-name-input" name="displayName" value={profileInfo.displayName} onChange={handleChange} placeholder="Your Name"/>
            ) : (
              <h1>{profileInfo.displayName}</h1>
            )}
            <p className="user-email"><FaEnvelope /> {profileInfo.email}</p>
            <div className="header-badges">
              {isAdmin && <span className="badge admin">Admin</span>}
              {user.isAnonymous && <span className="badge guest">Guest</span>}
              {!user.isAnonymous && <span className="badge student">Student</span>}
            </div>
          </div>

          <div className="header-actions">
            {!user.isAnonymous && (
              !editMode ? (
                <button className="btn-icon-primary" onClick={() => setEditMode(true)}><FaPen /> Edit</button>
              ) : (
                <div className="edit-actions">
                  <button className="btn-icon-success" onClick={handleSave} disabled={loading}><FaSave /> {loading ? 'Saving...' : 'Save'}</button>
                  <button className="btn-icon-danger" onClick={() => { setEditMode(false); setPreviewUrl(null); }}><FaTimes /></button>
                </div>
              )
            )}
          </div>
        </div>

        {/* STATS */}
        <div className="profile-stats-row">
          <div className="stat-card">
            <div className="stat-icon purple"><FaClipboardList /></div>
            <div><h3>{stats.totalTests}</h3><span>Tests Taken</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold"><FaTrophy /></div>
            <div><h3>{stats.avgScore}%</h3><span>Avg Score</span></div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="profile-details-grid">
          
          {/* Left: Info */}
          <div className="details-column">
            <h3>Personal Information</h3>
            <div className="info-group">
              <label><FaPhone /> Phone</label>
              {editMode ? <input name="phoneNumber" value={profileInfo.phoneNumber} onChange={handleChange} placeholder="+91..."/> : <p>{profileInfo.phoneNumber || "Not Provided"}</p>}
            </div>
            <div className="info-group">
              <label><FaUniversity /> College</label>
              {editMode ? <input name="collegeName" value={profileInfo.collegeName} onChange={handleChange} placeholder="University Name"/> : <p>{profileInfo.collegeName || "Not Provided"}</p>}
            </div>
            <div className="qr-container">
              <QRCodeCanvas value={profileLink} size={100} />
              <span>Scan to Share Profile</span>
            </div>
          </div>

          {/* Right: Reviews & Tests */}
          <div className="details-column wide">
            
            {/* My Contributions Section */}
            {!user.isAnonymous && (
              <div className="my-contributions-section">
                <div className="section-title-row">
                  <h3>My Placement Reviews</h3>
                  {myReviews.length > 0 && <span className="badge student">{myReviews.length} Posted</span>}
                </div>
                
                {myReviews.length > 0 ? (
                  <div className="my-reviews-list">
                    {myReviews.map((review) => (
                      <div className="my-review-card" key={review.id}>
                        <div className="my-review-header">
                          <div>
                            <h4>{review.company}</h4>
                            <span className="role-sub">{review.role}</span>
                          </div>
                          <span className={`status-pill ${review.offerStatus || review.status}`}>
                            {review.offerStatus || review.status}
                          </span>
                        </div>
                        <p className="my-review-snippet">{review.experience?.substring(0, 80)}...</p>
                        <div className="my-review-actions">
                          <button className="btn-action edit" onClick={() => openEditModal(review)}>
                            <FaEdit /> Edit
                          </button>
                          <button className="btn-action delete" onClick={() => handleDeleteReview(review.id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-mini-state">
                    <p>You haven't shared any experiences yet.</p>
                    <button className="btn-text-link" onClick={() => navigate('/share-experience')}>Share Now</button>
                  </div>
                )}
              </div>
            )}

            <h3 style={{marginTop: '2rem'}}>Recent Tests</h3>
            {testResults.length > 0 ? (
              <div className="test-history-list">
                <div className="table-header desktop-only"><span>Test Name</span><span>Difficulty</span><span>Score</span><span>Date</span></div>
                {testResults.map((test, i) => (
                  <div className="history-row" key={i}>
                    <div className="col-name"><strong>{test.test}</strong><span className="mobile-only">{new Date(test.timestamp).toLocaleDateString()}</span></div>
                    <div className="col-diff"><span className={`tag ${test.difficulty.toLowerCase()}`}>{test.difficulty}</span></div>
                    <div className="col-score"><span className="percent">{test.percentage}%</span></div>
                    <div className="col-date desktop-only">{test.timestamp ? new Date(test.timestamp).toLocaleDateString() : '-'}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state"><p>No tests taken yet. Start learning!</p></div>
            )}
          </div>
        </div>

        {/* --- EDIT MODAL (Popup) --- */}
        {showEditModal && editingReview && (
          <div className="modal-overlay">
            <div className="modal-card">
              <div className="modal-header">
                <h3>Edit Experience</h3>
                <button className="close-btn" onClick={() => setShowEditModal(false)}><FaTimes /></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Company</label>
                  <input name="company" value={editingReview.company} onChange={handleReviewChange} />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input name="role" value={editingReview.role} onChange={handleReviewChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>CTC</label>
                    <input name="ctc" value={editingReview.ctc} onChange={handleReviewChange} />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={editingReview.status || editingReview.offerStatus} onChange={handleReviewChange}>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Experience Description</label>
                  <textarea 
                    name="experience" 
                    rows="5"
                    value={editingReview.experience} 
                    onChange={handleReviewChange} 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn-save" onClick={saveReviewChanges}><FaCheck /> Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* --- ADMIN SECTION --- */}
        {isAdmin && (
          <div className="admin-section">
            <div className="admin-header">
              <h3><FaShieldAlt /> Admin: All Reviews</h3>
              <span className="badge admin">{adminReviews.length}</span>
            </div>
            <div className="admin-reviews-grid">
              {adminReviews.map((review) => (
                <div className="admin-review-card" key={review.id}>
                  <div className="review-top">
                    <div><h4>{review.company}</h4><p className="role-text">{review.role}</p></div>
                    <span className={`status-pill ${review.status || review.offerStatus}`}>{review.status || review.offerStatus}</span>
                  </div>
                  <div className="review-meta"><small>{review.author?.name}</small><small>{new Date(review.createdAt).toLocaleDateString()}</small></div>
                  <div className="review-actions"><button className="btn-delete-review" onClick={() => handleDeleteReview(review.id)}><FaTrash /> Delete</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        {!user.isAnonymous && (
          <div className="profile-footer-actions">
            <button className="text-btn warning" onClick={handleChangePassword}><FaKey /> Change Password</button>
            <button className="text-btn danger" onClick={handleDeleteAccount}><FaTrash /> Delete Account</button>
          </div>
        )}
        <button className="logout-float-btn" onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>

      </div>
    </div>
  );
};

export default Profile;