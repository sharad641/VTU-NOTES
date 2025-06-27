import React, { useState } from 'react';
import { storage, firestore } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [hover, setHover] = useState(false);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        padding: '2rem',
        boxSizing: 'border-box',
        backgroundColor: '#f3f4f6',
    };

    const formStyle = {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1e40af',
        letterSpacing: '0.5px',
    };

    const subtitleStyle = {
        fontSize: '1rem',
        color: '#4b5563',
        lineHeight: '1.8',
        margin: '15px 0 25px',
        textAlign: 'center',
        background: '#f1f5f9',
        padding: '20px 25px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.6rem',
        fontWeight: '600',
        color: '#374151',
        fontSize: '1rem',
    };

    const inputStyle = {
        width: '100%',
        padding: '0.9rem',
        fontSize: '1rem',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        backgroundColor: '#f9fafb',
        transition: 'all 0.3s ease',
        marginBottom: '1.5rem',
    };

    const buttonStyle = {
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        backgroundColor: hover ? '#1e3a8a' : '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        marginTop: '1rem',
    };

    const messageStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '10px',
        fontSize: '1rem',
        color: uploadSuccess ? '#16a34a' : '#b91c1c',
        backgroundColor: uploadSuccess ? '#dcfce7' : '#fee2e2',
        border: `1px solid ${uploadSuccess ? '#16a34a' : '#dc2626'}`,
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a valid PDF file.');
            setFile(null);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'semester':
                setSemester(value);
                break;
            case 'subjectName':
                setSubjectName(value);
                break;
            case 'subjectCode':
                setSubjectCode(value);
                break;
            case 'message':
                setMessage(value);
                break;
            default:
                break;
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !semester || !subjectName) {
            alert('Please fill all required fields.');
            return;
        }

        const storageRef = ref(storage, `notes/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setUploadMessage(`Upload failed: ${error.message}`);
                setUploadSuccess(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(firestore, 'notes'), {
                        semester,
                        subjectName,
                        subjectCode,
                        url: downloadURL,
                        message,
                        uploadedAt: new Date(),
                    });
                    setUploadMessage('Upload successful! Thank you for your contribution.');
                    setUploadSuccess(true);
                    resetForm();
                } catch (error) {
                    setUploadMessage(`Error saving document: ${error.message}`);
                    setUploadSuccess(false);
                }
            }
        );
    };

    const resetForm = () => {
        setFile(null);
        setSemester('');
        setSubjectName('');
        setSubjectCode('');
        setMessage('');
        setUploadProgress(0);
        setUploadMessage('');
        setUploadSuccess(false);
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleUpload}>
                <h2 style={titleStyle}>Upload Your Notes</h2>
                <p style={subtitleStyle}>
                    Join our mission to help students excel by sharing your valuable notes and study materials.
                </p>
                {uploadMessage && (
                    <div style={messageStyle}>
                        {uploadMessage}
                    </div>
                )}
                <label style={labelStyle} htmlFor="semester">Semester:</label>
                <input
                    id="semester"
                    type="text"
                    value={semester}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="subjectName">Subject Name:</label>
                <input
                    id="subjectName"
                    type="text"
                    value={subjectName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle} htmlFor="subjectCode">Subject Code (optional):</label>
                <input
                    id="subjectCode"
                    type="text"
                    value={subjectCode}
                    onChange={handleInputChange}
                    style={inputStyle}
                />

                <label style={labelStyle} htmlFor="file">Upload PDF:</label>
                <input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={inputStyle}
                    required
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Upload
                </button>

                {uploadProgress > 0 && (
                    <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
                        Upload progress: {uploadProgress.toFixed(2)}%
                    </p>
                )}
            </form>
        </div>
    );
};

export default UploadForm;
