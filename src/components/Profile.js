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
    const [profileInfo, setProfileInfo] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        collegeName: '',
        photoURL: '',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = ref(database, `users/${currentUser.uid}`);

                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setProfileInfo({
                            displayName: currentUser.displayName || '',
                            email: currentUser.email || '',
                            phoneNumber: data.phoneNumber || '',
                            collegeName: data.collegeName || '',
                            photoURL: data.photoURL || currentUser.photoURL || '/default-profile.jpg',
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
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
            } else {
                setUser(null);
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

    const isPhoneNumberValid = (number) => /^[0-9]{10}$/.test(number);

    const handleSave = async () => {
        if (!isPhoneNumberValid(profileInfo.phoneNumber)) {
            alert('Invalid phone number. Please enter a valid 10-digit number.');
            return;
        }
        if (!profileInfo.displayName.trim()) {
            alert('Display name cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            if (user) {
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
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
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
        const confirmDeletion = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Profile',
                    text: 'Check out my profile!',
                    url: profileLink,
                });
            } catch (error) {
                console.error('Error sharing profile:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <div>
                    <h1>Welcome, {profileInfo.displayName || 'User'}!</h1>
                    <img
                        src={profileInfo.photoURL || '/default-profile.jpg'}
                        alt="Profile"
                        className="profile-photo"
                    />
                    <p>Email: {profileInfo.email}</p>
                    <p>Phone Number: {profileInfo.phoneNumber || 'Not provided'}</p>
                    <p>College Name: {profileInfo.collegeName || 'Not provided'}</p>

                    {editMode ? (
                        <div className="edit-form">
                            <input
                                type="text"
                                name="displayName"
                                value={profileInfo.displayName}
                                onChange={handleChange}
                                placeholder="Enter display name"
                                className="edit-input"
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={profileInfo.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="edit-input"
                            />
                            <input
                                type="text"
                                name="collegeName"
                                value={profileInfo.collegeName}
                                onChange={handleChange}
                                placeholder="Enter college name"
                                className="edit-input"
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            
                            <button onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    )}

                    <div className="test-results">
                        <h3>Your Test Results</h3>
                        <table>
                            <thead>
                                <tr>
                                    
                                    <th>Test</th>
                                    <th>Difficulty</th>
                                    <th>Total Questions</th>
                                    <th>Attended Questions</th>
                                    <th>Score</th>
                                    <th>Percentage</th>
                                    
                                    
                                    
                                    
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testResults.map((test, index) => (
                                    <tr key={index}>
                                        
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

                    <button onClick={handleChangePassword}>Change Password</button>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                    <button onClick={handleLogout}>Logout</button>

                    
            
            {/* Share Button */}
            <button onClick={handleShare}>Share Profile</button>
            <QRCodeCanvas value={profileLink} size={128} level="H" />
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
