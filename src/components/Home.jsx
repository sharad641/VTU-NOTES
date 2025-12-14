import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { analytics, auth } from "../firebase";
import { logEvent } from "firebase/analytics";

import BranchSelection from "./BranchSelection";
import ModelPapers from "./ModelPapers";
import UploadForm from "./UploadForm";
import Contact from "./Contact";
import CommentSection from "./CommentSection";
import ChatBot from "./ChatBot";
import SgpaCalculator from "./SgpaCalculator";

import { FaLaptopCode, FaRobot, FaMicrochip, FaLightbulb } from "react-icons/fa";

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    logEvent(analytics, "homepage_view");
  }, []);

  const toggleChatbot = () => setShowChatbot((prev) => !prev);

  const projectTypes = [
    {
      icon: <FaLaptopCode size={38} />,
      title: "Fullstack Development",
      desc: "Modern web & mobile apps using React, Node.js, Express & MongoDB.",
    },
    {
      icon: <FaRobot size={38} />,
      title: "AI / Machine Learning",
      desc: "AI models, automation, TensorFlow, OpenCV & NLP based projects.",
    },
    {
      icon: <FaMicrochip size={38} />,
      title: "IoT & Embedded Systems",
      desc: "Smart IoT automation using ESP32, Arduino, sensors & cloud control.",
    },
    {
      icon: <FaLightbulb size={38} />,
      title: "Innovative Engineering Ideas",
      desc: "Transform your concepts into research-based working projects.",
    },
  ];

  const handleProjectNavigation = () => {
    if (!auth.currentUser) {
      localStorage.setItem("redirectAfterLogin", "/project-enquiry");
      navigate("/login");
    } else {
      navigate("/project-enquiry");
    }
  };

  return (
    <main className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* 🎉 Announcement Banner */}
      <div className="w-full bg-blue-600 text-white py-2 px-3 text-center text-sm font-medium">
        🚀 New VTU Test Login System + Latest Notes Updated!
      </div>

      {/* 🌟 HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-blue-700 dark:text-blue-400">
            VTU Notes, Projects, Tools & Everything You Need
          </h1>

          <p className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Access high-quality VTU notes, previous papers, model tests, calculators,  
            project ideas & smart tools — all in one place.
          </p>

          <button
            onClick={handleProjectNavigation}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl text-lg transition"
          >
            Get Your Project → 
          </button>
        </div>
      </section>

      {/* 🛠 PROJECT OFFERINGS */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center">🛠 Build Your Dream Engineering Project</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Choose from top-notch project domains guided by industry experts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {projectTypes.map((type, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
                {type.icon}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-center">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mt-2 text-sm">
                {type.desc}
              </p>

              <button
                onClick={handleProjectNavigation}
                className="w-full mt-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Request Project →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🎓 Projects We Provide */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-4">🎓 Mini & Major Projects We Provide</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Web Apps (React, Node.js)",
            "AI/ML Models (TensorFlow & OpenCV)",
            "IoT Systems (ESP32, Sensors)",
            "Final Year Research Projects",
            "Data Science & ML Projects",
            "Android/Flutter App Projects",
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition"
            >
              ⭐ {item}
            </div>
          ))}
        </div>
      </section>

      {/* 💡 WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold mb-6">💡 Why Students Trust Us?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["🌟 Practical Ideas", "Real-world engineering problems based projects."],
            ["🧠 Expert Mentorship", "Guidance from developers & engineers."],
            ["⚡ Fast Delivery", "Quick turnaround with working source code."],
            ["📘 Full Documentation", "Report, PPT, abstract & explanation included."],
            ["💰 Student Friendly", "Affordable for all engineering students."],
          ].map(([title, desc], index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ MAIN SECTIONS */}
      <BranchSelection />
      <ModelPapers />

      {/* 💬 CHATBOT BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl transition duration-300"
        >
          {showChatbot ? "Close Chatbot" : "💬 Chat with Us"}
        </button>
      </div>

      {showChatbot && <ChatBot />}

      <SgpaCalculator />

      {/* Upload */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <UploadForm />
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold mb-2">📖 Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300">Quick answers to common questions.</p>
        <Link
          to="/faqs"
          className="inline-block mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Visit FAQs →
        </Link>
      </section>

      <Contact />
      <CommentSection />
    </main>
  );
};

export default Home;
