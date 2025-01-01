import React from 'react';

function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We value your feedback! If you have any questions, suggestions, or concerns regarding VTU-NOTES, please feel free to reach out to us. Our team is always ready to assist you with any queries you may have.</p>
      
      <h2>Get in Touch</h2>
      <p>You can contact us through the form below, and we will get back to you as soon as possible.</p>
      
      
      {/* Contact Box */}
      <section className="contact-box">
        <h2>Contact</h2>
        <p>If you have questions or need assistance with notes, please reach out to us. We’re here to help!</p>
        <p>Email: <a href="mailto:vtunotesforall@gmail.com" className="contact-link">vtunotesforall@gmail.com</a></p>
        <p>Phone: <a href="tel:+916364060716" className="contact-link">+91 6364060716</a></p>
        <ul className="follow-us-list1">
          <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 1</a></li>
          <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 2</a></li>
        </ul>
      </section>
      
      <h2>Follow Us</h2>
      <p>Stay updated on new features, updates, and important announcements:</p>
      <ul className="follow-us-list1">
          <li><a href="https://chat.whatsapp.com/GV4LJ4FE4I1KvCyM6DTbsG" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 1</a></li>
          <li><a href="https://chat.whatsapp.com/IK3T3NpNZNWG9SY3ai1h8t" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i> Whatsapp group 2</a></li>
        </ul>

      <h2>Location</h2>
      <p>Our main office is located at:</p>
      <address>
        VTU NOTES FOR ALL<br />
        The BVSS Maratha Students Home<br />
        Bangalore, Karnataka, India 560004
      </address>
    </div>
  );
}

export default Contact;
