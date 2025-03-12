import React, { useState } from "react";
import "./Contact.css"; // Ensure your CSS file contains the styles for this component

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
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

    // Mock submission (replace with actual backend logic if needed)
    setTimeout(() => {
      setSubmitStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Introduction Section */}
      <section className="contact-intro">
        <h1>📞 Contact Us</h1>
        <p>
          Have questions or feedback? We're here to help! Reach out to us and
          let us know how we can assist you with your academic needs. Our team
          is dedicated to providing prompt and efficient support.
        </p>
      </section>

      {/* Contact Details Section */}
      <section className="contact-details">
        <h2>📧 Get in Touch</h2>
        <p>
          Whether you have questions about VTU Notes, need technical assistance,
          or want to share suggestions, here’s how you can reach us:
        </p>
        <div className="contact-box">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a>
            </p>
            <p>
              Phone: <a href="tel:+916364060716" className="contact-link">+91 6364060716</a>
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

      {/* Follow Us Section */}
      <section className="follow-us">
        <h2>📲 Follow Us</h2>
        <p>
          Stay connected for the latest updates, features, and announcements
          from VTU Notes:
        </p>
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

      {/* Location Section */}
      <section className="location">
        <h2>📍 Location</h2>
        <p>Visit :</p>
        <address>
          <strong>VTU Notes For All</strong>
          <br />
          The BVSS Maratha Student's Home
          <br />
          Bangalore, Karnataka, India 560004
        </address>
        <div className="map-container">
  <iframe
    title="VTU Notes Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.4737339797737!2d77.56726457559377!3d12.972442920601234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670a1ba5f13%3A0xa34840a276f8e04e!2sBVSS%20Maratha%20Students%20Home!5e0!3m2!1sen!2sin!4v1619156345797!5m2!1sen!2sin"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

        <p>We look forward to connecting with you!</p>
      </section>
    </div>
  );
};

export default Contact;
