import React, { useState } from 'react';
import { storage, firestore } from '../firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import styles from './UploadForm.module.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setFeedbackMessage('');
      setIsSuccess(null);
    } else if (selectedFile) {
      setFeedbackMessage('Please select a valid PDF file.');
      setIsSuccess(false);
      setFile(null);
      e.target.value = null;
    }
  };

  const resetForm = () => {
    setFile(null);
    setSemester('');
    setSubjectName('');
    setSubjectCode('');
    setMessage('');
    setUploadProgress(0);
    setIsUploading(false);
    setTimeout(() => {
      setFeedbackMessage('');
      setIsSuccess(null);
    }, 5000);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !semester || !subjectName) {
      setFeedbackMessage('Please fill all required fields and select a file.');
      setIsSuccess(false);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setFeedbackMessage('');
    setIsSuccess(null);

    const storageRef = ref(storage, `notes/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setFeedbackMessage(`Upload failed: ${error.message}`);
        setIsSuccess(false);
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(firestore, 'notes'), {
            semester,
            subjectName,
            subjectCode,
            url: downloadURL,
            fileName: file.name,
            message,
            uploadedAt: new Date(),
          });
          setFeedbackMessage('🎉 Upload successful! Thank you for your contribution.');
          setIsSuccess(true);
          resetForm();
        } catch (error) {
          setFeedbackMessage(`Error saving document: ${error.message}`);
          setIsSuccess(false);
          setIsUploading(false);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleUpload}>

        <div className={styles.header}>
          <h2 className={styles.title}>Upload Your Notes</h2>
          <p className={styles.subtitle}>
            Help fellow students by sharing your study materials. Your contribution matters.
          </p>
        </div>

        {/* ---------- TWO-COLUMN FORM ---------- */}
        <div className={styles.formColumns}>
          <div className={styles.formLeft}>
            {/** Semester */}
            <div className={styles.formGroup}>
              <input type="text" value={semester} onChange={e => setSemester(e.target.value)} className={styles.input} placeholder=" " required />
              <label className={styles.label}>Semester</label>
            </div>

            {/** Subject Name */}
            <div className={styles.formGroup}>
              <input type="text" value={subjectName} onChange={e => setSubjectName(e.target.value)} className={styles.input} placeholder=" " required />
              <label className={styles.label}>Subject Name</label>
            </div>

            {/** Subject Code */}
            <div className={styles.formGroup}>
              <input type="text" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} className={styles.input} placeholder=" " />
              <label className={styles.label}>Subject Code (Optional)</label>
            </div>
          </div>

          <div className={styles.formRight}>
            {/** Optional Message */}
            <div className={styles.formGroup}>
              <textarea value={message} onChange={e => setMessage(e.target.value)} className={styles.textarea} placeholder=" "></textarea>
              <label className={styles.label}>Optional Message</label>
            </div>

            {/** File Upload */}
            <div className={styles.formGroup}>
              <label className={styles.fileUploadLabel}>
                <span>{file ? file.name : 'Choose a PDF file...'}</span>
                <div className={styles.fileUploadButton}>Browse</div>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} required />
              </label>
            </div>
          </div>
        </div>

        {/** Progress Bar */}
        {isUploading && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}

        {/** Feedback Message */}
        {feedbackMessage && (
          <div className={`${styles.feedbackMessage} ${isSuccess ? styles.success : styles.error}`}>
            {feedbackMessage}
          </div>
        )}

        {/** Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={isUploading}>
          {isUploading ? `Uploading... ${Math.round(uploadProgress)}%` : 'Upload Notes'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
