import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null); // State to track which question is active

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
        { question: 'How can I pay the exam and revaluation fees?', answer: 'Exam and revaluation fees are typically paid through the college’s administrative office. Some colleges may offer online payment options for convenience.' },
        { question: 'Are revaluation marks added to the final result directly?', answer: 'Yes, if the revaluation results in an increased mark, the revised score is updated in the student’s final result. If there is no change or a decrease, the original score remains.' },
        { question: 'What happens if I fail both regular and makeup exams?', answer: 'If a student fails both the regular and makeup exams, they will need to reappear for the subject in the next regular semester exam or subsequent makeup exams as per university guidelines.' },
        { question: 'Can I withdraw from a revaluation application after applying?', answer: 'No, once an application for revaluation is submitted and the fee is paid, it cannot be withdrawn or refunded.' },
        { question: 'How are attendance and marks related in VTU?', answer: 'VTU generally requires students to maintain a minimum attendance percentage (often around 75%) to be eligible for appearing in the exams. Poor attendance may impact eligibility or result in lower internal marks.' },
        { question: 'How are marks split between internal and external assessments?', answer: 'For most theory subjects, VTU allocates around 30-40% of the total marks to internal assessments and the remaining 60-70% to external exams. For practical/lab subjects, internal assessments may count for a larger portion.' },
        { question: 'What are the consequences of malpractice in VTU exams?', answer: 'Engaging in malpractice can result in severe penalties, including disqualification from the exam, suspension, or other disciplinary actions as decided by the university’s examination board.' },
        { question: 'What is the grace marks policy in VTU?', answer: 'VTU may grant grace marks to students under certain conditions, typically to help them pass if they are short by a few marks in one or two subjects. The exact policy varies by year.' },
        { question: 'What is the process to appeal if a student is not satisfied with the revaluation results?', answer: 'Students who are unsatisfied with their revaluation results may approach their college administration to explore further appeal options, though this may be limited to specific cases.' },
        { question: 'How are SGPA and CGPA calculated in VTU?', answer: 'SGPA (Semester Grade Point Average) and CGPA (Cumulative Grade Point Average) are calculated using the credit-weighted average of the grade points obtained in each subject, as per the 10-point grading scale.' },
        { question: 'When are the theory external exams conducted in VTU?', answer: 'Theory external exams are conducted at the end of each semester. The exact dates are provided by VTU in the exam schedule released prior to the examination period.' },
        { question: 'What should students bring for the lab external exams?', answer: 'Students should bring their lab record book, ID card, necessary stationery, and any materials specifically instructed by their department. They should also be prepared to demonstrate their experiments and answer viva questions.' },
        { question: 'Can students appeal the result if they suspect an error in the marks calculation?', answer: 'Yes, if students believe there is an error in marks calculation, they can request a verification of marks or a photocopy of the an,wer script to check for discrepancies before applying for revaluation.' },
        { question: 'What is the grading system followed by VTU?', answer: 'VTU uses a 10-point grading system where grades range from ‘S’ for outstanding performance to ‘F’ for fail. The corresponding grade points are used to calculate the CGPA and SGPA.' },
        { question: 'What honors degrees are provided by VTU?', answer: 'VTU offers honors degrees in various fields for students who meet specific academic requirements and complete additional credits or courses as defined by the university curriculum.' },
        { question: 'How can students enroll for honors programs in VTU?', answer: 'To enroll in an honors program, students must meet the eligibility criteria set by VTU, such as maintaining a certain CGPA and completing specific elective courses.' },
        { question: 'Can credits earned in an honors program contribute to the final degree?', answer: 'Yes, credits from the honors program are counted towards the final degree and can enhance a student’s academic profile.' },
        { question: 'What is a makeup exam, and who is eligible for it?', answer: 'A makeup exam in VTU is conducted for students who failed in one or more subjects. Eligibility is determined by university regulations and is for those who have not cleared the subject in regular attempts.' },
        { question: 'How many attempts are allowed for clearing a subject in VTU?', answer: 'Students generally have multiple attempts to clear a subject, including regular, supplementary, and makeup exams. All subjects should be cleared within the duration allowed for the degree.' },
        { question: 'Are makeup exams conducted for both theory and practical subjects?', answer: 'Yes, VTU conducts makeup exams for both theory and practical subjects as per university guidelines.' },
        { question: 'How can students apply for makeup exams?', answer: 'Students need to apply for makeup exams through their colleges by filling out an application form and paying the exam fee.' },
        { question: 'How are credits assigned to courses in VTU?', answer: 'Credits are assigned based on course type. Lecture-based courses have more credits compared to laboratory courses.' },
        { question: 'Can credits from makeup exams be included in the final CGPA calculation?', answer: 'Yes, credits from successfully completed makeup exams are included in the CGPA calculation.' },
        { question: 'What are the elective subjects in VTU, and how can students choose them?', answer: 'Elective subjects are specialized courses that students choose based on their interests. Colleges inform students about the options and deadlines.' },
        { question: 'How is the project evaluated in VTU?', answer: 'Projects are evaluated based on a report, presentation, implementation, and a viva. Both internal and external examiners assess the project.' },
        { question: 'Are projects in the final year mandatory for all branches?', answer: 'Yes, final-year projects are mandatory for all undergraduate programs and test students’ practical knowledge and research skills.' },
        { question: 'How can I download course notes?', answer: 'Navigate to your course and select the module to access downloadable notes.' },
        { question: 'What is the exam pattern?', answer: 'Exam patterns can vary; check the course syllabus or notification section for details.' },
        { question: 'Is there a feature to view recent updates and news?', answer: 'Yes, our site includes an "Updates and News" section to keep students informed about VTU events and important announcements.' },
        { question: 'Where can I find important exam notifications?', answer: 'You can find these in the "Notifications" section, which includes exam schedules, holidays, and other crucial updates.' },
        { question: 'Does the VTU Notes site include a CGPA calculator?', answer: 'Yes, we offer a CGPA calculator along with SGPA and percentage calculators tailored to different schemes.' },
        { question: 'How can I access placement preparation resources?', answer: 'Our site includes a "Placement Guide" section with information on aptitude, technical skills, group discussions, and interview preparation.' },
        { question: 'What should I do if I can’t find specific course notes?', answer: 'Check back later for updates, or reach out through the contact section to request specific notes.' },
        { question: 'What is an honors degree at VTU?', answer: 'An honors degree at VTU is an additional academic credential that students can pursue alongside their regular degree. It involves completing extra credits through specialized courses or projects to demonstrate a higher level of expertise in a particular field.' },
        { question: 'Who is eligible to pursue an honors degree at VTU?', answer: 'To be eligible for an honors degree at VTU, students typically need to maintain a minimum CGPA (set by the university, often 7.5 or above) and must complete additional elective courses as specified in their curriculum.' },
        { question: 'How can students apply for an honors degree at VTU?', answer: 'Students interested in pursuing an honors degree must apply through their college by expressing their interest, meeting the eligibility requirements, and selecting the necessary elective courses as outlined by the university.' },
        { question: 'What are the benefits of earning an honors degree from VTU?', answer: 'An honors degree provides students with deeper knowledge in their field of study, enhances their academic profile, and can improve job and higher education prospects by showcasing their commitment and expertise.' },
        { question: 'Do honors courses have separate exams in VTU?', answer: 'Yes, honors courses are assessed separately, and students need to appear for exams and complete any required projects or assignments as part of the honors curriculum.' },
        { question: 'Can I pursue an honors degree in a different specialization than my main program?', answer: 'No, typically the honors degree specialization must be related to the student’s main program or major. The specific courses and requirements are defined by VTU and individual departments.' },
        { question: 'Are there any additional fees for enrolling in an honors degree at VTU?', answer: 'Yes, pursuing an honors degree may involve additional tuition fees and costs associated with course materials, depending on the college or department policies.' },
        { question: 'How are the additional credits for an honors degree structured?', answer: 'The credits for an honors degree at VTU are structured through elective courses, advanced projects, or seminars that students must complete over their semesters. The specifics are defined in the course plan provided by the university or department.' },
        { question: 'Can honors degree credits be transferred if I change my college within VTU?', answer: 'Credit transfer policies depend on VTU’s regulations and the acceptance criteria of the new college. It is advisable to consult the academic office for specific transfer guidelines.' },
        { question: 'Will an honors degree be mentioned on the final VTU degree certificate?', answer: 'Yes, if a student successfully completes the honors program, it will be mentioned on the final degree certificate as an additional qualification, distinguishing it from a regular degree.' }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle between showing and hiding answer
    };

    return (
        <div className="faqs-container">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div className="faq-list">
                {combinedFAQs.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <h4 onClick={() => toggleAnswer(index)}>{faq.question}</h4>
                        {activeIndex === index && <p>{faq.answer}</p>} {/* Show answer if it's active */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
