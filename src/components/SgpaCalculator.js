import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  FaUniversity, FaUserGraduate, FaCalculator,
  FaFilePdf, FaRedo, FaBookOpen, FaAward,
  FaSpinner, FaCheckCircle
} from 'react-icons/fa';
import AdSenseAd from './AdSenseAd';
import './SgpaCalculatorModern.css'; // CHANGED: Modern Dark Theme

export default function SgpaCalculator({ mode = 'full' }) {
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mobile UI States
  const [activeTab, setActiveTab] = useState('input'); // 'input' or 'analysis'

  // Selection
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');

  // Data
  const [marks, setMarks] = useState({});
  const [studentName, setStudentName] = useState('');
  const [studentUSN, setStudentUSN] = useState('');

  const isWidget = mode === 'widget';

  // ... rest of calculations (same as before) ...
  useEffect(() => {
    fetch('/vtu_2022_syllabus.json')
      .then(res => res.json())
      .then(data => {
        setSyllabusData(data);
        const branches = Object.keys(data);
        if (branches.length > 0) {
          setBranch(branches[0]);
          const sems = Object.keys(data[branches[0]]);
          if (sems.length > 0) setSemester(sems[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBranchChange = (e) => {
    const newBranch = e.target.value;
    setBranch(newBranch);
    const sems = Object.keys(syllabusData[newBranch]);
    if (sems.length > 0) setSemester(sems[0]);
    setMarks({});
  };

  const handleMarkChange = (code, value) => {
    if (value === '') {
      setMarks(prev => ({ ...prev, [code]: '' }));
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setMarks(prev => ({ ...prev, [code]: num }));
    }
  };

  const getGradePoint = (mark) => {
    const m = Number(mark);
    if (!mark && mark !== 0) return 0;
    if (m >= 90) return 10;
    if (m >= 80) return 9;
    if (m >= 70) return 8;
    if (m >= 60) return 7;
    if (m >= 45) return 6;
    if (m >= 40) return 5;
    return 0;
  };

  const getGradeLabel = (mark) => {
    if (mark === '' || mark === undefined) return '-';
    const gp = getGradePoint(mark);
    if (gp === 10) return 'O';
    if (gp === 9) return 'A+';
    if (gp === 8) return 'A';
    if (gp === 7) return 'B+';
    if (gp === 6) return 'B';
    if (gp === 5) return 'C';
    if (gp === 0) return 'F';
    return 'P';
  };

  const getGradeColor = (mark) => {
    const gp = getGradePoint(mark);
    if (gp >= 8) return 'grade-excellent';
    if (gp >= 5) return 'grade-pass';
    if (mark === '' || mark === undefined) return '';
    return 'grade-fail';
  };

  const subjects = syllabusData?.[branch]?.[semester] || [];
  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credits), 0);

  const totalPoints = subjects.reduce((sum, s) => {
    const m = marks[s.code];
    return sum + (m !== '' && m !== undefined ? getGradePoint(m) * Number(s.credits) : 0);
  }, 0);

  const hasEntry = Object.values(marks).some(m => m !== '');
  const sgpa = (hasEntry && totalCredits > 0) ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  const percentage = hasEntry ? ((parseFloat(sgpa) - 0.75) * 10).toFixed(1) : '0.0';
  const displayPercentage = parseFloat(percentage) > 0 ? percentage : '0.0';

  const getClassAwarded = (sgpaVal) => {
    const s = parseFloat(sgpaVal);
    if (s >= 7.75) return "Distinction";
    if (s >= 6.75) return "First Class";
    if (s >= 5.75) return "Second Class";
    if (s > 0) return "Pass Class";
    return "N/A";
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const themeColor = [99, 102, 241];
    doc.setTextColor(240, 240, 240); doc.setFontSize(50); doc.setFont('helvetica', 'bold');
    doc.text('PROVISIONAL RESULT', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    doc.setFillColor(...themeColor); doc.rect(0, 0, pageWidth, 5, 'F');
    doc.setTextColor(0, 0, 0); doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('VTU NOTES - ACADEMICS', 14, 20);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 100, 100);
    doc.text('Official SGPA Analytics Report', 14, 26);
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.text(`Date: ${date}`, pageWidth - 14, 20, { align: 'right' });
    doc.setDrawColor(220, 220, 220); doc.setFillColor(250, 252, 255);
    doc.roundedRect(14, 35, pageWidth - 28, 35, 3, 3, 'FD');
    doc.setFontSize(11); doc.setTextColor(60, 60, 60);
    const leftCol = 20; const rightCol = pageWidth / 2 + 10;
    const row1 = 45; const row2 = 53; const row3 = 61;
    doc.setFont('helvetica', 'bold'); doc.text("Name:", leftCol, row1); doc.text("USN:", rightCol, row1);
    doc.text("Stream:", leftCol, row2); doc.text("Semester:", rightCol, row2); doc.text("Scheme:", leftCol, row3);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(0, 0, 0);
    doc.text(studentName || "----------------", leftCol + 25, row1);
    doc.text(studentUSN || "----------------", rightCol + 25, row1);
    doc.text(branch, leftCol + 25, row2); doc.text(semester, rightCol + 25, row2);
    doc.text("VTU 2022 (Extreme)", leftCol + 25, row3);
    const startY = 80; doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...themeColor); doc.text("Academic Performance Summary", 14, startY);
    doc.setFillColor(...themeColor); doc.roundedRect(14, startY + 5, 40, 25, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(9); doc.text("SGPA", 34, startY + 12, { align: 'center' });
    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); doc.text(sgpa, 34, startY + 22, { align: 'center' });
    doc.setFillColor(241, 245, 249); doc.setDrawColor(...themeColor);
    doc.roundedRect(60, startY + 5, 40, 25, 2, 2, 'FD');
    doc.setTextColor(0, 0, 0); doc.setFontSize(9); doc.text("Percentage", 80, startY + 12, { align: 'center' });
    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); doc.text(`${displayPercentage}%`, 80, startY + 22, { align: 'center' });
    doc.setFillColor(241, 245, 249); doc.roundedRect(106, startY + 5, pageWidth - 120, 25, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.text("Class Awarded", 112, startY + 12);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(...themeColor);
    doc.text(getClassAwarded(sgpa).toUpperCase(), 112, startY + 22);
    const tableBody = subjects.map(s => {
      const mark = marks[s.code];
      const grade = getGradePoint(mark);
      const label = getGradeLabel(mark);
      return [s.code, s.title.substring(0, 45), mark || '-', s.credits, label, grade * Number(s.credits)];
    });
    autoTable(doc, {
      startY: 120, head: [['Code', 'Subject Name', 'Marks', 'Credits', 'Grade', 'Points']], body: tableBody,
      theme: 'grid', headStyles: { fillColor: themeColor, textColor: 255, fontSize: 10, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4, valign: 'middle', lineColor: [220, 220, 220] },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 25 }, 1: { cellWidth: 'auto' }, 4: { fontStyle: 'bold', halign: 'center' }, 5: { halign: 'center' } }
    });
    const footerY = pageHeight - 20; doc.setDrawColor(200, 200, 200); doc.line(14, footerY, pageWidth - 14, footerY);
    doc.setFontSize(8); doc.setTextColor(150, 150, 150);
    doc.text("This report is generated using VTU Notes Portal (3.0 Extreme Engine).", 14, footerY + 6);
    doc.text("Always verify with official board results.", 14, footerY + 10);
    doc.save(`Transcript_${studentUSN || 'VTU'}_3.0.pdf`);
  };

  if (loading) return (
    <div className="sgpa-loader-extreme">
      <FaSpinner className="spin-icon" /> <span>Re-initializing Analytics Engine...</span>
    </div>
  );

  return (
    <div className={`sgpa-portal-root ${isWidget ? 'is-widget' : ''}`}>
      {/* --- Floating Background Shapes --- */}
      <div className="papers-background-shapes">
        <div className="shape s1"></div><div className="shape s2"></div><div className="shape s3"></div>
      </div>

      {/* --- Mobile Floating Sticky Dock --- */}
      <AnimatePresence>
        {hasEntry && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="mobile-sticky-result-dock"
          >
            <div className="dock-glass">
              <div className="dock-val">
                <span className="d-label">SGPA</span>
                <span className="d-score">{sgpa}</span>
              </div>
              <div className="dock-divider"></div>
              <div className="dock-val">
                <span className="d-label">PERC</span>
                <span className="d-score">{displayPercentage}%</span>
              </div>
              <button className="dock-pdf-btn" onClick={downloadPDF}><FaFilePdf /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="portal-container">
        {!isWidget && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="sgpa-hero-card">
            <div className="hero-mesh-bg"></div>
            <div className="header-content">
              <div className="header-badge-group">
                <span className="scheme-badge">VTU 2022 Scheme</span>
                <span className="live-badge">System Core 3.0</span>
              </div>
              <motion.h1 layout>SGPA <span className="title-alt">Engine</span></motion.h1>
              <p className="hero-p">Hyper-precise academic analytics for VTU students.</p>
            </div>
          </motion.div>
        )}

        {/* Premium Mobile Navigation Island */}
        <div className="mobile-view-tabs-island">
          <button
            className={`tab-item ${activeTab === 'input' ? 'active' : ''}`}
            onClick={() => setActiveTab('input')}
          >
            <div className="tab-icon-box"><FaBookOpen /></div>
            <span>Input</span>
          </button>
          <button
            className={`tab-item ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            <div className="tab-icon-box"><FaAward /></div>
            <span>Analysis</span>
          </button>
          <div className="active-tab-indicator" style={{ transform: `translateX(${activeTab === 'input' ? '0' : '100%'})` }}></div>
        </div>

        <div className={`sgpa-extreme-grid ${activeTab}`}>
          {/* Main Controls Section */}
          <div className="sgpa-control-column">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card config-card glass-noise">
              <div className="card-title-v3"><FaUniversity /> <span>Configuration</span></div>
              <div className="inputs-grid">
                <div className="input-group">
                  <label>Stream</label>
                  <select value={branch} onChange={handleBranchChange} className="extreme-select">
                    {Object.keys(syllabusData || {}).map(b => (<option key={b} value={b}>{b}</option>))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Semester</label>
                  <select value={semester} onChange={e => { setSemester(e.target.value); setMarks({}); }} className="extreme-select">
                    {Object.keys(syllabusData?.[branch] || {}).map(s => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card info-card glass-noise">
              <div className="card-title-v3"><FaUserGraduate /> <span>Identity</span></div>
              <div className="inputs-grid">
                <input type="text" placeholder="NAME" value={studentName} onChange={e => setStudentName(e.target.value.toUpperCase())} className="extreme-input" />
                <input type="text" placeholder="USN" value={studentUSN} onChange={e => setStudentUSN(e.target.value.toUpperCase())} className="extreme-input" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card marks-card glass-noise">
              <div className="card-header-v3">
                <div className="card-title-v3"><FaBookOpen /> <span>Subject Marks</span></div>
                <button className="reset-prime-btn" onClick={() => setMarks({})}><FaRedo /></button>
              </div>
              <div className="marks-scroller-v3">
                <table className="extreme-table">
                  <thead><tr><th>CODE</th><th>SUBJECT</th><th>CR</th><th className="th-center">SCORE</th><th className="th-center">GRAD</th></tr></thead>
                  <tbody>
                    <AnimatePresence mode='popLayout'>
                      {subjects.map((s, idx) => {
                        const mark = marks[s.code] !== undefined ? marks[s.code] : '';
                        return (
                          <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={s.code} transition={{ delay: idx * 0.05 }}>
                            <td className="td-code">{s.code}</td>
                            <td className="td-title">{s.title}</td>
                            <td className="td-center"><span className="credit-pill">{s.credits}</span></td>
                            <td className="td-center">
                              <input type="number" className="extreme-mark-input" placeholder="00" value={mark} onChange={e => handleMarkChange(s.code, e.target.value)} />
                            </td>
                            <td className={`td-center grade-cell ${getGradeColor(mark)}`}>{getGradeLabel(mark)}</td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Results Sidebar */}
          <div className="sgpa-result-column">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="result-core-extreme glass-noise">
              <div className="core-header"><FaAward className="trophy-v3" /> <span>Analysis</span></div>
              <div className="neon-circle-engine">
                <div className="rotating-neon"></div>
                <div className="inner-display"><span className="sgpa-val">{sgpa}</span><span className="sgpa-label">SGPA</span></div>
              </div>
              <div className="metrics-extreme">
                <div className="m-box"><span className="m-val">{displayPercentage}%</span><span className="m-label">Percentage</span></div>
                <div className="m-box"><span className="m-val">{totalCredits}</span><span className="m-label">Credits</span></div>
              </div>
              <div className="class-pioneer-badge"><FaCheckCircle className="check-v3" /> <span>{getClassAwarded(sgpa)}</span></div>
              <button className="generate-report-btn" onClick={downloadPDF}><FaFilePdf /> <span>GENERATE REPORT</span></button>
            </motion.div>
            <div className="sidebar-ad-space"><AdSenseAd adClient="ca-pub-9499544849301534" adSlot="7579321744" adFormat="auto" fullWidthResponsive={true} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}