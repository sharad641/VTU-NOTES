import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase'; // Ensure correct path to firebase.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get, update } from 'firebase/database'; // Ensure ref, get, and update are correctly imported
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase storage imports
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Ensure correct path to Profile.css

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        collegeName: '',
        photoURL: '',  // Will hold the user's profile picture URL
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // To track loading state for photo upload
    const navigate = useNavigate();
    const storage = getStorage(); // Firebase storage instance

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setProfileInfo({
                    displayName: currentUser.displayName || '',
                    email: currentUser.email || '',
                    phoneNumber: '',
                    collegeName: '',
                    photoURL: currentUser.photoURL || '', // Initialize with current user photoURL
                });

                // Fetch user data from Firebase Realtime Database
                if (currentUser.uid) {
                    const userRef = ref(database, 'users/' + currentUser.uid);
                    get(userRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            setProfileInfo((prev) => ({
                                ...prev,
                                phoneNumber: data.phoneNumber || '',
                                collegeName: data.collegeName || '',
                                photoURL: data.photoURL || currentUser.photoURL, // Ensure fallback to auth photo
                            }));
                        }
                    }).catch((error) => {
                        console.error('Error fetching user data from Realtime Database:', error);
                    });
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle profile photo change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Validate phone number (only digits allowed)
    const isPhoneNumberValid = (number) => /^[0-9]*$/.test(number);

    // Save profile changes
    const handleSave = async () => {
        if (!isPhoneNumberValid(profileInfo.phoneNumber)) {
            alert('Invalid phone number. Please enter only digits.');
            return;
        }
        if (profileInfo.displayName.trim() === '') {
            alert('Display name cannot be empty.');
            return;
        }

        setLoading(true); // Show loading indicator
        try {
            if (user) {
                const userRef = ref(database, 'users/' + user.uid);
                let updatedProfileInfo = { ...profileInfo };

                // If a new photo is selected, upload it
                if (file) {
                    const photoRef = storageRef(storage, `profile_photos/${user.uid}/${file.name}`);
                    const uploadTask = uploadBytesResumable(photoRef, file);

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Optional: You can handle progress here
                        },
                        (error) => {
                            console.error('Error uploading photo:', error);
                        },
                        async () => {
                            // Get the photo URL after upload
                            const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                            updatedProfileInfo = {
                                ...updatedProfileInfo,
                                photoURL,
                            };

                            // Save updated profile information to Realtime Database
                            await update(userRef, updatedProfileInfo);

                            // Update local state
                            setProfileInfo(updatedProfileInfo);
                            setEditMode(false);
                            setLoading(false); // Hide loading indicator
                            console.log('Profile updated successfully!');
                        }
                    );
                } else {
                    // No file selected, update profile data without changing photo
                    await update(userRef, updatedProfileInfo);
                    setProfileInfo(updatedProfileInfo);
                    setEditMode(false);
                    setLoading(false); // Hide loading indicator
                    console.log('Profile updated successfully!');
                }
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <div>
                    <h1>Welcome, {profileInfo.displayName || 'User'}!</h1>
                    <img
                        src={profileInfo.photoURL || '/default-profile.jpg'}  // Fallback logic for default image
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
                        </div>
                    )}

                    <div>
                        <button onClick={handleLogout} className="neutral">
                            Logout
                        </button>
                    </div>
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
