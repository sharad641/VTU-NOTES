import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookOpen,
  FaArrowRight,
  FaSearch,
  FaHome,
  FaChevronRight,
  FaFolder,
  FaFileAlt,
  FaCheckCircle,
  FaBolt,
  FaLayerGroup,
  FaGraduationCap
} from 'react-icons/fa';
import { HiHome, HiChevronRight, HiAcademicCap, HiInbox } from 'react-icons/hi2';
import AdSenseAd from './AdSenseAd';
import './SubjectsModern.css'; // CHANGED: Modern Dark Theme
import { subjectsData } from '../data/subjectsData';

const Subjects = () => {
  const { branch, semester } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // --- DATA ---
  // Imported from ../data/subjectsData.js

  const handleSubjectClick = (subject) => {
    navigate(`/branch/${branch}/${semester}/modules/${subject.name}`);
  };

  const subjects = subjectsData[branch?.toLowerCase()]?.[parseInt(semester)] || [];
  const branchName = branch === 'first-year' ? 'First Year' : branch?.toUpperCase();

  return (
    <div className="subjects-portal-root">
      {/* --- Floating Background Elements --- */}
      <div className="papers-background-shapes">
        <div className="shape s1"></div>
        <div className="shape s2"></div>
        <div className="shape s3"></div>
      </div>

      <div className="content-wrapper">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="breadcrumbs-modern glass-noise"
        >
          <button onClick={() => navigate('/')} className="breadcrumb-item">
            <HiHome />
            <span>Home</span>
          </button>
          <HiChevronRight className="breadcrumb-separator" />
          <button onClick={() => navigate(-1)} className="breadcrumb-item">
            <span>{branchName}</span>
          </button>
          <HiChevronRight className="breadcrumb-separator" />
          <span className="breadcrumb-current">Semester {semester}</span>
        </motion.div>

        {/* Modern Header Level 3.0 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="subjects-header-extreme"
        >
          <div className="hero-mesh-bg"></div>
          <div className="header-content">
            <div className="header-badge-group">
              <span className="branch-badge">{branchName}</span>
              <span className="semester-badge">Level {semester}</span>
            </div>
            <motion.h1 layout className="page-title">
              Academic <span className="title-alt">Catalog</span>
            </motion.h1>
            <p className="page-subtitle">
              Verified study modules and secure knowledge repositories.
            </p>
          </div>

          {/* Extreme Stats Bar */}
          <div className="stats-island-extreme">
            <div className="stat-card">
              <div className="stat-glow"></div>
              <div className="stat-val">{subjects.length}</div>
              <div className="stat-label">Subjects</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-val">{subjects.length * 5}</div>
              <div className="stat-label">Assets</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-val">100%</div>
              <div className="stat-label">Verified</div>
            </div>
          </div>
        </motion.div>

        {/* Subjects Grid with Staggered Animations */}
        <motion.div layout className="subjects-extreme-grid">
          <AnimatePresence mode='popLayout'>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <motion.div
                  layout
                  key={`${subject.code}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10, perspective: 1000 }}
                  className="subject-extreme-card"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="card-glass-noise"></div>
                  <div className="card-header-v3">
                    <div className="icon-frame">
                      <FaBookOpen />
                    </div>
                    <span className="credits-tag">{subject.credits} CR</span>
                  </div>

                  <div className="card-body-v3">
                    <div className="subject-id-vibe">{subject.code}</div>
                    <h3 className="subject-title">{subject.name}</h3>
                    <p className="subject-summary">
                      {subject.info || "Access high-fidelity study modules and verified resources."}
                    </p>
                  </div>

                  <div className="card-footer-v3">
                    <span className="action-text">Access Modules</span>
                    <div className="action-arrow">
                      <FaArrowRight />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              /* Extreme Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state-extreme glass-noise"
              >
                <div className="empty-glow"></div>
                <HiInbox className="empty-icon-v3" />
                <h2>Vault Empty</h2>
                <p>We are currently colonizing resources for {branchName} Sem {semester}.</p>
                <button className="reinit-button" onClick={() => navigate(-1)}>
                  Return to Base
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="portal-footer-ad content-wrapper">
        <AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" adFormat="auto" fullWidthResponsive={true} />
      </div>
    </div>
  );
};

export default Subjects;
