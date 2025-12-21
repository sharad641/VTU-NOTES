import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
  FaCommentAlt,
  FaCheckCircle
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    try {
      await push(ref(database, "contacts"), {
        ...formData,
        timestamp: new Date().toISOString(),
      });

      setStatus({
        type: "success",
        msg: "Message sent! We'll reply shortly.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: "", msg: "" }), 5000);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">

        {/* LEFT: INFO CARD */}
        <div className="contact-info-card">
          <div className="info-content">
            <h2>Let's Chat</h2>
            <p>
              Whether you have a question about notes, projects,
              or just want to say hi, our inbox is open.
            </p>

            <div className="info-item">
              <div className="icon-circle">
                <FaEnvelope />
              </div>
              <div>
                <span>Email Us</span>
                <a href="mailto:vtunotesforall@gmail.com">
                  vtunotesforall@gmail.com
                </a>
              </div>
            </div>

            <div className="social-section">
              <h4>Join our Communities</h4>
              <div className="wa-groups">
                <a
                  href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG"
                  target="_blank"
                  rel="noreferrer"
                  className="wa-btn"
                >
                  <FaWhatsapp /> Group 1
                </a>

                <a
                  href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t"
                  target="_blank"
                  rel="noreferrer"
                  className="wa-btn"
                >
                  <FaWhatsapp /> Group 2
                </a>
              </div>
            </div>
          </div>

          <div className="circle c1"></div>
          <div className="circle c2"></div>
        </div>

        {/* RIGHT: FORM */}
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="modern-form">
            <h3>Send a Message</h3>

            {/* NAME */}
            <div className="input-group">
             
              <input
                type="text"
                name="name"
                className="contact-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                aria-label="Your Name"
              />
            </div>

            {/* EMAIL */}
            <div className="input-group">
             
              <input
                type="email"
                name="email"
                className="contact-input"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                aria-label="Your Email"
              />
            </div>

            {/* MESSAGE */}
            <div className="input-group">
              
              <textarea
                name="message"
                className="contact-input"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleInputChange}
                aria-label="Message"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>

            {/* STATUS */}
            {status.msg && (
              <div className={`status-msg ${status.type}`}>
                {status.type === "success" && <FaCheckCircle />}
                {status.msg}
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
