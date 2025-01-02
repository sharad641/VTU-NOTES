import React, { useState } from 'react';
import { storage, firestore } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './uploadform.css';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

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
        <div className="upload-container">
            <form className="upload-form" onSubmit={handleUpload}>
                <h2 className="form-title">Upload Your Notes</h2>
                <p className="form-subtitle">
                    Join our mission to help students excel by sharing your valuable notes and study materials. 
                    Your contributions will make a significant difference in the learning journey of your peers.
                </p>
                {uploadMessage && (
                    <p className={`form-message ${uploadSuccess ? 'success' : 'error'}`}>
                        {uploadMessage}
                    </p>
                )}
                <div className="form-group">
                    <label className="form-label" htmlFor="semester">Semester:</label>
                    <input
                        id="semester"
                        type="text"
                        value={semester}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="subjectName">Subject Name:</label>
                    <input
                        id="subjectName"
                        type="text"
                        value={subjectName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="subjectCode">Subject Code (optional):</label>
                    <input
                        id="subjectCode"
                        type="text"
                        value={subjectCode}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="file">File:</label>
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleInputChange}
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="form-button">
                    Upload
                </button>
                {uploadProgress > 0 && (
                    <p className="progress-text">Upload progress: {uploadProgress.toFixed(2)}%</p>
                )}
            </form>
        </div>
    );
};

export default UploadForm;
