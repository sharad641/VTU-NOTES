import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { 
    onAuthStateChanged, 
    signOut, 
    updatePassword, 
    deleteUser, 
    reauthenticateWithCredential, 
    EmailAuthProvider 
} from 'firebase/auth';
import { ref, get, update, remove } from 'firebase/database';
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
    const navigate = useNavigate();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setProfileInfo({
                    displayName: currentUser.displayName || '',
                    email: currentUser.email || '',
                    phoneNumber: '',
                    collegeName: '',
                    photoURL: currentUser.photoURL || '',
                });

                if (currentUser.uid) {
                    const userRef = ref(database, 'users/' + currentUser.uid);
                    get(userRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            setProfileInfo((prev) => ({
                                ...prev,
                                phoneNumber: data.phoneNumber || '',
                                collegeName: data.collegeName || '',
                                photoURL: data.photoURL || currentUser.photoURL,
                            }));
                        }
                    }).catch((error) => {
                        console.error('Error fetching user data:', error);
                    });
                }
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

    const isPhoneNumberValid = (number) => /^[0-9]*$/.test(number);

    const handleSave = async () => {
        if (!isPhoneNumberValid(profileInfo.phoneNumber)) {
            alert('Invalid phone number. Please enter only digits.');
            return;
        }
        if (profileInfo.displayName.trim() === '') {
            alert('Display name cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            if (user) {
                const userRef = ref(database, 'users/' + user.uid);
                let updatedProfileInfo = { ...profileInfo };

                if (file) {
                    const photoRef = storageRef(storage, `profile_photos/${user.uid}/${file.name}`);
                    const uploadTask = uploadBytesResumable(photoRef, file);

                    uploadTask.on(
                        'state_changed',
                        null,
                        (error) => {
                            console.error('Error uploading photo:', error);
                        },
                        async () => {
                            const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                            updatedProfileInfo = {
                                ...updatedProfileInfo,
                                photoURL,
                            };

                            await update(userRef, updatedProfileInfo);
                            setProfileInfo(updatedProfileInfo);
                            setEditMode(false);
                            setLoading(false);
                            console.log('Profile updated successfully!');
                        }
                    );
                } else {
                    await update(userRef, updatedProfileInfo);
                    setProfileInfo(updatedProfileInfo);
                    setEditMode(false);
                    setLoading(false);
                    console.log('Profile updated successfully!');
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        const newPassword = prompt("Enter your new password:");
        if (!newPassword) return;

        try {
            const user = auth.currentUser;

            if (user) {
                const email = user.email;
                const currentPassword = prompt("Please enter your current password:");
                if (!currentPassword) return;

                const credential = EmailAuthProvider.credential(email, currentPassword);
                await reauthenticateWithCredential(user, credential);
            }

            await updatePassword(user, newPassword);
            alert("Password updated successfully.");
        } catch (error) {
            console.error("Error updating password:", error);
            if (error.code === 'auth/requires-recent-login') {
                alert("Please log in again to change your password.");
            } else {
                alert("Failed to update password. Please try again.");
            }
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDeletion = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDeletion) return;

        try {
            const userRef = ref(database, `users/${user?.uid}`);
            await remove(userRef);
            await deleteUser(auth.currentUser);
            alert("Account deleted successfully.");
            navigate('/signup');
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
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
                console.log('Profile shared successfully!');
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
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                id="profilePictureInput"
                            />
                            <label htmlFor="profilePictureInput" className="choose-file-label">
                                Choose profile picture
                            </label>
                            <br />
                            <button onClick={handleSave} className="success" disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button onClick={() => setEditMode(false)} className="danger">
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => setEditMode(true)} className="primary">
                                Edit Profile
                            </button>
                            <button onClick={handleChangePassword} className="neutral">
                                Change Password
                            </button>
                            <button onClick={handleLogout} className="neutral">
                                Logout
                            </button>
                        </div>
                    )}

                    <div className="qr-code-section">
                        <h3>Share Your Profile</h3>
                        {profileLink && (
                            <QRCodeCanvas value={profileLink} size={150} />
                        )}
                        <p>Scan to view your profile photo or page.</p>
                        <button onClick={handleShare} className="primary">
                            Share Profile
                        </button>
                    </div>

                    <button onClick={handleDeleteAccount} className="danger">Delete Account</button>
                </div>
            ) : (
                <div>
                    <h1>You are not logged in.</h1>
                    <button onClick={() => navigate('/login')} className="primary">
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
