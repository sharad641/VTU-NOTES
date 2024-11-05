// src/components/ChatBot.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChatBot.css';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    // Initial greeting when the chatbot opens
    useEffect(() => {
        const greetingMessage = { text: "Hi! I'm your VTU Notes assistant. How can I help you today?", sender: 'bot' };
        setMessages([greetingMessage]);
    }, []);

    const faqs = {
        "examination policies": {
            keywords: ["passing grade", "internal assessment", "external exams", "exam schedule", "makeup exam"],
            answer: "VTU examination policies include understanding passing grades, internal and external assessments, exam schedules, and the process for makeup exams."
        },
        "revaluation process": {
            keywords: ["revaluation", "revaluation fee", "photocopy", "appeal process", "results timeline"],
            answer: "Revaluation involves applying within a set timeline, paying the applicable fees, and potentially obtaining a photocopy of your answer script."
        },
        "attendance and assessment": {
            keywords: ["attendance percentage", "marks allocation", "internal vs. external assessment", "malpractice"],
            answer: "Maintaining the required attendance is critical as it affects exam eligibility. Marks are allocated based on both internal and external assessments."
        },
        "grading system": {
            keywords: ["grading system", "sgpa", "cgpa", "grading scale"],
            answer: "VTU follows a grading system where SGPA and CGPA represent semester and cumulative performance respectively. Grades are assigned based on a defined scale."
        },
        "course and credits management": {
            keywords: ["course credits", "elective subjects", "honors degree", "project evaluation", "credits transfer"],
            answer: "Courses carry specific credits which contribute to overall progress. Electives and honors programs require planning and fulfilling credit requirements."
        },
        "resources and support": {
            keywords: ["course notes", "placement preparation", "updates", "notifications", "VTU notes access", "study material"],
            answer: "Access course notes, placement guides, and receive important updates through the 'Updates and News' and 'Notifications' sections. For detailed VTU notes, visit the 'Notes' section of our website."
        },
        "general exam information": {
            keywords: ["exam pattern", "lab externals", "project evaluation", "lab exams"],
            answer: "VTU exam patterns include written and practical assessments, with specific requirements for lab and project evaluations."
        },
        "placement preparation": {
            keywords: ["placement process", "internship guidance", "placement links", "aptitude", "technical rounds", "HR interview"],
            answer: "For placement and internship preparation, refer to the dedicated 'Placement Guides' page, where you will find tech placement procedures, preparation steps, and interview tips."
        },
        "SGPA/CGPA calculation": {
            keywords: ["calculate sgpa", "calculate cgpa", "sgpa calculator", "percentage calculator"],
            answer: "To calculate your SGPA or CGPA, use the calculator in the 'Calculators' section of our VTU Notes website."
        }
    };

    const commonResponses = {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! What can I help you with?",
        "good morning": "Good morning! How can I help you today?",
        "good evening": "Good evening! What questions do you have for me?",
        "thank you": "You're welcome! Let me know if you have more questions.",
        "bye": "Goodbye! Have a great day!",
        "how to access vtu notes": "You can access VTU notes by visiting the 'Notes' section on our website.",
        "latest updates from vtu": "Check the 'Updates and News' section on our website for the latest VTU-related information.",
        "how to prepare for placements": "Visit our 'Placement Guides' page for detailed preparation steps, including resources for aptitude, technical rounds, and HR interviews.",
        "cgpa calculator": "You can use our 'CGPA Calculator' tool available under the 'Calculators' section to compute your CGPA easily.",
        "sgpa calculation": "For SGPA calculation, go to the 'SGPA Calculator' page and follow the steps to input your marks and get your SGPA.",
        "vtu notes availability": "Our VTU Notes website offers notes for different schemes and subjects. Visit the 'Notes' section and select your scheme to find the courses.",
        "placement preparation resources": "Our 'Placement Guides' section provides valuable resources including practice questions for aptitude tests, interview tips, and technical prep.",
        "placement links": "Find the latest internship and placement links in our 'Placement Guides' section to help you stay updated.",
        "vtu faqs": "If you have more questions, visit our 'FAQs' page for detailed answers about courses, exams, and other VTU topics.",
        "notifications": "Important notifications like exam schedules and holidays can be found in the 'Notifications' section."
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);

        const normalizedInput = input.toLowerCase();
        let botResponse = "You can explore more in our FAQs section.";

        // Check for common responses
        if (commonResponses[normalizedInput]) {
            botResponse = commonResponses[normalizedInput];
        } else {
            // Check for keyword matches in FAQs
            for (const data of Object.values(faqs)) {
                if (data.keywords.some(keyword => normalizedInput.includes(keyword))) {
                    botResponse = data.answer;
                    break;
                }
            }
        }

        const botMessage = { text: botResponse, sender: 'bot' };

        if (normalizedInput.includes("faq") || normalizedInput.includes("questions")) {
            botMessage.text += " You can explore more in our FAQs section.";
            setMessages((prev) => [
                ...prev, 
                botMessage, 
                { text: <Link to="/faqs">Click here to view FAQs</Link>, sender: 'bot' }
            ]);
        } else {
            setMessages((prev) => [...prev, botMessage]);
        }

        setInput('');
    };

    return (
        <div className="chatbot-container">
            <h2>Chat with Us (Just for trial)</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender}>
                        {typeof message.text === 'string' ? message.text : message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question here..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
