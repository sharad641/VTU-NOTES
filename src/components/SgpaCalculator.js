import React, { useState, useEffect } from 'react';
import './SgpaCalculator.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import logo from '../assets/logo2.png';

export default function SgpaCalculator() {
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [marks, setMarks] = useState({});
  const [studentName, setStudentName] = useState('');
  const [studentUSN, setStudentUSN] = useState('');
  const [mobileCardOpen, setMobileCardOpen] = useState({}); // For collapsible mobile cards

  useEffect(() => {
    fetch('/vtu_2022_syllabus.json')
      .then(res => res.json())
      .then(data => {
        setSyllabusData(data);
        const defaultBranch = Object.keys(data)[0];
        const defaultSemester = Object.keys(data[defaultBranch])[0];
        setBranch(defaultBranch);
        setSemester(defaultSemester);
      })
      .catch(err => { console.error(err); alert('❌ Could not load VTU syllabus data.'); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (syllabusData && branch) {
      const sems = Object.keys(syllabusData[branch]);
      if (!sems.includes(semester)) setSemester(sems[0]);
      setMarks({});
    }
  }, [branch, syllabusData, semester]);

  const handleMarkChange = (code, value) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= 100) setMarks(prev => ({ ...prev, [code]: num }));
    else setMarks(prev => ({ ...prev, [code]: '' }));
  };

  const handleNameChange = value => setStudentName(value.toUpperCase());
  const handleUSNChange = value => setStudentUSN(value.toUpperCase().replace(/[^A-Z0-9]/g, ''));

  const getGradePoint = mark => {
    if (mark >= 90) return 10;
    if (mark >= 80) return 9;
    if (mark >= 70) return 8;
    if (mark >= 60) return 7;
    if (mark >= 50) return 6;
    if (mark >= 45) return 5;
    return 0;
  };

  if (loading) return <div className="sgpa-container">🔄 Loading syllabus data…</div>;
  if (!syllabusData) return <div className="sgpa-container">❌ Error loading data.</div>;

  const branches = Object.keys(syllabusData);
  const semesters = Object.keys(syllabusData[branch] || {});
  const subjects = syllabusData[branch][semester] || [];

  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credits), 0);
  const totalPoints = subjects.reduce((sum, s) => sum + getGradePoint(marks[s.code]) * s.credits, 0);
  const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  const toggleMobileCard = code => {
    setMobileCardOpen(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const getGradeClass = mark => {
    if (mark === '') return '';
    const gp = getGradePoint(mark);
    if (gp >= 6) return 'grade-pass';
    if (gp === 5) return 'grade-marginal';
    return 'grade-fail';
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Watermark
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.text('vtunotesforall.in', pageWidth / 2, 150, { align: 'center', angle: 45 });
    doc.setTextColor(0, 0, 0);

    // Header
    doc.setFillColor(26, 26, 64);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.addImage(logo, 'PNG', 10, 2, 20, 20);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('VTU SGPA Report – 2022 Scheme', pageWidth / 2 + 10, 16, { align: 'center' });

    // Student Info Box
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    const date = new Date().toLocaleDateString('en-GB');
    doc.setFillColor(243, 246, 255);
    doc.roundedRect(14, 35, pageWidth - 28, 30, 3, 3, 'F');
    doc.text(`Name: ${studentName || '---'}`, 20, 45);
    doc.text(`USN: ${studentUSN || '---'}`, pageWidth / 2, 45);
    doc.text(`Semester: ${semester}`, 20, 55);
    doc.text(`Generated on: ${date}`, pageWidth / 2, 55);

    // SGPA Box
    doc.setFillColor(26, 26, 64);
    doc.roundedRect(14, 75, pageWidth - 28, 40, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Your SGPA', pageWidth / 2, 90, { align: 'center' });
    doc.setFontSize(32);
    doc.text(`${sgpa}`, pageWidth / 2, 105, { align: 'center' });

    // Table
    const tableBody = subjects.map(s => {
      const mark = marks[s.code] || 0;
      const grade = getGradePoint(mark);
      return [s.code, mark, grade, s.credits, grade * s.credits];
    });
    autoTable(doc, {
      startY: 145,
      head: [['Code', 'Marks', 'Grade', 'Credits', 'Points']],
      body: tableBody,
      theme: 'grid',
      styles: { halign: 'center', fontSize: 11 },
      headStyles: { fillColor: [26, 26, 64], textColor: [255, 255, 255] },
    });

    // QR Code
    const qrDataURL = await QRCode.toDataURL('https://vtunotesforall.in');
    const qrSize = 35;
    doc.addImage(qrDataURL, 'PNG', pageWidth / 2 - qrSize / 2, 250, qrSize, qrSize);
    doc.setFontSize(10);
    doc.text('Scan for more VTU resources', pageWidth / 2, 250 + qrSize + 6, { align: 'center' });

    // Footer
    doc.setFillColor(26, 26, 64);
    doc.rect(0, 285, pageWidth, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Generated via vtunotesforall.in', pageWidth / 2, 293, { align: 'center' });

    doc.save(`VTU_SGPA_Report_${branch}_${semester}.pdf`);
  };

  return (
    <div className="sgpa-container">
      <h1>📊 VTU SGPA Calculator (2022 Scheme)</h1>

      <div className="section-card">
        <h3>Select Your Details</h3>
        <label>Branch:</label>
        <select value={branch} onChange={e => setBranch(e.target.value)}>
          <option value="" disabled>Select Branch</option>
          {branches.map(b => <option key={b} value={b}>{b.replace(/_/g, ' ')}</option>)}
        </select>

        <label>Semester:</label>
        <select value={semester} onChange={e => { setSemester(e.target.value); setMarks({}); }}>
          <option value="" disabled>Select Semester</option>
          {semesters.map(sem => <option key={sem} value={sem}>{sem}</option>)}
        </select>
      </div>

      <div className="alert-box">Enter 0 if you don't have marks for any subject</div>

      <div className="section-card">
        <h3>Enter Your Details</h3>
        <input type="text" placeholder="Enter Name" value={studentName} onChange={e => handleNameChange(e.target.value)} />
        <input type="text" placeholder="Enter USN" value={studentUSN} onChange={e => handleUSNChange(e.target.value)} />
      </div>

      <div className="section-card">
        <h3>Enter Marks</h3>

        {/* Desktop Table */}
        <div className="desktop-view">
          <table className="syllabus-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject</th>
                <th>Credits</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => {
                const mark = marks[s.code] || '';
                return (
                  <tr key={s.code}>
                    <td>{s.code}</td>
                    <td>{s.title}</td>
                    <td>{s.credits}</td>
                    <td>
                      <input type="number" min="0" max="100" value={mark} onChange={e => handleMarkChange(s.code, e.target.value)} />
                    </td>
                    <td className={getGradeClass(mark)}>{mark !== '' ? getGradePoint(mark) : '--'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="mobile-card-view">
          {subjects.map(s => {
            const mark = marks[s.code] || '';
            return (
              <div className="subject-card" key={s.code}>
                <div onClick={() => toggleMobileCard(s.code)} style={{cursor:'pointer'}}>
                  <h4>{s.title} ({s.code})</h4>
                </div>
                {mobileCardOpen[s.code] && (
                  <div className="mobile-card-content">
                    <p><strong>Credits:</strong> {s.credits}</p>
                    <input type="number" min="0" max="100" value={mark} onChange={e => handleMarkChange(s.code, e.target.value)} />
                    <p><strong>Grade:</strong> <span className={getGradeClass(mark)}>{mark !== '' ? getGradePoint(mark) : '--'}</span></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sgpa-result">
        <strong>SGPA:</strong> {sgpa} &nbsp; (Total Credits: {totalCredits})
      </div>

      <button className="download-btn" onClick={downloadPDF}>⬇ Download / Print Result</button>
    </div>
  );
}
