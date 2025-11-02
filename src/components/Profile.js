import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { ref, get, update, remove, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    displayName: 'Guest User',
    email: 'guest@example.com',
    phoneNumber: '',
    collegeName: '',
    photoURL: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const navigate = useNavigate();
  const storage = getStorage();
  const adminEmail = 'sp1771838@gmail.com';

  // Default fallback avatar generator using name initials
  const generateDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : 'U';
    return `https://ui-avatars.com/api/?name=${initial}&background=4F46E5&color=fff&bold=true`;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email === adminEmail);

        if (currentUser.isAnonymous) {
          setProfileInfo({
            displayName: 'Guest User',
            email: 'guest@example.com',
            photoURL: generateDefaultAvatar('Guest User'),
          });
          setTestResults([]);
        } else {
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
              photoURL:
                data.photoURL ||
                currentUser.photoURL ||
                generateDefaultAvatar(name),
            });
          }

          const testResultsRef = ref(database, `users/${currentUser.uid}/testResults`);
          onValue(testResultsRef, (snapshot) => {
            if (snapshot.exists()) {
              const results = snapshot.val();
              const formattedResults = Object.entries(results).map(([testID, testData]) => ({
                testID,
                test: testData.test || 'N/A',
                difficulty: testData.difficulty || 'N/A',
                percentage: testData.percentage || 'N/A',
                score: testData.score || 0,
                totalQuestions: testData.totalQuestions || 0,
                attendedQuestions: testData.attendedQuestions || 0,
                correctAnswers: testData.correctAnswers || 0,
                timestamp: testData.timestamp || null,
              }));
              setTestResults(formattedResults);
            } else {
              setTestResults([]);
            }
          });
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (user.isAnonymous) {
      alert('Guest users cannot edit their profile.');
      return;
    }

    if (!profileInfo.displayName.trim()) {
      alert('Display name cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const userRef = ref(database, `users/${user.uid}`);
      let updatedProfileInfo = { ...profileInfo };

      if (file) {
        const photoRef = storageRef(storage, `profile_photos/${user.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(photoRef, file);

        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Error uploading photo:', error);
            setLoading(false);
          },
          async () => {
            const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
            updatedProfileInfo.photoURL = photoURL;
            await update(userRef, updatedProfileInfo);
            setProfileInfo(updatedProfileInfo);
            setEditMode(false);
            setLoading(false);
            alert('Profile updated successfully!');
          }
        );
      } else {
        await update(userRef, updatedProfileInfo);
        setProfileInfo(updatedProfileInfo);
        setEditMode(false);
        setLoading(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (user.isAnonymous) {
      alert('Guest users cannot change their password.');
      return;
    }

    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;

    try {
      const currentPassword = prompt('Enter your current password:');
      if (!currentPassword) return;

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert('Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      alert(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (user.isAnonymous) {
      alert('Guest users cannot delete their account.');
      return;
    }

    const confirmDeletion = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmDeletion) return;

    try {
      const userRef = ref(database, `users/${user.uid}`);
      await remove(userRef);
      await deleteUser(user);
      alert('Account deleted successfully.');
      navigate('/signup');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(error.message);
    }
  };

  const profileLink = `https://yourwebsite.com/profile/${user?.uid}`;

  return (
    <div className="profilePage-container">
      {user ? (
        <div className="profilePage-card">
          <div className="profilePage-header">
            <img
              src={
                profileInfo.photoURL ||
                generateDefaultAvatar(profileInfo.displayName)
              }
              alt="Profile"
              className="profilePage-avatar"
            />
            <div className="profilePage-info">
              <h2>{profileInfo.displayName}</h2>
              <p>{profileInfo.email}</p>
              <p><strong>Phone:</strong> {profileInfo.phoneNumber || 'Not provided'}</p>
              <p><strong>College:</strong> {profileInfo.collegeName || 'Not provided'}</p>
            </div>
          </div>

          {isAdmin && (
            <button className="profilePage-btn primary" onClick={() => navigate('/admin-dashboard')}>
              Go to Admin Dashboard
            </button>
          )}

          {editMode && !user.isAnonymous ? (
            <div className="profilePage-editSection">
              <input
                type="text"
                name="displayName"
                value={profileInfo.displayName}
                onChange={handleChange}
                placeholder="Enter display name"
              />
              <input
                type="text"
                name="phoneNumber"
                value={profileInfo.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              <input
                type="text"
                name="collegeName"
                value={profileInfo.collegeName}
                onChange={handleChange}
                placeholder="Enter college name"
              />
              <input type="file" onChange={handleFileChange} />
              <div className="profilePage-btnGroup">
                <button className="profilePage-btn success" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="profilePage-btn danger" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            !user.isAnonymous && (
              <button className="profilePage-btn outline" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )
          )}

          <div className="profilePage-results">
            <h3>Your Test Results</h3>
            {testResults.length > 0 ? (
              <div className="profilePage-tableContainer">
                <table className="profilePage-table">
                  <thead>
                    <tr>
                      <th>Test</th>
                      <th>Difficulty</th>
                      <th>Total</th>
                      <th>Attended</th>
                      <th>Score</th>
                      <th>%</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.map((test, i) => (
                      <tr key={i}>
                        <td>{test.test}</td>
                        <td>{test.difficulty}</td>
                        <td>{test.totalQuestions}</td>
                        <td>{test.attendedQuestions}</td>
                        <td>{test.score}</td>
                        <td>{test.percentage}%</td>
                        <td>{test.timestamp ? new Date(test.timestamp).toLocaleString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No test results available.</p>
            )}
          </div>

          {!user.isAnonymous && (
            <div className="profilePage-actions">
              <button className="profilePage-btn warning" onClick={handleChangePassword}>
                Change Password
              </button>
              <button className="profilePage-btn danger" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          )}

          <button className="profilePage-btn secondary" onClick={handleLogout}>
            Logout
          </button>

          <div className="profilePage-qrSection">
            <p>Scan to open your profile:</p>
            <QRCodeCanvas value={profileLink} size={120} level="H" />
          </div>
        </div>
      ) : (
        <p className="profilePage-loginPrompt">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
