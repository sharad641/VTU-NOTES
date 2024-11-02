// src/components/UploadForm.js

import React, { useState } from 'react';
import { storage, firestore } from '../firebase'; // Ensure this is correctly imported
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadForm.css'; // Ensure correct import for styles

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please select a valid PDF file.');
            setFile(null);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'semester') setSemester(value);
        else if (id === 'subjectName') setSubjectName(value);
        else if (id === 'subjectCode') setSubjectCode(value);
        else if (id === 'message') setMessage(value);
    };

    // Handle file upload
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !semester || !subjectName) {
            alert('Please provide all required fields: semester, subject name, and a file.');
            return;
        }

        const storageRef = ref(storage, `notes/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                setUploadMessage(`Upload failed: ${error.message}`);
                setUploadSuccess(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                try {
                    await addDoc(collection(firestore, 'notes'), {
                        semester,
                        subjectName,
                        subjectCode,
                        url: downloadURL,
                        message,
                        uploadedAt: new Date()
                    });
                    setUploadMessage('Thank you for your contribution! Your note has been uploaded successfully.');
                    setUploadSuccess(true);
                    resetForm();
                } catch (error) {
                    console.error("Error saving to Firestore:", error);
                    setUploadMessage(`Error saving the document: ${error.message}`);
                    setUploadSuccess(false);
                }
            }
        );
    };

    // Reset form fields
    const resetForm = () => {
        setFile(null);
        setSemester('');
        setSubjectName('');
        setSubjectCode('');
        setMessage('');
        setUploadProgress(0);
    };

    return (
        <div className="upload-form">
            <h2>Upload a Note</h2>
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label htmlFor="semester">Semester:</label>
                    <input 
                        type="text" 
                        id="semester"
                        value={semester}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input 
                        type="text" 
                        id="subjectName"
                        value={subjectName}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subjectCode">Subject Code (optional):</label>
                    <input 
                        type="text" 
                        id="subjectCode"
                        value={subjectCode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">File:</label>
                    <input 
                        type="file" 
                        id="file"
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        id="message"
                        value={message}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="upload-button">Upload</button>
                {uploadProgress > 0 && 
                    <p className="upload-progress">Upload progress: {uploadProgress.toFixed(2)}%</p>
                }
                {uploadMessage && (
                    <p className={uploadSuccess ? 'upload-success' : 'upload-error'}>
                        {uploadMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

export default UploadForm;
