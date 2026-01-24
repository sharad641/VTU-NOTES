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
  FaShieldAlt, FaBuilding, FaUserTie, FaCalendarAlt, FaEdit, FaCheck,
  FaCog, FaChartLine, FaUsers, FaComments, FaProjectDiagram, FaHome
} from 'react-icons/fa';
import './ProfileModern.css'; // CHANGED: Modern CSS

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

  // --- Navigation Handlers ---
  const goToHome = () => navigate('/');
  const goToAdminDashboard = () => navigate('/admin-dashboard');

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
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await remove(ref(database, `placement_reviews/${reviewId}`));
      await remove(ref(database, `placement_experience_comments/${reviewId}`));
    } catch (error) {
      console.error(error);
    }
  };

  // --- PASSWORD & ACCOUNT ---
  const handleChangePassword = async () => {
    if (user.isAnonymous) return;
    const newPass = prompt("Enter new password:");
    if (!newPass) return;
    const oldPass = prompt("Verify current password:");
    if (!oldPass) return;
    try {
      const cred = EmailAuthProvider.credential(user.email, oldPass);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPass);
      alert("Password updated!");
    } catch (e) { alert(e.message); }
  };

  const handleDeleteAccount = async () => {
    if (user.isAnonymous) return;
    if (!window.confirm("Delete account permanently?")) return;
    try {
      await remove(ref(database, `users/${user.uid}`));
      await deleteUser(user);
      navigate('/signup');
    } catch (e) { alert(e.message); }
  };

  const profileLink = `https://yourwebsite.com/profile/${user?.uid}`;

  if (!user) return <div style={{ height: '100vh', background: '#0F172A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div className="profile-container-modern">
      <div className="profile-bg-decoration"></div>

      <div className="profile-content">
        {/* Header */}
        <div className="profile-header-card">
          <div className="profile-avatar-wrapper">
            <img src={previewUrl || profileInfo.photoURL || generateDefaultAvatar(profileInfo.displayName)} alt="Avatar" className="profile-avatar" />
            {editMode && (
              <button className="profile-avatar-edit" onClick={triggerFileInput}>
                <FaCamera />
              </button>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
          </div>

          <div className="profile-info" style={{ flex: 1 }}>
            {editMode ? (
              <input className="info-input" name="displayName" value={profileInfo.displayName} onChange={handleChange} style={{ fontSize: '1.5rem', marginBottom: '8px', width: 'auto', display: 'inline-block' }} />
            ) : (
              <h1>{profileInfo.displayName}</h1>
            )}
            <div style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaEnvelope /> {profileInfo.email}
            </div>
            <div className="profile-badges">
              {isAdmin && <span className="p-badge admin">Admin</span>}
              {user.isAnonymous && <span className="p-badge guest">Guest</span>}
              {!user.isAnonymous && <span className="p-badge student">Student Scholar</span>}
            </div>
          </div>

          <div className="profile-header-actions" style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-p-action" onClick={goToHome}><FaHome /> Home</button>
            {isAdmin && <button className="btn-p-action" onClick={goToAdminDashboard} style={{ borderColor: '#F59E0B', color: '#F59E0B' }}><FaShieldAlt /> Admin</button>}
            {!editMode && !user.isAnonymous && <button className="btn-p-action" onClick={() => setEditMode(true)} style={{ background: '#6366F1', borderColor: '#6366F1' }}><FaPen /> Edit</button>}
            {editMode && (
              <>
                <button className="btn-p-action" onClick={handleSave} style={{ background: '#10B981', borderColor: '#10B981' }}><FaSave /> Save</button>
                <button className="btn-p-action danger" onClick={() => { setEditMode(false); setPreviewUrl(null); }}><FaTimes /> Cancel</button>
              </>
            )}
            <button className="btn-p-action danger" onClick={handleLogout}><FaSignOutAlt /></button>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats-grid">
          <div className="p-stat-card">
            <div className="p-stat-icon"><FaClipboardList /></div>
            <div className="p-stat-info">
              <h3>{stats.totalTests}</h3>
              <span>Tests Taken</span>
            </div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-icon" style={{ color: '#F59E0B' }}><FaTrophy /></div>
            <div className="p-stat-info">
              <h3>{stats.avgScore}%</h3>
              <span>Average Score</span>
            </div>
          </div>
          <div className="p-stat-card">
            <div className="p-stat-icon" style={{ color: '#10B981' }}><FaBuilding /></div>
            <div className="p-stat-info">
              <h3>{myReviews.length}</h3>
              <span>Reviews Posted</span>
            </div>
          </div>
        </div>

        <div className="profile-grid-main">
          {/* Left Column: Personal Info */}
          <div className="p-section-card">
            <h3 className="p-section-title"><FaUserTie /> Personal Details</h3>

            <div className="info-row">
              <label>Phone Number</label>
              {editMode ? (
                <input className="info-input" name="phoneNumber" value={profileInfo.phoneNumber} onChange={handleChange} placeholder="+91..." />
              ) : (
                <div>{profileInfo.phoneNumber || "Not set"}</div>
              )}
            </div>

            <div className="info-row">
              <label>College / University</label>
              {editMode ? (
                <input className="info-input" name="collegeName" value={profileInfo.collegeName} onChange={handleChange} placeholder="Institute Name" />
              ) : (
                <div>{profileInfo.collegeName || "Not set"}</div>
              )}
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <QRCodeCanvas value={profileLink} size={150} style={{ border: '4px solid white', borderRadius: '8px' }} />
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '10px' }}>Scan to share profile</p>
            </div>

            {!user.isAnonymous && (
              <div className="profile-actions">
                <button className="btn-p-action" onClick={handleChangePassword} style={{ width: '100%' }}><FaKey /> Change Password</button>
                <button className="btn-p-action danger" onClick={handleDeleteAccount} style={{ width: '100%' }}><FaTrash /> Delete Account</button>
              </div>
            )}
          </div>

          {/* Right Column: Activity */}
          <div className="p-section-card">
            <h3 className="p-section-title"><FaChartLine /> Recent Activity</h3>

            {/* My Reviews Table */}
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ marginBottom: '16px', color: '#94A3B8' }}>My Placement Stories</h4>
              {myReviews.length > 0 ? (
                <div className="p-list-container">
                  {myReviews.map(review => (
                    <div key={review.id} className="p-list-item">
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{review.company}</div>
                        <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{review.role} • <span style={{ color: review.offerStatus === 'Selected' ? '#10B981' : review.offerStatus === 'Rejected' ? '#EF4444' : '#F59E0B' }}>{review.offerStatus}</span></div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEditModal(review)} style={{ background: 'none', border: 'none', color: '#6366F1', cursor: 'pointer' }}><FaEdit /></button>
                        <button onClick={() => handleDeleteReview(review.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  No placement stories shared yet. <span onClick={() => navigate('/share-experience')} style={{ color: '#6366F1', cursor: 'pointer', fontWeight: '700' }}>Share Now</span>
                </div>
              )}
            </div>

            {/* Test History Table */}
            <div>
              <h4 style={{ marginBottom: '16px', color: '#94A3B8' }}>Recent Test Results</h4>
              {testResults.length > 0 ? (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '0.9rem' }}>
                    <span>Topic</span>
                    <span>Difficulty</span>
                    <span>Score</span>
                    <span>Date</span>
                  </div>
                  {testResults.slice(0, 5).map((test, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600' }}>{test.test}</span>
                      <span style={{ fontSize: '0.85rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', width: 'fit-content' }}>{test.difficulty}</span>
                      <span style={{ color: test.percentage >= 70 ? '#10B981' : test.percentage >= 40 ? '#F59E0B' : '#EF4444', fontWeight: '700' }}>{test.percentage}%</span>
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{test.timestamp ? new Date(test.timestamp).toLocaleDateString() : '-'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  No tests taken yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Review Modal */}
      {showEditModal && editingReview && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="p-section-card" style={{ width: '90%', maxWidth: '500px', background: '#1E293B', borderColor: '#334155' }}>
            <h3 style={{ marginBottom: '20px' }}>Edit Experience</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#94A3B8' }}>Company</label>
                <input className="info-input" name="company" value={editingReview.company} onChange={handleReviewChange} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#94A3B8' }}>Role</label>
                <input className="info-input" name="role" value={editingReview.role} onChange={handleReviewChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#94A3B8' }}>CTC</label>
                  <input className="info-input" name="ctc" value={editingReview.ctc} onChange={handleReviewChange} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#94A3B8' }}>Status</label>
                  <select className="info-input" name="status" value={editingReview.status || editingReview.offerStatus} onChange={handleReviewChange}>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem', color: '#94A3B8' }}>Experience</label>
                <textarea className="info-input" name="experience" rows="4" value={editingReview.experience} onChange={handleReviewChange} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button className="btn-p-action danger" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-p-action" onClick={saveReviewChanges} style={{ background: '#10B981', borderColor: '#10B981' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;