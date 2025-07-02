// src/components/Subjects.js
import React, {  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AdSenseAd from './AdSenseAd'; 
 // Import the local JSON file
import './Subjects.css';


const Subjects = () => {
  const { branch, semester } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  

  const subjectsData = {
    'first-year': {
      1: [
        { name: 'Mathematics For CSE', code: 'BMATS101', credits: 4, info: 'First Semester Mathematics for CSE Module 1 to 5 Notes,  Model Question papers,Question Bank, Lab Manual' },
        { name: 'Applied Physics For CSE', code: 'BPHYS102/202', credits: 3, info: 'First Semester Physics Module 1 to 5 Notes, Solved Model Question papers, Lab Manual' },
        { name: 'Principle of Programming Using C', code: 'BPOP103/203', credits: 4, info: 'First Semester Principles of Programming Using C for CSE Module 1 to 5 Notes, Solved Model Question papers, Lab Manual.' },
        { name: 'Communicative English', code: 'BENGK106', credits: 2, info: 'First Semester Communicative English Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Indian Constitution', code: 'BICOK107', credits: 2, info: 'First Semester Indian Constitution Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Scientific Foundation Of Health', code: 'BSFHK158', credits: 2, info: 'First Semester Scientific Foundation Of Health Module 1 to 5 MCQ, Solved Model Question papers' },
        { name: 'Introduction to Civil Engineering', code: 'BESCK104A', credits: 3, info: 'First Semester Introduction to Civil Engineering Module 1 to 5 Notes, Solved Model Question papers.' },
      ],
      2: [
        { name: 'Mathematics For CSE', code: 'BMATS201', credits: 4, info: 'Second Semester Mathematics Module 1 to 5 Notes, Solved Model Question papers' },
        { name: 'Applied Chemistry For CSE', code: 'BCHES102/202', credits: 3, info: 'Second Semester Applied Chemistry For CSE Module 1 to 5 Notes, Solved Model Question papers' },
        { name: 'Introduction to Python Programming', code: 'BPLCK105/205B', credits: 4, info: 'Second Semester Introduction to Programming Language Module 1 to 5 Notes, Solved Model Question papers' },
        { name: 'Computer Aided Engineering Drawing', code: 'BCEDK203', credits: 3, info: 'Second Semester Computer Aided Engineering Drawing Module 1 to 5 Notes, Solved Model Question papers' },
        { name: 'Professional Writing Skills in English', code: 'BPWSK206', credits: 2, info: 'Second Semester Professional Writing Skills in English Module 1 to 5 Notes, Solved Model Question papers' },
        { name: 'Samskrutika Kannada', code: 'BKSKK207', credits: 2, info: 'Second Semester Samskrutika Kannada Module 1 to 5 Notes, Solved Model Question papers.' },
        { name: 'Innovation and Design Thinking', code: 'BIDTK258', credits: 3, info: 'Second Semester Innovation and Design Thinking Module 1 to 5 Notes, Solved Model Question papers.' },
       
        { name: 'Introduction to Electrical Engineering', code: 'BESCK104/204B', credits: 3, info: 'Second Semester Introduction to Electrical Engineering Module 1 to 5 Notes, Solved Model Question papers.' },
      ],
    },
    cse: {
      3: [
        { name: 'Mathematics For CSE', code: 'BMATS301', credits: 4, info: 'Thirld Semester Mathematics For CSE Module 1 to 5 Notes, Solved Model Question papers.' },
        { name: 'Digital Design  and Computer Organization', code: 'BCS302', credits: 4, info: 'Thirld Semester Mathematics For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
  
        { name: 'OPERATING SYSTEMS  ', code: 'BCS303', credits: 4, info: 'Thirld Semester OPERATING SYSTEMS  For CSE Module 1 to 5 Notes, Solved Model Question papers.' },
        { name: 'DATA STRUCTURES AND APPLICATIONS ', code: 'BCS304', credits: 3, info: 'Thirld Semester DATA STRUCTURES AND APPLICATIONSFor CSE Module 1 to 5 Notes, Solved Model Question papers. ' },
        { name: 'Object Oriented Programming with JAVA ', code: 'BCS306A', credits: 3, info: 'Thirld Semester Object Oriented Programming with JAVA  For CSE Module 1 to 5 Notes, Solved Model Question papers.   ' },
        { name: 'OBJECT ORIENTED PROGRAMMING with C++', code: 'BCS306B', credits: 3, info: '  Thirld Semester OBJECT ORIENTED PROGRAMMING with C++ For CSE Module 1 to 5 Notes, Solved Model Question papers.' },
        { name: 'DATA STRUCTURES LABORATORY', code: 'BCSL305', credits: 1, info: 'Thirld Semester DATA STRUCTURES LABORATORY For CSE Module 1 to 5 Notes, Solved Model Question papers.  ' },
        { name: 'Social Connect & Responsibility ', code: 'BSCK307', credits: 1, info: 'Thirld Semester Social Connect & Responsibility For CSE Module 1 to 5 Notes, Solved Model Question papers..' },

      ],

      4: [
        { name: 'Analysis & Design of Algorithms ', code: 'BCS401', credits: 3, info: 'Fourth Semester Analysis & Design of Algorithms For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'MICROCONTROLLERS', code: 'BCS402', credits: 3, info: 'Fourth Semester MICROCONTROLLERS For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
  
        { name: 'DATABASE MANAGEMENT SYSTEM   ', code: 'BCS403', credits: 4, info: 'Fourth Semester DATABASE MANAGEMENT SYSTEM For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
        { name: 'DISCRETE MATHEMATICAL STRUCTURES  ', code: 'BCS405A', credits: 3, info: 'Fourth Semester DISCRETE MATHEMATICAL STRUCTURES For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'GRAPH THEORY   ', code: 'BCS405B', credits: 3, info: ' Fourth Semester GRAPH THEORY  For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'Analysis & Design of Algorithms Lab ', code: 'BCSL404', credits: 1, info: ' Fourth Semester Analysis & Design of Algorithms Lab  For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
        { name: 'ARTIFICIAL INTELLIGENCE  ', code: 'BAD402', credits: 4, info: 'Fourth Semester ARTIFICIAL INTELLIGENCE  For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'BIOLOLY FOR ENGINEERS  ', code: 'BCS405C', credits: 2, info: 'Fourth Semester OPTIMIZATION TECHNIQUE  For CSE Module 1 to 5 Notes, Solved Model Question papers..' },

      ],
      5: [
        { name: 'Software Engineering & Project Management ', code: 'BCS501', credits: 4, info: 'Fifth Semester Software Engineering & Project Management For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'COMPUTER NETWORKS ', code: 'BCS502', credits: 4, info: 'Fifth Semester COMPUTER NETWORKS For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
  
        { name: 'THEORY OF COMPUTATION ', code: 'BCS503', credits: 4, info: 'Fifth Semester THEORY OF COMPUTATION For CSE Module 1 to 5 Notes, Solved Model Question papers..' },
        { name: 'ARTIFICIAL INTELLIGENCE', code: 'BCS525B', credits: 3, info: 'Fourth SemesterARTIFICIAL INTELLIGENCE For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
       
        { name: 'RESEARCH AND METHO AND IPR', code: 'BRMK557', credits: 3, info: 'Fourth SemesterARTIFICIAL INTELLIGENCE For CSE Module 1 to 5 Notes, Solved Model Question papers.. ' },
        { name: 'Environmental Studies', code: 'BESK508', credits: 1, info: 'All module notes with Mcq and model question paper solutions are available. ' },

        { name: 'Unix System Programming', code: 'BCS515C', credits: 3, info: 'unix system programming all modules are available ' },
        
        
      ],
      6: [
        { name:'MACHINE LEARNING', code: 'BCS602', credits: 4, info: '' },
        { name:'CLOUD COMPUTING AND SECURITY FOR BOTH BCS601 AND BIS613D', code: 'BCS601,BIS613D', credits: 4, info: '' },
        { name: 'Blockchain Technology', code: 'BCS613A', credits: 3, info: '' },
        { name: 'Natural Language Processing', code: 'BAI601', credits: 4, info: ' .' },
        { name: 'Machine Learning -I', code: 'BAI602 ', credits: 4, info: ' ' },
        { name: 'Microcontrollers & Embedded Systems', code: 'BCO601', credits: 4, info: '  ' },
        { name: 'Cryptography & Network Security', code: 'BCO601', credits: 4, info: ' ' },
        { name: 'Integrated Waste Management for Smart City', code: 'BCV654C', credits: 3, info: ' .' },
        
        
      ],
    },
    ece: {
      3: [
       

      ],
      5:[
     

      ],

      6:[
        
        { name: 'VLSI', code: 'BEC602', credits: 4, info: ' Preparation: To prepare students with fundamental knowledge/ overview in the field of Digital Signal Processing ' },
        
        
        

      ],
    },

  };

  // Function to handle subject click and navigate to ModuleDetail
  const handleSubjectClick = (subject) => {
    navigate(`/branch/${branch}/${semester}/modules/${subject.name}`);
  };

  // Retrieve subjects based on selected branch and semester
  const subjects = subjectsData[branch.toLowerCase()]?.[parseInt(semester)] || [];

  return (
    <div>
        {/* Headline Message Section */}
        

    
    <div className="subjects" style={{ marginTop: '80px' }}>
      <h2>{branch.toUpperCase()} - Semester {semester}</h2>
      <h3>Subjects:</h3>
      <ul>
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <li key={`${branch}-${semester}-${subject.name}`} className="subject-item">
              <div
                className="subject-box"
                onClick={() => handleSubjectClick(subject)}
                role="button"
                tabIndex={0} // Make it keyboard accessible
                onKeyPress={(e) => e.key === 'Enter' && handleSubjectClick(subject)} // Handle Enter key
              >
                <div className="subject-info">
                  <h4>{subject.name}</h4>
                  <span className="subject-code">{subject.code}</span>
                </div>
                <div className="credits-box">Credits: {subject.credits}</div>
                <div className="subject-details">{subject.info}</div>
                
                
              </div>
              <div className="ad-container">
                                <AdSenseAd
                                    adClient="ca-pub-9499544849301534"
                                    adSlot="7579321744"
                                    adFormat="auto"
                                    fullWidthResponsive={true}
                                />
                            </div>
             
             
            </li>
            
          ))
        ) : (
          <li>No subjects available for this branch and semester.</li>
        )}
      </ul>
      </div>
       
    
    </div>
    
  );
  }


export default Subjects;
