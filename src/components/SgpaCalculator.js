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
      .catch(() => alert('❌ Could not load VTU syllabus data.'))
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
    if (!isNaN(num) && num >= 0 && num <= 100)
      setMarks(prev => ({ ...prev, [code]: num }));
    else setMarks(prev => ({ ...prev, [code]: '' }));
  };

  const getGradePoint = mark => {
    if (mark >= 90) return 10;
    if (mark >= 80) return 9;
    if (mark >= 70) return 8;
    if (mark >= 60) return 7;
    if (mark >= 50) return 6;
    if (mark >= 45) return 5;
    return 0;
  };

  const getRemark = sgpa => {
    if (sgpa >= 9) return 'Excellent Performance 👏';
    if (sgpa >= 8) return 'Very Good Performance 👍';
    if (sgpa >= 7) return 'Good Performance 🙂';
    if (sgpa >= 6) return 'Satisfactory, Keep Improving 💪';
    return 'Needs Improvement ⚠️';
  };

  const handleNameChange = val => setStudentName(val.toUpperCase());
  const handleUSNChange = val =>
    setStudentUSN(val.toUpperCase().replace(/[^A-Z0-9]/g, ''));

  if (loading) return <div className="sgpa-container">🔄 Loading syllabus data…</div>;
  if (!syllabusData) return <div className="sgpa-container">❌ Error loading data.</div>;

  const branches = Object.keys(syllabusData);
  const semesters = Object.keys(syllabusData[branch] || {});
  const subjects = syllabusData[branch][semester] || [];

  const totalCredits = subjects.reduce((sum, s) => sum + Number(s.credits), 0);
  const totalPoints = subjects.reduce(
    (sum, s) => sum + getGradePoint(marks[s.code]) * s.credits,
    0
  );
  const weightedSum = subjects.reduce(
    (sum, s) => sum + getGradePoint(marks[s.code]) * Number(s.credits),
    0
  );
  const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
  const totalMarks = subjects.reduce((sum, s) => sum + (marks[s.code] || 0), 0);

  // ---------------- PDF GENERATION ----------------
  const downloadPDF = async () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // HEADER
    doc.setFillColor(25, 42, 90);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.addImage(logo, 'PNG', 12, 4, 17, 17);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Visvesvaraya Technological University (VTU)', pageWidth / 2 + 5, 14, { align: 'center' });
    doc.setFontSize(11);
    doc.text('Semester Grade Point Average (SGPA) Report – 2022 Scheme', pageWidth / 2 + 5, 20, { align: 'center' });

    // WATERMARK
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.05 }));
    doc.setFontSize(60);
    doc.setTextColor(60, 60, 60);
    doc.text('VTU NOTES FOR ALL', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
    doc.restoreGraphicsState();

    // STUDENT INFO
    doc.setFillColor(245, 247, 255);
    doc.roundedRect(14, 32, pageWidth - 28, 38, 3, 3, 'F');
    doc.setTextColor(0);
    doc.setFontSize(12);
    const date = new Date().toLocaleDateString('en-GB');
    const info = [
      `Name: ${studentName || '---'}`,
      `USN: ${studentUSN || '---'}`,
      `Branch: ${branch.replace(/_/g, ' ')}`,
      `Semester: ${semester}`,
      `Generated on: ${date}`,
    ];
    info.forEach((t, i) => doc.text(t, 20, 42 + i * 6));

    // SGPA CARD
    doc.setFillColor(25, 42, 90);
    doc.roundedRect(14, 78, pageWidth - 28, 40, 3, 3, 'F');
    doc.setTextColor(255);
    doc.setFontSize(16);
    doc.text('Your SGPA', pageWidth / 2, 90, { align: 'center' });
    doc.setFontSize(30);
    doc.text(`${sgpa}`, pageWidth / 2, 108, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`(${getRemark(sgpa)})`, pageWidth / 2, 118, { align: 'center' });

    // FORMULA SECTION
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(
      `Formula: SGPA = (Σ (Grade × Credits)) / (Total Credits)\n= (${totalPoints.toFixed(2)}) ÷ (${totalCredits.toFixed(
        2
      )}) = ${sgpa}`,
      pageWidth / 2,
      130,
      { align: 'center' }
    );

    // TABLE
    const tableBody = subjects.map(sub => {
      const mark = marks[sub.code] || 0;
      const grade = getGradePoint(mark);
      const points = grade * sub.credits;
      return [sub.code, sub.title, mark, grade, sub.credits, points.toFixed(2)];
    });
    tableBody.push(['', 'Total', totalMarks.toFixed(2), '', totalCredits.toFixed(2), totalPoints.toFixed(2)]);

    autoTable(doc, {
      startY: 145,
      head: [['Code', 'Subject Title', 'Marks', 'Grade', 'Credits', 'Points']],
      body: tableBody,
      theme: 'striped',
      styles: { fontSize: 9, cellPadding: 3, valign: 'middle' },
      headStyles: { fillColor: [25, 42, 90], textColor: 255, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 75, halign: 'left' },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 },
      },
      didDrawPage: () => {
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text('Generated via vtunotesforall.in – Smart VTU Tools', pageWidth / 2, pageHeight - 10, { align: 'center' });
      },
    });

    // QR CODE
    const qrURL = 'https://vtunotesforall.in';
    const qrDataURL = await QRCode.toDataURL(qrURL);
    const finalY = doc.lastAutoTable.finalY + 20;
    if (finalY + 45 > pageHeight - 10) doc.addPage();
    doc.addImage(qrDataURL, 'PNG', pageWidth / 2 - 17, finalY, 35, 35);
    doc.setFontSize(10);
    doc.text('Scan QR for more VTU resources', pageWidth / 2, finalY + 43, { align: 'center' });

    doc.save(`VTU_SGPA_Report_${studentUSN || branch}_${semester}.pdf`);
  };

  // ---------------- UI ----------------
  return (
    <div className="sgpa-container">
      <h1 className="main-title">📊 VTU SGPA Calculator (2022 Scheme)</h1>

      <div className="main-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="form-section">
            <h3>Select Your Details</h3>
            <label>Branch</label>
            <select value={branch} onChange={e => setBranch(e.target.value)}>
              {branches.map(b => (
                <option key={b} value={b}>
                  {b.replace(/_/g, ' ')}
                </option>
              ))}
            </select>

            <label>Semester</label>
            <select
              value={semester}
              onChange={e => {
                setSemester(e.target.value);
                setMarks({});
              }}
            >
              {semesters.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <h3>Student Details</h3>
            <input
              type="text"
              placeholder="Enter Name"
              value={studentName}
              onChange={e => handleNameChange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter USN"
              value={studentUSN}
              onChange={e => handleUSNChange(e.target.value)}
            />
          </div>

          <div className="sgpa-result-card">
            <h2>Your SGPA: {sgpa}</h2>
            <p>Total Credits: {totalCredits}</p>
            <button className="download-btn" onClick={downloadPDF}>
              ⬇ Download SGPA Report
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
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
                {subjects.map(s => {
                  const mark = marks[s.code] || '';
                  const grade = getGradePoint(mark);
                  return (
                    <tr key={s.code}>
                      <td>{s.code}</td>
                      <td>{s.title}</td>
                      <td>{s.credits}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Marks"
                          value={mark}
                          onChange={e => handleMarkChange(s.code, e.target.value)}
                        />
                      </td>
                      <td>{mark !== '' ? grade : '--'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
