import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaBrain, FaLeaf, FaPlay, FaCheckCircle, FaTimesCircle, FaTrophy, FaArrowLeft, FaRedo } from 'react-icons/fa';
import './TestPage.css';

// --- DATA ---
const TEST_CATEGORIES = [
    { id: 'Coding Test', name: 'Coding Challenge', icon: <FaCode />, color: '#00F0FF' },
    { id: 'Aptitude Test', name: 'Aptitude Arena', icon: <FaBrain />, color: '#7000FF' },
    { id: 'EVS MCQ', name: 'EVS Knowledge', icon: <FaLeaf />, color: '#00FF9D' }
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'];

// Questions Data
const QUESTIONS_DB = {
    'Coding Test': {
        Easy: [
            { question: 'Which variable declaration is block-scoped?', options: ['var', 'let', 'Both', 'None'], correctAnswer: 'let' },
            { question: 'What is 2 + "2" in JS?', options: ['4', '"22"', 'NaN', 'Error'], correctAnswer: '"22"' },
            { question: 'Which method adds elements to end of array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctAnswer: 'push()' },
            { question: 'Is JS single-threaded?', options: ['Yes', 'No', 'Sometimes', 'Depends on OS'], correctAnswer: 'Yes' },
            { question: 'Correct way to write "Hello World"?', options: ['echo "Hello"', 'print("Hello")', 'console.log("Hello")', 'System.out.println("Hello")'], correctAnswer: 'console.log("Hello")' }
        ],
        Medium: [
            { question: 'What is the time complexity of QuickSort average case?', options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'], correctAnswer: 'O(n log n)' },
            { question: 'Which hook replaces componentDidMount?', options: ['useEffect', 'useState', 'useMemo', 'useRef'], correctAnswer: 'useEffect' },
            { question: 'What does === check?', options: ['Values only', 'Types only', 'Values and Types', 'References'], correctAnswer: 'Values and Types' },
             { question: 'Closure is created when...', options: ['Function is defined', 'Function is called', 'Variable is declared', 'Never'], correctAnswer: 'Function is defined' },
             { question: 'Which is NOT a valid JS data type?', options: ['Symbol', 'BigInt', 'Float', 'Undefined'], correctAnswer: 'Float' }

        ],
        Hard: [
            { question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 'Stack' },
            { question: 'Event loop manages execution of...', options: ['Microtasks', 'Macrotasks', 'Both', 'None'], correctAnswer: 'Both' },
            { question: 'What is pure function?', options: ['No side effects', 'Uses global vars', 'Modifies DOM', 'Random return'], correctAnswer: 'No side effects' },
             { question: 'Time complexity of inserting into Hash Map?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(1)' },
             { question: 'What is "hoisting"?', options: ['Functions move to top', 'Vars move to bottom', 'Classes are ignored', 'None'], correctAnswer: 'Functions move to top' }
        ]
    },
    'Aptitude Test': {
        Easy: [
            { question: 'Next number: 2, 4, 8, 16...?', options: ['20', '24', '30', '32'], correctAnswer: '32' },
            { question: 'Sum of angles in a triangle?', options: ['180', '360', '90', '270'], correctAnswer: '180' },
            { question: 'If 5x = 25, x = ?', options: ['2', '5', '10', '1'], correctAnswer: '5' },
             { question: 'Odd one out: 3, 5, 7, 9', options: ['3', '5', '7', '9'], correctAnswer: '9' },
             { question: '20% of 500?', options: ['50', '100', '150', '200'], correctAnswer: '100' }
        ],
        Medium: [
            { question: 'Train speed 60km/h, time 3h. Distance?', options: ['180km', '120km', '200km', '60km'], correctAnswer: '180km' },
            { question: 'Average of first 5 multiples of 5?', options: ['10', '15', '20', '25'], correctAnswer: '15' },
            { question: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. Relation of A to D?', options: ['Granddaughter', 'Daughter', 'Aunt', 'Niece'], correctAnswer: 'Granddaughter' },
             { question: 'Cost price 100, Selling 120. Profit %?', options: ['10%', '20%', '15%', '25%'], correctAnswer: '20%' },
             { question: 'Sides of rectangle 10 and 20. Area?', options: ['200', '100', '30', '60'], correctAnswer: '200' }
        ],
        Hard: [
            { question: 'Probability of getting sum 7 with two dice?', options: ['1/6', '1/12', '1/36', '5/36'], correctAnswer: '1/6' },
            { question: 'Clock hands angle at 3:30?', options: ['75', '90', '105', '60'], correctAnswer: '75' },
             { question: 'Speed of boat 15km/h, stream 3km/h. Downstream speed?', options: ['12', '18', '15', '10'], correctAnswer: '18' },
             { question: 'How many ways to arrange letters of "APPLE"?', options: ['120', '60', '24', '12'], correctAnswer: '60' },
             { question: 'Ratio of area of circle to sqaure with same perimeter?', options: ['4:pi', 'pi:2', '1:1', '14:11'], correctAnswer: '14:11' }

        ]
    },
    'EVS MCQ': {
         Easy: [
            { question: 'Main gas in atmosphere?', options: ['Oxygen', 'Nitrogen', 'CO2', 'Argon'], correctAnswer: 'Nitrogen' },
            { question: 'World Environment Day?', options: ['June 5', 'April 22', 'May 1', 'Dec 25'], correctAnswer: 'June 5' },
             { question: 'Biotic component?', options: ['Water', 'Soil', 'Plants', 'Air'], correctAnswer: 'Plants' },
             { question: 'Ozone layer protects from?', options: ['UV rays', 'Infrared', 'X-rays', 'Gamma'], correctAnswer: 'UV rays' },
             { question: 'Renewable source?', options: ['Coal', 'Solar', 'Oil', 'Gas'], correctAnswer: 'Solar' }
        ],
        Medium: [
             { question: 'Deforestation causes?', options: ['More rain', 'Soil erosion', 'Cooling', 'More oxygen'], correctAnswer: 'Soil erosion' },
             { question: 'Acid rain caused by?', options: ['SO2 and NO2', 'CO2', 'CFC', 'O3'], correctAnswer: 'SO2 and NO2' },
             { question: 'Greenhouse gas?', options: ['Nitrogen', 'Methane', 'Oxygen', 'Argon'], correctAnswer: 'Methane' },
             { question: 'Chipko movement related to?', options: ['Forest conservation', 'Water', 'Air', 'Animals'], correctAnswer: 'Forest conservation' },
             { question: 'Minamata disease caused by?', options: ['Lead', 'Mercury', 'Cadmium', 'Arsenic'], correctAnswer: 'Mercury' }

        ],
         Hard: [
             { question: 'Montreal Protocol controls?', options: ['Ozone depleting substances', 'Global warming', 'Biodiversity', 'Land mines'], correctAnswer: 'Ozone depleting substances' },
             { question: 'Eutrophication results in reduction of?', options: ['Dissolved Oxygen', 'Nutrients', 'Algae', 'Salinity'], correctAnswer: 'Dissolved Oxygen' },
             { question: 'Kyoto Protocol related to?', options: ['Climate Change', 'Wetlands', 'Nuclear', 'Trade'], correctAnswer: 'Climate Change' },
             { question: 'Highest biodiversity found in?', options: ['Tundra', 'Rainforest', 'Desert', 'Grassland'], correctAnswer: 'Rainforest' },
             { question: 'Energy flow in ecosystem is?', options: ['Unidirectional', 'Cyclic', 'Bidirectional', 'Random'], correctAnswer: 'Unidirectional' }
         ]
    }
};

const TestPage = () => {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('welcome'); // welcome, quiz, result
    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState('Medium');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30); // 30 sec per question
    const [selectedOption, setSelectedOption] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);

    // Filter questions based on selection
    const startTest = () => {
        if (!category) return;
        const pool = QUESTIONS_DB[category][difficulty] || [];
        setQuestions(pool); // In real app, maybe shuffle
        setCurrentQIndex(0);
        setScore(0);
        setScreen('quiz');
        setTimeLeft(30);
    };

    // Timer Logic
    useEffect(() => {
        if (screen !== 'quiz') return;
        if (timeLeft <= 0) {
            handleNext(true); // Force next specific to timeout
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, screen]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentQIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = (isTimeout = false) => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setTimeLeft(30);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setScreen('result');
        }
    };

    const getScorePercentage = () => Math.round((score / questions.length) * 100);

    return (
        <div className="tp-container">
            <div className="tp-bg-grid"></div>
            
            <AnimatePresence mode="wait">
                {screen === 'welcome' && (
                    <motion.div 
                        className="tp-welcome-card"
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h1 className="tp-title">Skill <span className="neon-text">Arena</span></h1>
                        <p className="tp-subtitle">Select your battlefield</p>

                        <div className="tp-category-grid">
                            {TEST_CATEGORIES.map(cat => (
                                <div 
                                    key={cat.id}
                                    className={`tp-cat-card ${category === cat.id ? 'active' : ''}`}
                                    onClick={() => setCategory(cat.id)}
                                    style={{ '--accent-color': cat.color }}
                                >
                                    <div className="tp-cat-icon">{cat.icon}</div>
                                    <span className="tp-cat-name">{cat.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="tp-difficulty-selector">
                            {DIFFICULTY_LEVELS.map(level => (
                                <button 
                                    key={level}
                                    className={`tp-diff-btn ${difficulty === level ? 'active' : ''}`}
                                    onClick={() => setDifficulty(level)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>

                        <button 
                            className="tp-start-btn" 
                            disabled={!category}
                            onClick={startTest}
                        >
                            <FaPlay /> Start Challenge
                        </button>
                    </motion.div>
                )}

                {screen === 'quiz' && questions.length > 0 && (
                    <motion.div 
                        className="tp-quiz-card"
                        key="quiz"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                    >
                        <div className="tp-quiz-header">
                            <span className="tp-badge">{category}</span>
                            <div className="tp-timer-pill" style={{ color: timeLeft < 10 ? '#ff0055' : 'white' }}>
                                {timeLeft}s
                            </div>
                        </div>

                        <div className="tp-progress-bar">
                            <div 
                                className="tp-progress-fill" 
                                style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <h2 className="tp-question-text">
                            {questions[currentQIndex].question}
                        </h2>

                        <div className="tp-options-grid">
                            {questions[currentQIndex].options.map((option, idx) => {
                                let statusClass = '';
                                if (isAnswered) {
                                    if (option === questions[currentQIndex].correctAnswer) statusClass = 'correct';
                                    else if (option === selectedOption) statusClass = 'wrong';
                                    else statusClass = 'dimmed';
                                }
                                return (
                                    <button 
                                        key={idx}
                                        className={`tp-option-btn ${statusClass}`}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={isAnswered}
                                    >
                                        {option}
                                        {statusClass === 'correct' && <FaCheckCircle className="tp-status-icon" />}
                                        {statusClass === 'wrong' && <FaTimesCircle className="tp-status-icon" />}
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswered && (
                            <motion.button 
                                className="tp-next-btn"
                                onClick={() => handleNext()}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {currentQIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {screen === 'result' && (
                    <motion.div 
                        className="tp-result-card"
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <FaTrophy className="tp-trophy-icon" />
                        <h2 className="tp-result-title">Challenge Complete!</h2>
                        
                        <div className="tp-score-circle">
                            <span className="tp-score-value">{getScorePercentage()}%</span>
                            <span className="tp-score-label">Accuracy</span>
                        </div>

                        <div className="tp-stats-row">
                            <div className="tp-stat">
                                <span className="label">Correct</span>
                                <span className="value">{score}</span>
                            </div>
                            <div className="tp-stat">
                                <span className="label">Total</span>
                                <span className="value">{questions.length}</span>
                            </div>
                            <div className="tp-stat">
                                <span className="label">XP Earned</span>
                                <span className="value">+{score * 10}</span>
                            </div>
                        </div>

                        <div className="tp-action-row">
                            <button className="tp-secondary-btn" onClick={() => setScreen('welcome')}>
                                <FaRedo /> Retake
                            </button>
                            <button className="tp-primary-btn" onClick={() => navigate('/placement-guide')}>
                                <FaArrowLeft /> Back to Guide
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TestPage;