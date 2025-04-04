import React from "react";
import { FaPhone, FaHeadset, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Banner Section */}
      <div className="contact-banner">
        <div className="contact-text">
          <h1>Get in touch with Chef Food</h1>
          <p>Have a question or feedback? Reach out to us!</p>
        </div>
        <img
          src="\src\assets\contact pic.jpg" 
          alt="Food Order Support"
          className="contact-image"
        />
      </div>

      {/* Contact Options */}
      <div className="contact-options">
        <div className="contact-card">
          <FaPhone className="contact-icon" />
          <h3>Talk to Sales</h3>
          <p>Interested in our service? Call our sales team.</p>
          <span className="contact-number">+91 9601675408</span>
        </div>
        
        <div className="contact-card">
          <FaHeadset className="contact-icon" />
          <h3>Customer Support</h3>
          <p>Need help? Our support team is here for you.</p>
          <span className="contact-number">support@cheffood.com</span>
        </div>

        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email Us</h3>
          <p>Have any inquiries? Drop us an email.</p>
          <span className="contact-number">contact@cheffood.com</span>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="contact-form">
        <h2>Send Us an Enquiry</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Your Phone" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
