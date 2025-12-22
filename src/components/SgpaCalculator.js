import React, { useState, useEffect } from 'react';
import './SgpaCalculator.css'; // This will be scoped
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  FaUniversity, FaUserGraduate, FaCalculator, 
  FaFilePdf, FaRedo, FaBookOpen, FaAward, 
  FaSpinner, FaChartPie, FaCheckCircle
} from 'react-icons/fa';

export default function SgpaCalculator({ mode = 'full' }) {
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Selection
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  
  // Data
  const [marks, setMarks] = useState({});
  const [studentName, setStudentName] = useState('');
  const [studentUSN, setStudentUSN] = useState('');

  const isWidget = mode === 'widget';

  // 1. Fetch Data
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

  // 2. Handlers
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

  // 3. Grading Logic (VTU 2022)
  const getGradePoint = (mark) => {
    const m = Number(mark);
    if (!mark && mark !== 0) return 0;
    if (m >= 90) return 10;
    if (m >= 80) return 9;
    if (m >= 70) return 8;
    if (m >= 60) return 7;
    if (m >= 55) return 6;
    if (m >= 50) return 6;
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
    if (gp === 5) return 'C'; // or P
    if (gp === 0) return 'F';
    return 'P';
  };

  const getGradeColor = (mark) => {
    const gp = getGradePoint(mark);
    if (gp >= 8) return 'sgpa-grade-green';
    if (gp >= 5) return 'sgpa-grade-orange';
    if (mark === '' || mark === undefined) return '';
    return 'sgpa-grade-red';
  };

  // 4. Advanced Calculations
  const subjects = syllabusData?.[branch]?.[semester] || [];
  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credits), 0);
  
  const totalPoints = subjects.reduce((sum, s) => {
    const m = marks[s.code];
    return sum + (m !== '' && m !== undefined ? getGradePoint(m) * Number(s.credits) : 0);
  }, 0);

  const hasEntry = Object.values(marks).some(m => m !== '');
  const sgpa = (hasEntry && totalCredits > 0) ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  
  // VTU Formula approx: (SGPA - 0.75) * 10 = Percentage
  const percentage = hasEntry ? ((parseFloat(sgpa) - 0.75) * 10).toFixed(1) : '0.0';
  const displayPercentage = parseFloat(percentage) > 0 ? percentage : '0.0';

  const getClassAwarded = (sgpaVal) => {
    const s = parseFloat(sgpaVal);
    if (s >= 7.75) return "Distinction"; // Approx 70%
    if (s >= 6.75) return "First Class"; // Approx 60%
    if (s >= 5.75) return "Second Class";
    if (s > 0) return "Pass Class";
    return "N/A";
  };

  // 5. PDF Generation (unchanged)
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const themeColor = [37, 99, 235];

    doc.setTextColor(240, 240, 240);
    doc.setFontSize(50);
    doc.setFont('helvetica', 'bold');
    doc.text('PROVISIONAL RESULT', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });

    doc.setFillColor(...themeColor);
    doc.rect(0, 0, pageWidth, 5, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('VTU NOTES FOR ALL', 14, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Unofficial SGPA Calculator Report', 14, 26);

    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.text(`Date: ${date}`, pageWidth - 14, 20, { align: 'right' });

    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(250, 252, 255);
    doc.roundedRect(14, 35, pageWidth - 28, 35, 3, 3, 'FD');

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    
    const leftCol = 20;
    const rightCol = pageWidth / 2 + 10;
    const row1 = 45;
    const row2 = 53;
    const row3 = 61;

    doc.setFont('helvetica', 'bold');
    doc.text("Name:", leftCol, row1);
    doc.text("USN:", rightCol, row1);
    doc.text("Stream:", leftCol, row2);
    doc.text("Semester:", rightCol, row2);
    doc.text("Scheme:", leftCol, row3);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(studentName || "----------------", leftCol + 25, row1);
    doc.text(studentUSN || "----------------", rightCol + 25, row1);
    doc.text(branch, leftCol + 25, row2);
    doc.text(semester, rightCol + 25, row2);
    doc.text("VTU 2022", leftCol + 25, row3);

    const startY = 80;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...themeColor);
    doc.text("Performance Summary", 14, startY);

    doc.setFillColor(...themeColor);
    doc.roundedRect(14, startY + 5, 40, 25, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("SGPA", 34, startY + 12, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(sgpa, 34, startY + 22, { align: 'center' });

    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(...themeColor);
    doc.roundedRect(60, startY + 5, 40, 25, 2, 2, 'FD');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("Percentage", 80, startY + 12, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`${displayPercentage}%`, 80, startY + 22, { align: 'center' });

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(106, startY + 5, pageWidth - 120, 25, 2, 2, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text("Class Awarded", 112, startY + 12);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...themeColor);
    doc.text(getClassAwarded(sgpa).toUpperCase(), 112, startY + 22);

    const tableBody = subjects.map(s => {
      const mark = marks[s.code];
      const grade = getGradePoint(mark);
      const label = getGradeLabel(mark);
      return [
        s.code, 
        s.title.substring(0, 45), 
        mark || '-', 
        s.credits, 
        label, 
        grade * Number(s.credits)
      ];
    });

    autoTable(doc, {
      startY: 120,
      head: [['Code', 'Subject Name', 'Marks', 'Credits', 'Grade', 'Points']],
      body: tableBody,
      theme: 'grid',
      headStyles: { 
        fillColor: themeColor, 
        textColor: 255, 
        fontSize: 10,
        fontStyle: 'bold' 
      },
      styles: { 
        fontSize: 9, 
        cellPadding: 4, 
        valign: 'middle',
        lineColor: [220, 220, 220] 
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 25 },
        1: { cellWidth: 'auto' },
        4: { fontStyle: 'bold', halign: 'center' },
        5: { halign: 'center' }
      },
      didParseCell: function(data) {
        if (data.section === 'body' && data.column.index === 4) {
          const val = data.cell.raw;
          if (val === 'O' || val === 'A+') data.cell.styles.textColor = [22, 163, 74];
          if (val === 'F') data.cell.styles.textColor = [220, 38, 38];
        }
      }
    });

    const footerY = pageHeight - 20;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, footerY, pageWidth - 14, footerY);
    
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Note: This is a computer generated report for informational purposes.", 14, footerY + 6);
    doc.text("verify with official university results.", 14, footerY + 10);

    doc.setFillColor(0, 0, 0);
    doc.rect(pageWidth - 25, footerY - 5, 12, 12, 'F');
    doc.setFontSize(6);
    doc.setTextColor(255, 255, 255);
    doc.text("QR", pageWidth - 21.5, footerY + 2.5);

    doc.save(`Transcript_${studentUSN || 'Draft'}.pdf`);
  };

  if (loading) return (
    <div className={`sgpa-loader-container ${isWidget ? 'sgpa-widget-mode' : ''}`}>
      <FaSpinner className="sgpa-spinner"/> Loading...
    </div>
  );

  return (
    <div className={isWidget ? 'sgpa-widget-mode' : 'sgpa-isolated-container'}>
      {/* Header only shows in full mode */}
      {!isWidget && (
        <header className="sgpa-custom-header">
          <div className="sgpa-icon-wrapper"><FaCalculator /></div>
          <h1>Modern SGPA <span className="sgpa-gradient-text">Calculator</span></h1>
          <p>2022 Scheme • {branch}</p>
        </header>
      )}

      <div className="sgpa-responsive-grid">
        
        {/* INPUTS AREA */}
        <div className="sgpa-main-section">
          
          <div className="sgpa-config-card">
            <div className="sgpa-card-title"><FaUniversity /> Academic Configuration</div>
            <div className="sgpa-inputs-group">
              <div className="sgpa-input-field">
                <label>Stream</label>
                <select value={branch} onChange={handleBranchChange} className="sgpa-select">
                  {Object.keys(syllabusData || {}).map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="sgpa-input-field">
                <label>Semester</label>
                <select value={semester} onChange={e => {setSemester(e.target.value); setMarks({});}} className="sgpa-select">
                  {Object.keys(syllabusData?.[branch] || {}).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="sgpa-info-card">
            <div className="sgpa-card-title"><FaUserGraduate /> Student Details</div>
            <div className="sgpa-inputs-group">
              <input type="text" placeholder="Full Name" value={studentName} onChange={e => setStudentName(e.target.value.toUpperCase())} className="sgpa-text-input" />
              <input type="text" placeholder="USN Number" value={studentUSN} onChange={e => setStudentUSN(e.target.value.toUpperCase())} className="sgpa-text-input" />
            </div>
          </div>

          <div className="sgpa-marks-card">
            <div className="sgpa-card-header">
              <div className="sgpa-card-title"><FaBookOpen /> Subject Marks</div>
              <button className="sgpa-reset-btn" onClick={() => setMarks({})}><FaRedo /> Reset</button>
            </div>

            <div className="sgpa-table-scroll-container">
              <table className="sgpa-subjects-table">
                <thead>
                  <tr>
                    <th className="sgpa-th-code">Code</th>
                    <th className="sgpa-th-subject">Subject</th>
                    <th className="sgpa-th-credit">Cr</th>
                    <th className="sgpa-th-mark">Marks</th>
                    <th className="sgpa-th-grade">Gr</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map(s => {
                    const mark = marks[s.code] !== undefined ? marks[s.code] : '';
                    return (
                      <tr key={s.code}>
                        <td className="sgpa-td-code">{s.code}</td>
                        <td className="sgpa-td-subject">{s.title}</td>
                        <td className="sgpa-td-center"><span className="sgpa-credit-badge">{s.credits}</span></td>
                        <td>
                          <input 
                            type="number" 
                            className="sgpa-mark-input" 
                            placeholder="-" 
                            value={mark} 
                            onChange={e => handleMarkChange(s.code, e.target.value)} 
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className={`sgpa-grade-cell ${getGradeColor(mark)}`}>{getGradeLabel(mark)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ANALYTICS SIDEBAR */}
        <div className="sgpa-sidebar-section">
          <div className="sgpa-result-card">
            <div className="sgpa-result-header">
              <FaAward className="sgpa-trophy-icon" /> Result Analysis
            </div>

            <div className="sgpa-circle-container">
              <div className="sgpa-display-circle">
                <span className="sgpa-display-value">{sgpa}</span>
                <span className="sgpa-display-label">SGPA</span>
              </div>
            </div>

            <div className="sgpa-metrics-grid">
              <div className="sgpa-metric-box">
                <span className="sgpa-metric-label">Percentage</span>
                <span className="sgpa-metric-value">{displayPercentage}%</span>
              </div>
              <div className="sgpa-metric-box">
                <span className="sgpa-metric-label">Credits</span>
                <span className="sgpa-metric-value">{totalCredits}</span>
              </div>
            </div>
            
            <div className="sgpa-class-badge">
              <FaCheckCircle /> {getClassAwarded(sgpa)}
            </div>

            <button className="sgpa-pdf-button" onClick={downloadPDF}>
              <FaFilePdf /> Generate Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}