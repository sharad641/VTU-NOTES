import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react'; // Using Lucide icons for consistency
import './FAQsModern.css'; // CHANGED: Modern CSS

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const combinedFAQs = [
        { question: 'What is the minimum passing grade in VTU exams?', answer: 'To pass any VTU examination, a student must secure at least 40% in both the internal and external assessments combined for each subject.' },
        { question: 'Can I apply for revaluation if I am not satisfied with my marks?', answer: 'Yes, VTU allows students to apply for revaluation of their answer scripts. You need to apply through your college within the stipulated deadline after the results are announced.' },
        { question: 'How are internal assessment marks calculated?', answer: 'Internal assessment marks are based on assignments, internal tests, attendance, and any additional evaluation criteria set by the department.' },
        { question: 'When does VTU typically release the exam schedule?', answer: 'VTU releases the exam schedule a few weeks before the semester exams. The updates can be found on the official VTU website or through college administration.' },
        { question: 'What is the process for revaluation in VTU?', answer: 'After results are announced, students can apply for revaluation through their respective colleges within the stipulated timeframe. Students must submit an application form and pay the required revaluation fee for each subject they wish to have re-evaluated.' },
        { question: 'How much is the revaluation fee per subject in VTU?', answer: 'The revaluation fee per subject is typically around INR 400. However, students should verify the exact fee with their college as it may vary slightly each academic year.' },
        { question: 'How long does it take to get revaluation results in VTU?', answer: 'Revaluation results are generally declared within 3-4 weeks after the application period closes. Students can check the updated results on the VTU official website or through their college.' },
        { question: 'What is the passing criteria for lab externals in VTU?', answer: 'To pass lab externals, students must score a minimum of 40% of the total marks in the practical examination, which includes both the execution and viva components. This is separate from the internal lab marks.' },
        { question: 'How are theory external exams evaluated in VTU?', answer: 'Theory external exams are evaluated based on the answers provided in the answer script, with a detailed marking scheme followed by evaluators. Marks are allocated based on the quality, accuracy, and completeness of answers.' },
        { question: 'What is the procedure for applying to the makeup exam in VTU?', answer: 'Students who did not pass regular exams can apply for makeup exams by filling out an application form through their college. The makeup exams are conducted for students who failed one or more subjects.' },
        { question: 'How are lab external marks calculated in VTU?', answer: 'Lab external marks are usually a combination of the practical execution, a viva, and an assessment of the overall lab performance. The total score is then combined with internal lab marks for the final grade.' },
        { question: 'What are the steps to follow on the day of the lab external exam?', answer: 'On the day of the lab external exam, students should arrive early, be prepared with necessary materials, understand the experiments thoroughly, and be ready for both practical execution and viva questions.' },
        { question: 'Can students request a photocopy of their answer script?', answer: 'Yes, VTU allows students to request a photocopy of their answer script after results are announced. This is helpful for students who want to review their performance before applying for revaluation.' },
        { question: 'What is the valuation process for VTU exams?', answer: 'The valuation process involves a double-evaluation system where each answer script is reviewed by two separate evaluators to ensure accuracy and fairness. If there is a large discrepancy between the two, a third evaluation may be conducted.' },
        { question: 'How are attendance and marks related in VTU?', answer: 'VTU generally requires students to maintain a minimum attendance percentage (often around 75%) to be eligible for appearing in the exams. Poor attendance may impact eligibility or result in lower internal marks.' },
        { question: 'What are the elective subjects in VTU, and how can students choose them?', answer: 'Elective subjects are specialized courses that students choose based on their interests. Colleges inform students about the options and deadlines.' },
        { question: 'How is the project evaluated in VTU?', answer: 'Projects are evaluated based on a report, presentation, implementation, and a viva. Both internal and external examiners assess the project.' },
        { question: 'Are projects in the final year mandatory for all branches?', answer: 'Yes, final-year projects are mandatory for all undergraduate programs and test students’ practical knowledge and research skills.' },
        { question: 'How can I download course notes?', answer: 'Navigate to your course and select the module to access downloadable notes.' },
        { question: 'What is the exam pattern?', answer: 'Exam patterns can vary; check the course syllabus or notification section for details.' },
        { question: 'Is there a feature to view recent updates and news?', answer: 'Yes, our site includes an "Updates and News" section to keep students informed about VTU events and important announcements.' },
        { question: 'Where can I find important exam notifications?', answer: 'You can find these in the "Notifications" section, which includes exam schedules, holidays, and other crucial updates.' },
        { question: 'Does the VTU Notes site include a CGPA calculator?', answer: 'Yes, we offer a CGPA calculator along with SGPA and percentage calculators tailored to different schemes.' },
        { question: 'How can I access placement preparation resources?', answer: 'Our site includes a "Placement Guide" section with information on aptitude, technical skills, group discussions, and interview preparation.' },
        { question: 'Who is eligible to pursue an honors degree at VTU?', answer: 'To be eligible for an honors degree at VTU, students typically need to maintain a minimum CGPA (set by the university, often 7.5 or above) and must complete additional elective courses as specified in their curriculum.' },
        { question: 'Will an honors degree be mentioned on the final VTU degree certificate?', answer: 'Yes, if a student successfully completes the honors program, it will be mentioned on the final degree certificate as an additional qualification, distinguishing it from a regular degree.' }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filteredFAQs = combinedFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="faq-page-container">
            <div className="faq-bg-blob blob-left"></div>
            <div className="faq-bg-blob blob-right"></div>

            <div className="faq-content-wrapper">
                <div className="faq-hero">
                    <div className="faq-badge">
                        <HelpCircle size={16} /> Support Center
                    </div>
                    <h1 className="faq-title">Frequently Asked Questions</h1>
                    <p className="faq-subtitle">
                        Everything you need to know about VTU exams, improvements, results, and more.
                        Can't find what you're looking for? Reach out to us.
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search by keywords (e.g., 'revaluation', 'passing marks')..."
                    className="faq-search-box"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="faq-list-modern">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <div key={index} className={`faq-item-modern ${activeIndex === index ? 'active' : ''}`}>
                                <button className="faq-question" onClick={() => toggleAnswer(index)}>
                                    {faq.question}
                                    <span className="faq-icon">
                                        <ChevronDown size={16} />
                                    </span>
                                </button>
                                <div className="faq-answer-wrapper">
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                            <p>No questions found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
