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
            <div className="calculator-section py-6 px-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">SGPA Calculator</h2>
                {!selectedCycleOrSem ? (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Select Cycle or Semester</h3>
                        {['Physics Cycle', 'Chemistry Cycle', '1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'].map((item) => (
                            <button key={item} className="button mb-2 mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleCycleOrSemSelect(item)}>
                                {item}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div>
                        <h4 className="text-lg mb-4">Selected: {selectedCycleOrSem}</h4>
                        {subjects.map((subject, index) => (
                            <div key={index} className="input-group mb-4">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={subject.subject}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    name="credits"
                                    placeholder="Credits"
                                    value={subject.credits}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    name="marks"
                                    placeholder="Marks (out of 100)"
                                    value={subject.marks}
                                    onChange={(e) => handleSubjectInputChange(index, e)}
                                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                                />
                            </div>
                        ))}
                        <button className="button mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={addSubject}>Add Subject</button>
                        <button className="button mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={calculateSgpa}>Calculate SGPA</button>
                        {sgpa !== null && <h3 className="text-xl font-semibold">SGPA: {sgpa}</h3>}
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
            <div className="calculator-section py-6 px-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">CGPA Calculator</h2>
                {semesters.map((semester, index) => (
                    <div key={index} className="input-group mb-4">
                        <input
                            type="text"
                            name="semester"
                            placeholder="Semester"
                            value={semester.semester}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="credits"
                            placeholder="Credits"
                            value={semester.credits}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            name="sgpa"
                            placeholder="SGPA (0 to 10)"
                            value={semester.sgpa}
                            onChange={(e) => handleSemesterInputChange(index, e)}
                            className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                        />
                    </div>
                ))}
                <button className="button mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={addSemester}>Add Semester</button>
                <button className="button mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={calculateCgpa}>Calculate CGPA</button>
                {cgpa !== null && <h3 className="text-xl font-semibold">CGPA: {cgpa}</h3>}
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
            <div className="calculator-section py-6 px-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Percentage Calculator</h2>
                <input
                    type="number"
                    placeholder="Total Marks"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    placeholder="Obtained Marks"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(e.target.value)}
                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <button className="button mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={calculatePercentage}>Calculate Percentage</button>
                {percentage !== null && <h3 className="text-xl font-semibold">Percentage: {percentage}%</h3>}
            </div>
        );
    };

    const GpaToPercentageCalculator = () => {
        const [gpa, setGpa] = useState('');
        const [percentage, setPercentage] = useState(null);

        const calculatePercentage = () => {
            const gpaValue = parseFloat(gpa);

            if (!isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 10) {
                const percentageValue = ((gpaValue - 0.5) * 10).toFixed(2);
                setPercentage(percentageValue);
            } else {
                setPercentage('Invalid GPA');
            }
        };

        return (
            <div className="calculator-section py-6 px-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">GPA to Percentage Calculator</h2>
                <input
                    type="number"
                    placeholder="Enter GPA (0-10)"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="input-field p-2 w-full mb-2 border border-gray-300 rounded"
                />
                <button className="button mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={calculatePercentage}>Calculate Percentage</button>
                {percentage !== null && <h3 className="text-xl font-semibold">Percentage: {percentage}%</h3>}
            </div>
        );
    };

    return (
        <div className="calculator-container py-6 px-4 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">VTU CGPA Calculators</h1>
            <div className="calculator-select mb-6 text-center">
                <button className="button mb-2 mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleCalculatorSelect('sgpa')}>SGPA Calculator</button>
                <button className="button mb-2 mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleCalculatorSelect('cgpa')}>CGPA Calculator</button>
                <button className="button mb-2 mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleCalculatorSelect('percentage')}>Percentage Calculator</button>
                <button className="button mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleCalculatorSelect('gpaPercentage')}>GPA to Percentage</button>
            </div>

            {selectedCalculator === 'sgpa' && <SGPACalculator />}
            {selectedCalculator === 'cgpa' && <CGPACalculator />}
            {selectedCalculator === 'percentage' && <PercentageCalculator />}
            {selectedCalculator === 'gpaPercentage' && <GpaToPercentageCalculator />}
        </div>
    );
};

export default Calculator;
