import React, { useState } from "react";
import "./Contact.css";
import { database } from "../firebase";
import { ref, push } from "firebase/database";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitStatus("Please enter a valid email address.");
      return;
    }

    try {
      const contactRef = ref(database, "contacts"); // Firebase path
      await push(contactRef, {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });

      setSubmitStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting message:", error);
      setSubmitStatus("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      {/* Introduction */}
      <section className="contact-intro">
        <h1>📞 Contact Us</h1>
        <p>
          Have questions or feedback? We're here to help! Reach out to us and
          let us know how we can assist you with your academic needs.
        </p>
      </section>

      {/* Contact Details */}
      <section className="contact-details">
        <h2>📧 Get in Touch</h2>
        <p>Reach us through the form or contact details below:</p>

        <div className="contact-box">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              Email:{" "}
              <a href="mailto:vtunotesforall@gmail.com" className="contact-link">
                vtunotesforall@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+916364060716" className="contact-link">
                +91 6364060716
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>📨 Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message"
                rows="4"
                required
              ></textarea>

              <button type="submit" className="button modern-button">
                Send Message
              </button>
            </form>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="follow-us">
        <h2>📲 Follow Us</h2>
        <ul className="social-links">
          <li>
            <a
              href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Group 1
            </a>
          </li>
          <li>
            <a
              href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Group 2
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/sharad-patil-691902259"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </li>
        </ul>
      </section>

    </div>
  );
};

export default Contact;
