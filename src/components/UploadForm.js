// src/components/UploadForm.js

import React, { useState } from 'react';
import { storage, firestore } from '../firebase'; // Ensure your firebase setup is correct
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const UploadForm = () => {
    // State management for form inputs and messages
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    };

    const formStyle = {
        maxWidth: '600px',
        width: '100%',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    };

    const formGroupStyle = {
        marginBottom: '20px',
        transition: 'all 0.3s',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '16px',
        color: '#333',
        fontWeight: '600',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        outline: 'none',
        marginBottom: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s',
    };

    const textAreaStyle = {
        ...inputStyle,
        minHeight: '80px',
        resize: 'vertical',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s, transform 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    };

    const progressStyle = {
        color: '#555',
        marginTop: '10px',
    };

    const successMessageStyle = {
        color: 'green',
        fontWeight: 'bold',
    };

    const errorMessageStyle = {
        color: 'red',
        fontWeight: 'bold',
    };

    // Handle file selection and validation for PDF type
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
            } else {
                alert('Please select a valid PDF file.');
                setFile(null);
            }
        }
    };

    // Handle input changes for semester, subject name, subject code, and message
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

    // Handle the file upload process
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !semester || !subjectName) {
            alert('Please provide all required fields: semester, subject name, and a file.');
            return;
        }

        const storageRef = ref(storage, `notes/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Track upload progress and handle completion or errors
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Upload failed:', error);
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
                    setUploadMessage('Thank you for your contribution! Your note has been uploaded successfully.');
                    setUploadSuccess(true);
                    resetForm();
                } catch (error) {
                    console.error('Error saving to Firestore:', error);
                    setUploadMessage(`Error saving the document: ${error.message}`);
                    setUploadSuccess(false);
                }
            }
        );
    };

    // Reset form fields after a successful upload
    const resetForm = () => {
        setFile(null);
        setSemester('');
        setSubjectName('');
        setSubjectCode('');
        setMessage('');
        setUploadProgress(0);
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Upload a Note</h2>
                <form onSubmit={handleUpload}>
                    <div style={formGroupStyle}>
                        <label htmlFor="semester" style={labelStyle}>Semester:</label>
                        <input 
                            type="text" 
                            id="semester"
                            value={semester}
                            onChange={handleInputChange}
                            required 
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="subjectName" style={labelStyle}>Subject Name:</label>
                        <input 
                            type="text" 
                            id="subjectName"
                            value={subjectName}
                            onChange={handleInputChange}
                            required 
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="subjectCode" style={labelStyle}>Subject Code (optional):</label>
                        <input 
                            type="text" 
                            id="subjectCode"
                            value={subjectCode}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="file" style={labelStyle}>File:</label>
                        <input 
                            type="file" 
                            id="file"
                            accept="application/pdf" 
                            onChange={handleFileChange} 
                            required 
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="message" style={labelStyle}>Message:</label>
                        <textarea 
                            id="message"
                            value={message}
                            onChange={handleInputChange}
                            style={textAreaStyle}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={buttonStyle} 
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Upload
                    </button>
                    {uploadProgress > 0 && 
                        <p style={progressStyle}>Upload progress: {uploadProgress.toFixed(2)}%</p>
                    }
                    {uploadMessage && (
                        <p style={uploadSuccess ? successMessageStyle : errorMessageStyle}>
                            {uploadMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
