// src/components/Calculator.js

import React, { useState } from 'react';
import './Calculator.css'; // Import the CSS file

const Calculator = () => {
    const [selectedCalculator, setSelectedCalculator] = useState('');

    const handleCalculatorSelect = (type) => {
        setSelectedCalculator(type);
    };

    const SGPACalculator = () => {
        const [selectedCycleOrSem, setSelectedCycleOrSem] = useState('');
        const [subjects, setSubjects] = useState([{ subject: '', credits: '', marks: '' }]);
        const [sgpa, setSgpa] = useState(null);

        const handleCycleOrSemSelect = (option) => {
            setSelectedCycleOrSem(option);
        };

        const handleSubjectInputChange = (index, event) => {
            const { name, value } = event.target;
            const newSubjects = [...subjects];
            newSubjects[index][name] = value;
            setSubjects(newSubjects);
        };

        const addSubject = () => {
            setSubjects([...subjects, { subject: '', credits: '', marks: '' }]);
        };

        const convertMarksToGrade = (marks) => {
            if (marks >= 90) return 10;
            if (marks >= 80) return 9;
            if (marks >= 70) return 8;
            if (marks >= 60) return 7;
            if (marks >= 50) return 6;
            if (marks >= 40) return 5;
            return 0; // Fail grade
        };

        const calculateSgpa = () => {
            let totalCredits = 0;
            let totalPoints = 0;

            subjects.forEach((sub) => {
                const credits = parseFloat(sub.credits);
                const marks = parseFloat(sub.marks);
                const grade = convertMarksToGrade(marks);

                if (credits > 0 && !isNaN(grade)) {
                    totalCredits += credits;
                    totalPoints += credits * grade;
                }
            });

            const sgpaValue = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
            setSgpa(sgpaValue);
        };

        return (
            <div className="calculator-section">
                <h2>SGPA Calculator</h2>
                {!selectedCycleOrSem ? (
                    <div>
                        <h3>Select Cycle or Semester</h3>
                        {['Physics Cycle', 'Chemistry Cycle', '1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'].map((item) => (
                            <button key={item} className="button" onClick={() => handleCycleOrSemSelect(item)}>
                                {item}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h4>Selected: {selectedCycleOrSem}</h4>
                        {subjects.map((subject, index) => (
                            <div key={index} className="input-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={subject.subject}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field"
                                />
                                <input
                                    type="number"
                                    name="credits"
                                    placeholder="Credits"
                                    value={subject.credits}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field"
                                />
                                <input
                                    type="number"
                                    name="marks"
                                    placeholder="Marks (out of 100)"
                                    value={subject.marks}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field"
                                />
                            </div>
                        ))}
                        <button className="button" onClick={addSubject}>Add Subject</button>
                        <button className="button" onClick={calculateSgpa}>Calculate SGPA</button>
                        {sgpa !== null && <h3>SGPA: {sgpa}</h3>}
                    </div>
                )}
            </div>
        );
    };

    const CGPACalculator = () => {
        const [semesters, setSemesters] = useState([{ semester: '', credits: '', sgpa: '' }]);
        const [cgpa, setCgpa] = useState(null);

        const handleSemesterInputChange = (index, event) => {
            const { name, value } = event.target;
            const newSemesters = [...semesters];
            newSemesters[index][name] = value;
            setSemesters(newSemesters);
        };

        const addSemester = () => {
            setSemesters([...semesters, { semester: '', credits: '', sgpa: '' }]);
        };

        const calculateCgpa = () => {
            let totalCredits = 0;
            let totalPoints = 0;

            semesters.forEach((sem) => {
                const credits = parseFloat(sem.credits);
                const sgpa = parseFloat(sem.sgpa);

                if (credits > 0 && !isNaN(sgpa)) {
                    totalCredits += credits;
                    totalPoints += credits * sgpa;
                }
            });

            const cgpaValue = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
            setCgpa(cgpaValue);
        };

        return (
            <div className="calculator-section">
                <h2>CGPA Calculator</h2>
                {semesters.map((semester, index) => (
                    <div key={index} className="input-group">
                        <input
                            type="text"
                            name="semester"
                            placeholder="Semester"
                            value={semester.semester}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field"
                        />
                        <input
                            type="number"
                            name="credits"
                            placeholder="Credits"
                            value={semester.credits}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field"
                        />
                        <input
                            type="number"
                            name="sgpa"
                            placeholder="SGPA (0 to 10)"
                            value={semester.sgpa}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field"
                        />
                    </div>
                ))}
                <button className="button" onClick={addSemester}>Add Semester</button>
                <button className="button" onClick={calculateCgpa}>Calculate CGPA</button>
                {cgpa !== null && <h3>CGPA: {cgpa}</h3>}
            </div>
        );
    };

    const PercentageCalculator = () => {
        const [totalMarks, setTotalMarks] = useState('');
        const [obtainedMarks, setObtainedMarks] = useState('');
        const [percentage, setPercentage] = useState(null);

        const calculatePercentage = () => {
            const total = parseFloat(totalMarks);
            const obtained = parseFloat(obtainedMarks);

            if (total > 0) {
                const percentageValue = ((obtained / total) * 100).toFixed(2);
                setPercentage(percentageValue);
            }
        };

        return (
            <div className="calculator-section">
                <h2>Percentage Calculator</h2>
                <input
                    type="number"
                    placeholder="Total Marks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Obtained Marks"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    className="input-field"
                />
                <button className="button" onClick={calculatePercentage}>Calculate Percentage</button>
                {percentage !== null && <h3>Percentage: {percentage}%</h3>}
            </div>
        );
    };

    return (
        <div className="calculator-container">
            <h1>VTU CGPA Calculators</h1>
            <div className="calculator-select">
                <button className="button" onClick={() => handleCalculatorSelect('sgpa')}>SGPA Calculator</button>
                <button className="button" onClick={() => handleCalculatorSelect('cgpa')}>CGPA Calculator</button>
                <button className="button" onClick={() => handleCalculatorSelect('percentage')}>Percentage Calculator</button>
            </div>

            {selectedCalculator === 'sgpa' && <SGPACalculator />}
            {selectedCalculator === 'cgpa' && <CGPACalculator />}
            {selectedCalculator === 'percentage' && <PercentageCalculator />}
        </div>
    );
};

export default Calculator;
