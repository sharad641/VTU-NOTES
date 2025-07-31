import React, { useState, useEffect } from 'react';
import './SgpaCalculator.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import CommentSection from './CommentSection';

export default function SgpaCalculator() {
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [marks, setMarks] = useState({});
  const [studentName, setStudentName] = useState('');
  const [studentUSN, setStudentUSN] = useState('');
  

  useEffect(() => {
    fetch('/vtu_2022_syllabus.json')
      .then((res) => res.json())
      .then((data) => {
        setSyllabusData(data);
        const defaultBranch = Object.keys(data)[0];
        const defaultSemester = Object.keys(data[defaultBranch])[0];
        setBranch(defaultBranch);
        setSemester(defaultSemester);
      })
      .catch((err) => {
        console.error(err);
        alert('❌ Could not load VTU syllabus data.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (syllabusData && branch) {
      const sems = Object.keys(syllabusData[branch]);
      if (!sems.includes(semester)) {
        setSemester(sems[0]);
      }
      setMarks({});
    }
  }, [branch, syllabusData, semester]);

  const handleMarkChange = (code, value) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setMarks((prev) => ({ ...prev, [code]: num }));
    } else {
      setMarks((prev) => ({ ...prev, [code]: '' }));
    }
  };

  const getGradePoint = (mark) => {
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
  const weightedSum = subjects.reduce((sum, s) => {
    const mark = marks[s.code];
    const gp = getGradePoint(mark);
    return sum + gp * Number(s.credits);
  }, 0);
  const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
  const totalMarks = subjects.reduce((sum, s) => sum + (marks[s.code] || 0), 0);
  const totalGrades = subjects.reduce((sum, s) => sum + getGradePoint(marks[s.code]), 0);
  const totalPoints = subjects.reduce((sum, s) => sum + getGradePoint(marks[s.code]) * s.credits, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const addWatermark = () => {
      doc.setFontSize(60);
      doc.setTextColor(240, 240, 240);
      doc.text('vtunotesforall.in', pageWidth / 2, 150, { align: 'center', angle: 45 });
      doc.setTextColor(0, 0, 0);
    };

    addWatermark();

    doc.setFillColor(26, 26, 64);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('VTU SGPA Report – 2022 Scheme', pageWidth / 2, 16, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    const generatedDate = new Date().toLocaleString();
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 35, pageWidth - 28, 30, 3, 3, 'F');
    doc.text(`Name: ${studentName || '---'}`, 20, 45);
    doc.text(`USN: ${studentUSN || '---'}`, pageWidth / 2, 45);
    doc.text(`Semester: ${semester}`, 20, 55);
    doc.text(`Generated: ${generatedDate}`, pageWidth / 2, 55);

    doc.setFillColor(26, 26, 64);
    doc.roundedRect(14, 75, pageWidth - 28, 40, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Your SGPA', pageWidth / 2, 90, { align: 'center' });
    doc.setFontSize(32);
    doc.text(`${sgpa}`, pageWidth / 2, 105, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(
      `SGPA = (Sum of (Grade × Credits)) / (Total Credits)\n${totalPoints.toFixed(2)} ÷ ${totalCredits.toFixed(2)} = ${sgpa}`,
      pageWidth / 2,
      125,
      { align: 'center' }
    );

    const tableBody = subjects.map((sub) => {
      const mark = marks[sub.code] || 0;
      const grade = getGradePoint(mark);
      const points = grade * sub.credits;
      return [sub.code, mark, grade, sub.credits, points];
    });
    tableBody.push(['Total', totalMarks.toFixed(2), totalGrades.toFixed(2), totalCredits.toFixed(2), totalPoints.toFixed(2)]);

    autoTable(doc, {
      startY: 145,
      head: [['Subject Code', 'Marks', 'Grade', 'Credits', 'Points']],
      body: tableBody,
      theme: 'grid',
      styles: { halign: 'center', font: 'helvetica', fontSize: 11 },
      headStyles: { fillColor: [26, 26, 64], textColor: [255, 255, 255], fontSize: 12 },
      alternateRowStyles: { fillColor: [247, 248, 250] },
      footStyles: { fillColor: [230, 240, 255], textColor: [0, 0, 0], fontStyle: 'bold' },
    });

    doc.addPage();
    addWatermark();
    doc.setFontSize(20);
    doc.setTextColor(26, 26, 64);
    doc.setFont('helvetica', 'bold');
    doc.text('A Note from VTU Notes Team', pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(13);
    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    const message =
      `Dear Student,\n\n` +
      `Thank you for using the VTU SGPA Calculator at vtunotesforall.in!\n\n` +
      `Your academic progress is important, and this tool is designed to make calculating your SGPA simple, accurate, and stress-free.\n\n` +
      `If you found this helpful, please share it with your friends and classmates — let's help more VTU students stay ahead together.\n\n` +
      `All the best for your exams and future endeavors!\n\n` +
      `– Team vtunotesforall.in`;
    doc.text(message, 20, 70, { maxWidth: pageWidth - 40, align: 'left' });

    doc.save(`VTU_SGPA_Report_${branch}_${semester}.pdf`);
  };

  return (
      <>
    <div className="sgpa-container">
      <h1>📊 VTU SGPA Calculator (2022 Scheme)</h1>

      <div className="section-card">
        <h3>Select Your Details</h3>
        <label>Branch:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          {branches.map((b) => (
            <option key={b} value={b}>{b.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <label>Semester:</label>
        <select value={semester} onChange={(e) => { setSemester(e.target.value); setMarks({}); }}>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
      </div>

      <div className="alert-box">
        Enter 0 if you don't have marks for any subject
      </div>

      <div className="section-card">
        <h3>Enter Your Details</h3>
        <input type="text" placeholder="Enter Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input type="text" placeholder="Enter USN" value={studentUSN} onChange={(e) => setStudentUSN(e.target.value.toUpperCase())} />
      </div>

      <div className="section-card">
        <h3>Enter Marks</h3>
        <div className="table-container">
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
              {subjects.map((subject) => {
                const mark = marks[subject.code] || '';
                const gradePoint = getGradePoint(mark);
                return (
                  <tr key={subject.code}>
                    <td>{subject.code}</td>
                    <td>{subject.title}</td>
                    <td>{subject.credits}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={mark}
                        placeholder="Enter marks"
                        onChange={(e) => handleMarkChange(subject.code, e.target.value)}
                      />
                    </td>
                    <td>{mark !== '' ? gradePoint : '--'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sgpa-result">
        <strong>SGPA:</strong> {sgpa} &nbsp; (Total Credits: {totalCredits})
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        ⬇️ Download / Print Result
      </button>
       
    </div>
     {/* Comments */}
            <CommentSection />
        </>
  );
}
