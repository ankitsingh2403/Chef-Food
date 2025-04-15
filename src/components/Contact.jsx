import React, { useState } from "react";
import { FaPhone, FaHeadset, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  // 👇 Manage form input state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 👇 Form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });

      const data = await res.json(); 

      if (res.ok) {
        toast.success("Message Sent Successfully");
        // Clear form
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error(data.message || "Message failed to send");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-page">
    
      <div className="contact-banner">
        <div className="contact-text">
          <h1>Get in touch with Chef Food</h1>
          <p>Have a question or feedback? Reach out to us!</p>
        </div>
        <img
          src="/src/assets/contact pic.jpg"
          alt="Food Order Support"
          className="contact-image"
        />
      </div>

      
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          ></textarea>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
