// src/components/ProjectEnquiry.js
import React, { useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { ref, push, set, onValue, off } from "firebase/database";
import { motion } from "framer-motion";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaLaptopCode,
  FaRobot,
  FaMicrochip,
  FaLightbulb,
  FaCheckCircle,
  FaSpinner,
  FaStar,
  FaCopy,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import ProjectReviews from "./ProjectReviews";
import "./ProjectEnquiry.css";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const ProjectEnquiry = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------ STATES ------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [success, setSuccess] = useState("");
  const [aiIdeas, setAiIdeas] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ideaSuggestion, setIdeaSuggestion] = useState("");
  const [submittedProjects, setSubmittedProjects] = useState({});
  const [allProjects, setAllProjects] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ------------------ CONSTANTS ------------------
  const ADMIN_UIDS = ["ADMIN_UID_1", "ADMIN_UID_2"]; // 🔒 Replace with actual Admin UIDs
  const projectTypes = [
    {
      icon: <FaLaptopCode size={40} />,
      title: "Fullstack",
      desc: "Web & Mobile Apps using React, Node.js, MongoDB",
      color: "#3b82f6",
    },
    {
      icon: <FaRobot size={40} />,
      title: "ML / AI",
      desc: "Machine Learning & AI projects using Python & TensorFlow",
      color: "#2563eb",
    },
    {
      icon: <FaMicrochip size={40} />,
      title: "IoT",
      desc: "Smart devices & automation using ESP32, Arduino",
      color: "#1e40af",
    },
    {
      icon: <FaLightbulb size={40} />,
      title: "Other",
      desc: "Custom innovative or research-based projects",
      color: "#60a5fa",
    },
  ];

  // ------------------ AUTH REDIRECT ------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setIsAdmin(ADMIN_UIDS.includes(user.uid));
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, location]);

  // ------------------ PROJECT FETCH ------------------
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const refPath = isAdmin ? "project_enquiries" : `project_enquiries/${user.uid}`;
    const dataRef = ref(database, refPath);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val() || {};
      isAdmin ? setAllProjects(data) : setSubmittedProjects(data);
    });

    return () => {
      off(dataRef);
      unsubscribe();
    };
  }, [isAdmin]);

  // ------------------ SUGGESTIONS ------------------
  useEffect(() => {
    const suggestions = {
      Fullstack: "💡 Try: VTU Notes Portal, Portfolio Website, Student Management System.",
      "ML / AI": "🤖 Try: Chatbot Assistant, Image Recognition Tool, Fake News Detector.",
      IoT: "🔌 Try: Smart Irrigation, Air Quality Monitor, Home Automation.",
      Other: "✨ Try: Custom innovative or research-based projects.",
    };
    setIdeaSuggestion(suggestions[formData.projectType] || "");
  }, [formData.projectType]);

  // ------------------ INPUT HANDLERS ------------------
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isValidMobile = (num) => /^[6-9]\d{9}$/.test(num);

  // ------------------ FORM SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, mobile, projectType } = formData;

    if (!name || !email || !mobile || !projectType) {
      alert("⚠️ Please fill all required fields.");
      return;
    }
    if (!isValidMobile(mobile)) {
      alert("⚠️ Enter a valid 10-digit mobile number.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("❌ Login required.");
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    setLoading(true);
    try {
      const projectRef = push(ref(database, `project_enquiries/${user.uid}`));
      await set(projectRef, {
        ...formData,
        steps: { step1: false, step2: false, step3: false },
        timestamp: Date.now(),
      });

      setSuccess("✅ Project request submitted successfully!");
      setFormData({ name: "", email: "", mobile: "", projectType: "", message: "" });
      setAiIdeas([]);
      setFavorites([]);
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ AI IDEA GENERATION ------------------
  const generateAiIdeas = async () => {
    if (!formData.projectType) return alert("Please select a project type first!");
    setGenerating(true);

    try {
      const prompt = `Suggest 3 innovative ${formData.projectType} project ideas with clear titles and short descriptions.${formData.message ? ` User interest: ${formData.message}` : ""}`;
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY } }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const formattedIdeas = text
        .split(/\d+\.\s|•|- /)
        .filter((idea) => idea.trim().length > 5)
        .map((idea) => ({ text: idea.trim(), favorite: false }));

      setAiIdeas(
        formattedIdeas.length
          ? formattedIdeas
          : [{ text: "💡 Portfolio Website, Student Management System, or IoT Automation Project.", favorite: false }]
      );
    } catch (err) {
      console.error(err);
      setAiIdeas([{ text: "💡 Could not fetch AI ideas. Try again later.", favorite: false }]);
    } finally {
      setGenerating(false);
    }
  };

  // ------------------ FAVORITES ------------------
  const toggleFavorite = (index) => {
    setAiIdeas((prev) => {
      const updated = [...prev];
      updated[index].favorite = !updated[index].favorite;
      setFavorites(updated.filter((idea) => idea.favorite));
      return updated;
    });
  };

  const copyFavorites = () => {
    if (!favorites.length) return alert("No favorites to copy!");
    navigator.clipboard.writeText(favorites.map((f) => f.text).join("\n"));
    alert("✅ Favorites copied!");
  };

  const downloadFavoritesPDF = () => {
    if (!favorites.length) return alert("No favorites to download!");
    const doc = new jsPDF();
    doc.setFontSize(12);
    favorites.forEach((f, idx) => doc.text(`${idx + 1}. ${f.text}`, 10, 10 + idx * 10));
    doc.save("project_ideas.pdf");
  };

  // ------------------ ADMIN STEP CONTROL ------------------
  const toggleStep = async (userId, projectId, step) => {
    if (!isAdmin) return;
    const steps = { step1: false, step2: false, step3: false };
    if (step === "step1") steps.step1 = true;
    if (step === "step2") Object.assign(steps, { step1: true, step2: true });
    if (step === "step3") Object.assign(steps, { step1: true, step2: true, step3: true });
    await set(ref(database, `project_enquiries/${userId}/${projectId}/steps`), steps);
  };

  // ------------------ RENDER PROJECTS ------------------
  const renderProjects = (projectsData, userKey = null) =>
    Object.entries(projectsData)
      .filter(([_, proj]) =>
        proj.projectType?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(([projId, proj]) => {
        const completedSteps = Object.values(proj.steps).filter(Boolean).length;
        const progressWidth = (completedSteps / 3) * 100;
        const userId = userKey || auth.currentUser?.uid;

        return (
          <motion.div key={projId} className="project-card" whileHover={{ scale: 1.03 }}>
            <h3>{proj.projectType} Project</h3>
            <p>{proj.message || "No description provided."}</p>
            <p className="contact-info-small">📞 {proj.mobile}</p>

            <div className="progress-bar-container">
              <div className="progress-line">
                <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
                {["step1", "step2", "step3"].map((step, idx) => (
                  <div
                    key={step}
                    className={`progress-step ${proj.steps[step] ? "active" : ""} ${isAdmin ? "admin" : "locked"}`}
                    onClick={() => isAdmin && toggleStep(userId, projId, step)}
                  >
                    {proj.steps[step] ? <FaCheckCircle /> : idx + 1}
                  </div>
                ))}
              </div>
            </div>

            <small>{new Date(proj.timestamp).toLocaleString()}</small>
          </motion.div>
        );
      });

  // ------------------ UI ------------------
  return (
    <section className="project-enquiry-section">
      <motion.div
        className="project-hero"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>🚀 Start Your Project Journey</h1>
        <p>
          Submit your project request in <span>Fullstack</span>, <span>ML/AI</span>, or{" "}
          <span>IoT</span>. Track your progress & get <b>AI-generated ideas</b>.
        </p>
      </motion.div>

      {/* Project Types */}
      <div className="project-types">
        {projectTypes.map((type, idx) => (
          <motion.div
            key={idx}
            className="project-type-card"
            style={{ borderTop: `4px solid ${type.color}` }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon-wrapper" style={{ color: type.color }}>
              {type.icon}
            </div>
            <h3>{type.title}</h3>
            <p>{type.desc}</p>
          </motion.div>
        ))}
      </div>

      {ideaSuggestion && (
        <motion.div className="idea-suggestion" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {ideaSuggestion}
        </motion.div>
      )}

      {/* Enquiry Form */}
      <motion.div
        className="project-enquiry-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {success && (
          <p className="success-msg">
            <FaCheckCircle /> {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
          <select name="projectType" value={formData.projectType} onChange={handleChange} required>
            <option value="">Select Project Type</option>
            {projectTypes.map((type) => (
              <option key={type.title} value={type.title}>
                {type.title}
              </option>
            ))}
          </select>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your project..." maxLength={400} />

          {formData.projectType && (
            <motion.button type="button" onClick={generateAiIdeas} className="generate-btn" whileHover={{ scale: 1.05 }} disabled={generating}>
              {generating ? <FaSpinner className="spin" /> : "✨ Generate AI Ideas"}
            </motion.button>
          )}

          <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.05 }} disabled={loading}>
            {loading ? <FaSpinner className="spin" /> : "🚀 Submit Request →"}
          </motion.button>
        </form>

        {/* AI Idea Suggestions */}
        {aiIdeas.length > 0 && (
          <div className="ai-ideas-list">
            <h4>💡 AI-Suggested Ideas</h4>
            {aiIdeas.map((idea, idx) => (
              <div
                key={idx}
                className={`idea-item ${idea.favorite ? "favorite" : ""}`}
                onClick={() => toggleFavorite(idx)}
              >
                <FaStar className={idea.favorite ? "active" : ""} /> {idea.text}
              </div>
            ))}
            {favorites.length > 0 && (
              <div className="idea-actions">
                <button onClick={copyFavorites}>
                  <FaCopy /> Copy
                </button>
                <button onClick={downloadFavoritesPDF}>
                  <FaDownload /> Download PDF
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Admin Search */}
      {isAdmin && (
        <div className="admin-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search projects by type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Submitted Projects */}
      <div className="submitted-projects">
        <h2>📋 {isAdmin ? "All User Projects" : "Your Projects"}</h2>
        {isAdmin ? (
          Object.keys(allProjects).length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            Object.entries(allProjects).map(([userId, projects]) => (
              <div key={userId}>
                <h4>User: {userId}</h4>
                <div className="projects-grid">{renderProjects(projects, userId)}</div>
              </div>
            ))
          )
        ) : Object.keys(submittedProjects).length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="projects-grid">{renderProjects(submittedProjects)}</div>
        )}
      </div>

      <ProjectReviews />
    </section>
  );
};

export default ProjectEnquiry;
