import React, { useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { ref, push, set, onValue, off } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaLaptopCode,
  FaRobot,
  FaMicrochip,
  FaLightbulb,
  FaCheckCircle,
  FaSpinner,
  FaStar,
  FaSearch,
  FaMagic,
  FaPaperPlane
} from "react-icons/fa";
import ProjectReviews from "./ProjectReviews";
import "./ProjectModern.css"; // CHANGED: Modern CSS

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

  // 🔒 Replace with your actual Admin UIDs
  const ADMIN_UIDS = ["ADMIN_UID_1", "ADMIN_UID_2"];

  const projectTypes = [
    {
      icon: <FaLaptopCode />,
      title: "Fullstack",
      desc: "Web & Apps (React, Node, MERN)",
      color: "#2563eb",
    },
    {
      icon: <FaRobot />,
      title: "ML / AI",
      desc: "Python, TensorFlow, Data Science",
      color: "#4f46e5",
    },
    {
      icon: <FaMicrochip />,
      title: "IoT",
      desc: "Arduino, ESP32, Automation",
      color: "#0891b2",
    },
    {
      icon: <FaLightbulb />,
      title: "Other",
      desc: "Research & Innovation",
      color: "#f59e0b",
    },
  ];

  // ------------------ AUTH CHECK ------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setIsAdmin(ADMIN_UIDS.includes(user.uid));
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  // ------------------ DATA FETCHING ------------------
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

  // ------------------ DYNAMIC SUGGESTIONS ------------------
  useEffect(() => {
    const suggestions = {
      Fullstack: "💡 Popular: E-Commerce, LMS, Social Media Dashboards.",
      "ML / AI": "🤖 Popular: Face Detection, Stock Prediction, Chatbots.",
      IoT: "🔌 Popular: Smart Home, Weather Station, Health Monitor.",
      Other: "✨ Tip: Be specific about your research goals.",
    };
    setIdeaSuggestion(suggestions[formData.projectType] || "");
  }, [formData.projectType]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isValidMobile = (num) => /^[6-9]\d{9}$/.test(num);

  // ------------------ SUBMIT HANDLER ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ['name', 'email', 'mobile', 'projectType'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert(`⚠️ Please fill all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!isValidMobile(formData.mobile)) {
      alert("⚠️ Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      const projectRef = push(ref(database, `project_enquiries/${user.uid}`));
      await set(projectRef, {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        steps: { step1: false, step2: false, step3: false },
        status: "pending",
        timestamp: Date.now(),
      });

      setSuccess("🎉 Request received! We'll contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        projectType: "",
        message: ""
      });
      setAiIdeas([]);
      setFavorites([]);

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Error submitting project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ AI LOGIC ------------------
  const generateAiIdeas = async () => {
    if (!formData.projectType) {
      alert("Select a Project Type first to generate ideas.");
      return;
    }

    setGenerating(true);
    try {
      const prompt = `Generate 3 unique and innovative ${formData.projectType} project ideas for final year engineering students. 
      Each idea should include: 
      1. Project Title
      2. One-sentence description
      3. Key technologies involved
      
      Format each idea as: "Title - Description (Technologies: ...)"
      Context provided: ${formData.message || "General project ideas"}`;

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY
          }
        }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const lines = text.split(/\n/).filter(line => line.trim().length > 10);
      const ideas = lines.slice(0, 3).map(line => ({
        text: line.replace(/^[-*•0-9.]+/, "").trim(),
        favorite: false
      }));

      if (ideas.length === 0) {
        setAiIdeas([{ text: "No ideas generated. Please try again with more specific details.", favorite: false }]);
      } else {
        setAiIdeas(ideas);
      }
    } catch (err) {
      console.error("AI generation error:", err);
      setAiIdeas([{
        text: "AI service is currently busy. Please try again in a moment.",
        favorite: false
      }]);
    } finally {
      setGenerating(false);
    }
  };

  const toggleFavorite = (index) => {
    const updatedIdeas = [...aiIdeas];
    updatedIdeas[index].favorite = !updatedIdeas[index].favorite;
    setAiIdeas(updatedIdeas);
    setFavorites(updatedIdeas.filter(idea => idea.favorite));
  };

  const toggleStep = async (userId, projectId, step) => {
    if (!isAdmin) return;

    try {
      const currentSteps = allProjects[userId]?.[projectId]?.steps ||
        submittedProjects[projectId]?.steps ||
        { step1: false, step2: false, step3: false };

      const updatedSteps = { ...currentSteps };

      // Toggle logic
      if (step === "step1") {
        updatedSteps.step1 = !updatedSteps.step1;
      } else if (step === "step2") {
        updatedSteps.step2 = !updatedSteps.step2;
        if (updatedSteps.step2) updatedSteps.step1 = true;
      } else if (step === "step3") {
        updatedSteps.step3 = !updatedSteps.step3;
        if (updatedSteps.step3) {
          updatedSteps.step1 = true;
          updatedSteps.step2 = true;
        }
      }

      await set(ref(database, `project_enquiries/${userId}/${projectId}/steps`), updatedSteps);
    } catch (error) {
      console.error("Error updating step:", error);
      alert("Failed to update project status.");
    }
  };

  // ------------------ RENDER CARD ------------------
  const renderProjects = (projectsData, userKey = null) => {
    const projects = Object.entries(projectsData)
      .filter(([_, proj]) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          proj.projectType?.toLowerCase().includes(query) ||
          proj.name?.toLowerCase().includes(query) ||
          proj.message?.toLowerCase().includes(query) ||
          proj.email?.toLowerCase().includes(query)
        );
      })
      .sort(([, a], [, b]) => b.timestamp - a.timestamp);

    if (projects.length === 0) {
      return (
        <div className="empty-state">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
            alt="No projects found"
            width="80"
            height="80"
          />
          <p>No projects match your search criteria.</p>
        </div>
      );
    }

    return projects.map(([projId, proj]) => {
      const completedCount = Object.values(proj.steps || {}).filter(Boolean).length;
      const progressPercent = (completedCount / 3) * 100;

      return (
        <motion.div
          key={projId}
          className="project-card-modern"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <div className="card-header">
            <span className="badge-type">{proj.projectType || "Uncategorized"}</span>
            <span className="card-date">
              {new Date(proj.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          <h3 className="card-title">
            {proj.message ?
              (proj.message.length > 40 ? `${proj.message.substring(0, 40)}...` : proj.message)
              : "Untitled Project"}
          </h3>
          <p className="card-user">
            <span className="user-info">👤 {proj.name || "Anonymous"}</span>
            <span className="separator">•</span>
            <span className="phone-info">📞 {proj.mobile || "Not provided"}</span>
          </p>

          <div className="stepper-wrapper">
            <div className="stepper-track">
              <div
                className="stepper-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="stepper-nodes">
              {["step1", "step2", "step3"].map((step, idx) => (
                <div
                  key={step}
                  className={`node ${proj.steps?.[step] ? "completed" : ""} ${isAdmin ? "clickable" : ""}`}
                  onClick={() => isAdmin && toggleStep(userKey || auth.currentUser?.uid, projId, step)}
                  title={isAdmin ? "Click to toggle status" : `Step ${idx + 1}`}
                >
                  {proj.steps?.[step] ? <FaCheckCircle /> : idx + 1}
                  <span className="node-label">
                    {idx === 0 ? "Received" : idx === 1 ? "In Review" : "Approved"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="enquiry-page-wrapper">
      {/* HERO SECTION */}
      <section className="enquiry-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Build Your <span className="highlight-text">Dream Project</span></h1>
          <p>Get expert guidance for Fullstack, AI, & IoT projects. Track progress in real-time.</p>
        </motion.div>
      </section>

      <div className="enquiry-container">

        {/* LEFT: FORM & AI */}
        <div className="enquiry-left">

          {/* Project Types Selection */}
          <div className="type-grid">
            {projectTypes.map((type) => (
              <motion.div
                key={type.title}
                className={`type-card ${formData.projectType === type.title ? "active" : ""}`}
                onClick={() => setFormData({ ...formData, projectType: type.title })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="type-icon" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <div className="type-info">
                  <h4>{type.title}</h4>
                  <span>{type.desc}</span>
                </div>
                {formData.projectType === type.title && (
                  <FaCheckCircle className="check-icon" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="form-header">
              <h3>Start Your Project Journey</h3>
              {ideaSuggestion && (
                <motion.span
                  className="suggestion-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {ideaSuggestion}
                </motion.span>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit mobile number starting with 6-9"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Selected Type</label>
                  <input
                    type="text"
                    value={formData.projectType || "Select from above"}
                    disabled
                    className="disabled-input"
                  />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Project Details / Interest</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project idea, requirements, or challenges you're facing..."
                  rows="4"
                ></textarea>
              </div>

              {/* AI Generator Section */}
              <AnimatePresence>
                {formData.projectType && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ai-section"
                  >
                    <div className="ai-header">
                      <FaMagic className="magic-icon" />
                      <span>Need Inspiration? Let AI Help</span>
                    </div>
                    <button
                      type="button"
                      onClick={generateAiIdeas}
                      className="ai-btn"
                      disabled={generating}
                    >
                      {generating ? (
                        <>
                          <FaSpinner className="spin" />
                          Generating Ideas...
                        </>
                      ) : (
                        "Generate Project Ideas"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Results */}
              <AnimatePresence>
                {aiIdeas.length > 0 && (
                  <motion.div
                    className="ai-results-box"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="ai-results-header">
                      <span>AI Generated Ideas</span>
                      {favorites.length > 0 && (
                        <span className="favorites-count">
                          {favorites.length} favorited
                        </span>
                      )}
                    </div>
                    {aiIdeas.map((idea, i) => (
                      <div
                        key={i}
                        className={`ai-result-row ${idea.favorite ? "fav" : ""}`}
                        onClick={() => toggleFavorite(i)}
                        title="Click to favorite"
                      >
                        <FaStar className="star-icon" />
                        <span className="idea-text">{idea.text}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Project Enquiry
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    className="success-banner"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FaCheckCircle />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* RIGHT: DASHBOARD (Projects) */}
        <div className="enquiry-right">
          <div className="dashboard-header">
            <h2>{isAdmin ? "Admin Dashboard" : "My Project Applications"}</h2>
            <div className="search-wrap">
              <FaSearch />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="projects-feed">
            <AnimatePresence mode="wait">
              {isAdmin ? (
                Object.keys(allProjects).length === 0 ? (
                  <motion.div
                    key="admin-empty"
                    className="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                      alt="No enquiries"
                      width="80"
                      height="80"
                    />
                    <p>No project enquiries submitted yet.</p>
                  </motion.div>
                ) : (
                  Object.entries(allProjects).map(([uid, projs]) =>
                    renderProjects(projs, uid)
                  )
                )
              ) : (
                Object.keys(submittedProjects).length === 0 ? (
                  <motion.div
                    key="user-empty"
                    className="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                      alt="No projects"
                      width="80"
                      height="80"
                    />
                    <p>You haven't submitted any projects yet.</p>
                    <p className="empty-hint">Start by filling out the form on the left!</p>
                  </motion.div>
                ) : (
                  renderProjects(submittedProjects)
                )
              )}
            </AnimatePresence>
          </div>

          <div className="reviews-section-wrapper">
            <ProjectReviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEnquiry;