import React, { useState, useRef } from 'react';
import { storage, firestore } from '../firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { 
  CloudUpload, FileText, X, CheckCircle, AlertCircle, 
  Send, Loader2 
} from 'lucide-react';
import styles from './UploadForm.module.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    semester: '',
    subjectName: '',
    subjectCode: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const fileInputRef = useRef(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const validateFile = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 15 * 1024 * 1024) { // 15MB Limit
        setStatus('error');
        setStatusMsg('File too large. Max size is 15MB.');
        return;
      }
      setFile(selectedFile);
      setStatus('idle');
      setStatusMsg('');
    } else {
      setStatus('error');
      setStatusMsg('Only PDF files are allowed.');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  // Drag & Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !formData.semester || !formData.subjectName) {
      setStatus('error');
      setStatusMsg('Please fill required fields & attach a PDF.');
      return;
    }

    setStatus('uploading');
    setProgress(0);

    const storageRef = ref(storage, `notes/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        setStatus('error');
        setStatusMsg(`Upload failed: ${error.message}`);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(firestore, 'notes'), {
            ...formData,
            url: downloadURL,
            fileName: file.name,
            uploadedAt: new Date(),
          });
          setStatus('success');
          setStatusMsg('Notes uploaded successfully!');
          
          // Reset after 3 seconds
          setTimeout(() => {
            setFile(null);
            setFormData({ semester: '', subjectName: '', subjectCode: '', message: '' });
            setStatus('idle');
            setProgress(0);
          }, 3000);
        } catch (error) {
          setStatus('error');
          setStatusMsg(`Database Error: ${error.message}`);
        }
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.header}>
          <h2><CloudUpload size={28} className={styles.iconBrand} /> Contribute Notes</h2>
          <p>Help your juniors by sharing your study materials.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          
          {/* Left Column: File Upload */}
          <div className={styles.leftCol}>
            <div 
              className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''} ${file ? styles.hasFile : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current.click()}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="application/pdf" 
                onChange={handleFileChange} 
                className={styles.hiddenInput} 
              />
              
              {file ? (
                <div className={styles.filePreview}>
                  <div className={styles.fileIcon}><FileText size={40} /></div>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }} className={styles.removeBtn}>
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <CloudUpload size={48} className={styles.cloudIcon} />
                  <p><strong>Click to upload</strong> or drag and drop</p>
                  <span>PDF only (Max 15MB)</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className={styles.rightCol}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="semester" 
                value={formData.semester} 
                onChange={handleChange} 
                required 
                placeholder=" " 
              />
              <label>Semester (e.g., 5th Sem)</label>
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="subjectName" 
                value={formData.subjectName} 
                onChange={handleChange} 
                required 
                placeholder=" " 
              />
              <label>Subject Name</label>
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="subjectCode" 
                value={formData.subjectCode} 
                onChange={handleChange} 
                placeholder=" " 
              />
              <label>Subject Code (Optional)</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder=" " 
                rows="3"
              ></textarea>
              <label>Short Message (Optional)</label>
            </div>

            {/* Status Feedback */}
            {status === 'error' && (
              <div className={styles.errorMsg}>
                <AlertCircle size={16} /> {statusMsg}
              </div>
            )}
            
            {status === 'success' && (
              <div className={styles.successMsg}>
                <CheckCircle size={16} /> {statusMsg}
              </div>
            )}

            {/* Submit Button with Progress */}
            <button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={status === 'uploading' || status === 'success'}
            >
              {status === 'uploading' ? (
                <span className={styles.uploadingState}>
                   <Loader2 className={styles.spinner} size={20} /> {Math.round(progress)}%
                </span>
              ) : status === 'success' ? (
                <span>Uploaded!</span>
              ) : (
                <>Upload Notes <Send size={18} /></>
              )}
              
              {/* Internal Progress Bar fill */}
              {status === 'uploading' && (
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;