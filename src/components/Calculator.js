import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Calculator.css";

const Calculator = () => {
  const [selectedCalculator, setSelectedCalculator] = useState("");

  const handleCalculatorSelect = (type) => {
    setSelectedCalculator(type);
  };

  /** ------------------------- SGPA Calculator ------------------------- **/
  const SGPACalculator = () => {
    const [selectedCycleOrSem, setSelectedCycleOrSem] = useState("");
    const [subjects, setSubjects] = useState([{ subject: "", credits: "", marks: "" }]);
    const [sgpa, setSgpa] = useState(null);
    const [error, setError] = useState("");

    const handleCycleOrSemSelect = (option) => {
      setSelectedCycleOrSem(option);
    };

    const handleSubjectInputChange = (index, event) => {
      const { name, value } = event.target;
      const updatedSubjects = [...subjects];
      updatedSubjects[index][name] = value;
      setSubjects(updatedSubjects);
    };

    const addSubject = () => {
      setSubjects([...subjects, { subject: "", credits: "", marks: "" }]);
    };

    const convertMarksToGrade = (marks) => {
      if (marks >= 90) return 10;
      if (marks >= 80) return 9;
      if (marks >= 70) return 8;
      if (marks >= 60) return 7;
      if (marks >= 50) return 6;
      if (marks >= 40) return 5;
      return 0;
    };

    const calculateSgpa = () => {
      let totalCredits = 0;
      let totalPoints = 0;
      setError("");

      subjects.forEach((sub) => {
        const credits = parseFloat(sub.credits);
        const marks = parseFloat(sub.marks);

        if (isNaN(credits) || isNaN(marks)) {
          setError("Please fill in all fields correctly.");
          return;
        }

        const grade = convertMarksToGrade(marks);
        totalCredits += credits;
        totalPoints += credits * grade;
      });

      if (totalCredits === 0) {
        setError("Enter valid subjects with credits!");
        return;
      }

      const sgpaValue = (totalPoints / totalCredits).toFixed(2);
      setSgpa(sgpaValue);
    };

    return (
      <motion.div
        className="calculator-section py-6 px-4 bg-white shadow-2xl rounded-2xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          SGPA Calculator
        </h2>

        {!selectedCycleOrSem ? (
          <div className="text-center">
            <h3 className="text-lg mb-3 font-semibold text-gray-700">
              Select Cycle or Semester
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Physics Cycle",
                "Chemistry Cycle",
                "1st Sem",
                "2nd Sem",
                "3rd Sem",
                "4th Sem",
                "5th Sem",
                "6th Sem",
                "7th Sem",
                "8th Sem",
              ].map((item) => (
                <button
                  key={item}
                  className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:scale-105 transition-transform"
                  onClick={() => handleCycleOrSemSelect(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-700">
              Selected: {selectedCycleOrSem}
            </h4>
            {subjects.map((subject, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-2 mb-3">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={subject.subject}
                  onChange={(e) => handleSubjectInputChange(index, e)}
                  className="input-field p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="credits"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) => handleSubjectInputChange(index, e)}
                  className="input-field p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="marks"
                  placeholder="Marks (out of 100)"
                  value={subject.marks}
                  onChange={(e) => handleSubjectInputChange(index, e)}
                  className="input-field p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={addSubject}
              >
                + Add Subject
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={calculateSgpa}
              >
                Calculate SGPA
              </button>
            </div>
            {error && <p className="text-red-500 mt-3">{error}</p>}
            {sgpa !== null && (
              <h3 className="text-2xl font-semibold mt-4 text-center text-green-600">
                SGPA: {sgpa}
              </h3>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  /** ------------------------- CGPA Calculator ------------------------- **/
  const CGPACalculator = () => {
    const [semesters, setSemesters] = useState([{ semester: "", credits: "", sgpa: "" }]);
    const [cgpa, setCgpa] = useState(null);

    const handleSemesterInputChange = (index, event) => {
      const { name, value } = event.target;
      const updatedSemesters = [...semesters];
      updatedSemesters[index][name] = value;
      setSemesters(updatedSemesters);
    };

    const addSemester = () => {
      setSemesters([...semesters, { semester: "", credits: "", sgpa: "" }]);
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
      <motion.div
        className="calculator-section py-6 px-4 bg-white shadow-2xl rounded-2xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          CGPA Calculator
        </h2>
        {semesters.map((semester, index) => (
          <div key={index} className="grid md:grid-cols-3 gap-2 mb-3">
            <input
              type="text"
              name="semester"
              placeholder="Semester"
              value={semester.semester}
              onChange={(e) => handleSemesterInputChange(index, e)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={semester.credits}
              onChange={(e) => handleSemesterInputChange(index, e)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="sgpa"
              placeholder="SGPA (0–10)"
              value={semester.sgpa}
              onChange={(e) => handleSemesterInputChange(index, e)}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={addSemester}
          >
            + Add Semester
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={calculateCgpa}
          >
            Calculate CGPA
          </button>
        </div>
        {cgpa !== null && (
          <h3 className="text-2xl font-semibold mt-4 text-center text-green-600">
            CGPA: {cgpa}
          </h3>
        )}
      </motion.div>
    );
  };

  /** ------------------------- GPA to Percentage ------------------------- **/
  const GpaToPercentageCalculator = () => {
    const [gpa, setGpa] = useState("");
    const [percentage, setPercentage] = useState(null);

    const calculatePercentage = () => {
      const gpaValue = parseFloat(gpa);
      if (!isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 10) {
        const percentageValue = ((gpaValue - 0.5) * 10).toFixed(2);
        setPercentage(percentageValue);
      } else {
        setPercentage("Invalid GPA");
      }
    };

    return (
      <motion.div
        className="calculator-section py-6 px-4 bg-white shadow-2xl rounded-2xl max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          GPA to Percentage
        </h2>
        <input
          type="number"
          placeholder="Enter GPA (0-10)"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-3 focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={calculatePercentage}
        >
          Calculate Percentage
        </button>
        {percentage !== null && (
          <h3 className="text-2xl font-semibold mt-4 text-center text-green-600">
            Percentage: {percentage}%
          </h3>
        )}
      </motion.div>
    );
  };

  /** ------------------------- Calculator Container ------------------------- **/
  return (
    <div className="calculator-container py-10 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        VTU CGPA Calculators
      </h1>

      <div className="calculator-select mb-8 text-center flex flex-wrap justify-center gap-3">
        {[
          { id: "sgpa", label: "SGPA Calculator" },
          { id: "cgpa", label: "CGPA Calculator" },
          { id: "gpaPercentage", label: "GPA → %" },
        ].map((btn) => (
          <button
            key={btn.id}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCalculator === btn.id
                ? "bg-indigo-600 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-transform hover:scale-105`}
            onClick={() => handleCalculatorSelect(btn.id)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedCalculator === "sgpa" && <SGPACalculator />}
        {selectedCalculator === "cgpa" && <CGPACalculator />}
        {selectedCalculator === "gpaPercentage" && <GpaToPercentageCalculator />}
      </AnimatePresence>
    </div>
  );
};

export default Calculator;
