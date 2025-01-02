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

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            padding: '1rem',
        },
        form: {
            maxWidth: '500px',
            width: '100%',
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#1d4ed8',
        },
        subtitle: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            color: '#4b5563',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            transition: 'all 0.3s',
        },
        textArea: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            minHeight: '100px',
            resize: 'vertical',
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginTop: '1rem',
        },
        buttonHover: {
            backgroundColor: '#1d4ed8',
        },
        progress: {
            marginTop: '1rem',
            textAlign: 'center',
            color: '#6b7280',
        },
        message: {
            textAlign: 'center',
            fontWeight: '600',
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '8px',
        },
        success: {
            color: '#16a34a',
            backgroundColor: '#d1fae5',
        },
        error: {
            color: '#dc2626',
            backgroundColor: '#fee2e2',
        },
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
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleUpload}>
                <h2 style={styles.title}>Upload Your Notes</h2>
                <p style={styles.subtitle}>
                    Join our mission to help students excel by sharing your valuable notes and study materials. 
                    Your contributions will make a significant difference in the learning journey of your peers.
                </p>
                {uploadMessage && (
                    <p style={{ ...styles.message, ...(uploadSuccess ? styles.success : styles.error) }}>
                        {uploadMessage}
                    </p>
                )}
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="semester">Semester:</label>
                    <input
                        id="semester"
                        type="text"
                        value={semester}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="subjectName">Subject Name:</label>
                    <input
                        id="subjectName"
                        type="text"
                        value={subjectName}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="subjectCode">Subject Code (optional):</label>
                    <input
                        id="subjectCode"
                        type="text"
                        value={subjectCode}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="file">File:</label>
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleInputChange}
                        style={styles.textArea}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Upload
                </button>
                {uploadProgress > 0 && (
                    <p style={styles.progress}>Upload progress: {uploadProgress.toFixed(2)}%</p>
                )}
            </form>
        </div>
    );
};

export default UploadForm;
