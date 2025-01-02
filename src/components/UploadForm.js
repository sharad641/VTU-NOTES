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
            backgroundColor: '#f8fafc',
            padding: '2rem',
        },
        form: {
            maxWidth: '500px',
            width: '100%',
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        formHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e3a8a',
            letterSpacing: '0.5px',
        },
        subtitle: {
            fontSize: '1rem',
            color: '#4a5568',
            lineHeight: '1.6',
            margin: '15px 0 20px',
            textAlign: 'center',
            maxWidth: '800px',
            background: '#f3ecec',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151',
            fontSize: '0.95rem',
        },
        input: {
            width: '100%',
            padding: '0.85rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            transition: 'all 0.3s ease-in-out',
        },
        inputFocus: {
            outline: 'none',
            borderColor: '#2563eb',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 8px rgba(37, 99, 235, 0.25)',
        },
        textArea: {
            minHeight: '120px',
            resize: 'vertical',
        },
        button: {
            width: '100%',
            padding: '0.85rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out, transform 0.2s ease',
            marginTop: '1rem',
        },
        buttonHover: {
            backgroundColor: '#1e40af',
        },
        progress: {
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.95rem',
            color: '#6b7280',
        },
        message: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '1rem',
        },
        success: {
            color: '#16a34a',
            backgroundColor: '#d1fae5',
            border: '1px solid #16a34a',
        },
        error: {
            color: '#dc2626',
            backgroundColor: '#fee2e2',
            border: '1px solid #dc2626',
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
                        style={{ ...styles.input, ...styles.textArea }}
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
