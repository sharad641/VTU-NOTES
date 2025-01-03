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
            backgroundColor: '#f3f4f6', // Light gray background
            padding: '2rem',
        },
        form: {
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
        title: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e40af', // Deep blue
            letterSpacing: '0.5px',
        },
        subtitle: {
            fontSize: '1rem',
            color: '#4b5563', // Dark gray
            lineHeight: '1.8',
            margin: '15px 0 25px',
            textAlign: 'center',
            background: '#f1f5f9', // Light gray background
            padding: '20px 25px',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.6rem',
            fontWeight: '600',
            color: '#374151',
            fontSize: '1rem',
        },
        input: {
            width: '100%',
            padding: '0.9rem',
            fontSize: '1rem',
            borderRadius: '10px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            transition: 'all 0.3s ease',
        },
        inputFocus: {
            outline: 'none',
            borderColor: '#2563eb',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 8px rgba(37, 99, 235, 0.25)',
        },
        textArea: {
            minHeight: '140px',
            resize: 'vertical',
        },
        button: {
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            marginTop: '1rem',
        },
        buttonHover: {
            backgroundColor: '#1e3a8a',
        },
        progress: {
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '1rem',
            color: '#6b7280',
        },
        message: {
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '10px',
            fontSize: '1rem',
        },
        success: {
            color: '#16a34a',
            backgroundColor: '#dcfce7',
            border: '1px solid #16a34a',
        },
        error: {
            color: '#b91c1c',
            backgroundColor: '#fee2e2',
            border: '1px solid #dc2626',
        },
    
        /* Media queries for responsiveness */
        '@media (max-width: 768px)': {
            container: {
                padding: '1.5rem', // Smaller padding on mobile
            },
            form: {
                padding: '1.5rem', // Adjusted padding for smaller screens
            },
            title: {
                fontSize: '1.8rem', // Slightly smaller font for titles
            },
            subtitle: {
                fontSize: '0.9rem',
                padding: '15px',
            },
            button: {
                padding: '0.85rem',
                fontSize: '1rem',
            },
        },
        '@media (min-width: 1024px)': {
            container: {
                padding: '3rem', // Extra padding for large screens
            },
            form: {
                maxWidth: '600px', // Wider form on desktops
            },
            title: {
                fontSize: '2.2rem', // Larger font for titles
            },
            subtitle: {
                fontSize: '1rem',
                padding: '20px 30px',
            },
            button: {
                fontSize: '1.15rem',
            },
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
