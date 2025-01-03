import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-intro">
        <h1>📞 Contact Us</h1>
        <p>
          We value your feedback and are here to assist you! If you have any questions, suggestions, or concerns about VTU Notes, don’t hesitate to get in touch. Our team is committed to helping you with all your academic needs.
        </p>
      </section>

      <section className="contact-details">
        <h2>📧 Get in Touch</h2>
        <p>
          Reach out to us via email, phone, or through our WhatsApp groups. We’ll respond to your queries promptly and ensure you have the support you need.
        </p>
        <div className="contact-box">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a></p>
          <p>Phone: <a href="tel:+916364060716" className="contact-link">+91 6364060716</a></p>
          <p>
            <strong>WhatsApp Groups:</strong>
            <ul>
              <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer">Join Group 1</a></li>
              <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer">Join Group 2</a></li>
            </ul>
          </p>
        </div>
      </section>

      <section className="follow-us">
        <h2>📲 Follow Us</h2>
        <p>Stay updated on the latest features, updates, and announcements from VTU Notes. Connect with us on our social platforms:</p>
        <ul className="social-links">
          <li>
            <a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp Group 1
            </a>
          </li>
          <li>
            <a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp Group 2
            </a>
          </li>
        </ul>
      </section>

      <section className="location">
        <h2>📍 Location</h2>
        <p>Our main office is situated at:</p>
        <address>
          <strong>VTU Notes For All</strong><br />
          The BVSS Maratha Students Home<br />
          Bangalore, Karnataka, India 560004
        </address>
        <p>We look forward to connecting with you and supporting your academic journey!</p>
      </section>
    </div>
  );
}

export default Contact;
