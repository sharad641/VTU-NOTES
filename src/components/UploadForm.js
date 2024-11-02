// src/components/UploadForm.js

import React, { useState } from 'react';
import { storage, firestore } from '../firebase'; // Ensure this is correctly imported
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './UploadForm.css'; // Ensure correct import for styles

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState(''); // State for semester
    const [subjectName, setSubjectName] = useState(''); // State for subject name
    const [subjectCode, setSubjectCode] = useState(''); // State for subject code (optional)
    const [message, setMessage] = useState(''); // State for message
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
    const handleSemesterChange = (e) => setSemester(e.target.value);
    const handleSubjectNameChange = (e) => setSubjectName(e.target.value);
    const handleSubjectCodeChange = (e) => setSubjectCode(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

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
                        subjectCode, // Optional
                        url: downloadURL,
                        message,
                        uploadedAt: new Date()
                    });
                    setUploadMessage('Thank you for your contribution! Your note has been uploaded successfully.');
                    setUploadSuccess(true);
                    // Reset form fields
                    setFile(null);
                    setSemester('');
                    setSubjectName('');
                    setSubjectCode('');
                    setMessage('');
                    setUploadProgress(0);
                } catch (error) {
                    console.error("Error saving to Firestore:", error);
                    setUploadMessage(`Error saving the document: ${error.message}`);
                    setUploadSuccess(false);
                }
            }
        );
    };

    return (
        <div className="upload-form">
            <h2>Upload a Note</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor="semester">Semester:</label>
                    <input 
                        type="text" 
                        id="semester"
                        value={semester}
                        onChange={handleSemesterChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input 
                        type="text" 
                        id="subjectName"
                        value={subjectName}
                        onChange={handleSubjectNameChange}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="subjectCode">Subject Code (optional):</label>
                    <input 
                        type="text" 
                        id="subjectCode"
                        value={subjectCode}
                        onChange={handleSubjectCodeChange}
                    />
                </div>
                <div>
                    <label htmlFor="file">File:</label>
                    <input 
                        type="file" 
                        id="file"
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        
                        style={{ width: '100%', height: '100px', marginTop: '8px' }} // Styling for the message field
                    />
                </div>
                <button type="submit">Upload</button>
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
