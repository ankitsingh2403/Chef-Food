import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-subtitle">
          To place your order now, log in to your existing account or sign up
        </p>
        <p className="signup-subtitle">
          Or <Link to="/login" className="signup-link">Login To Existing Account</Link>
        </p>

        <div className="signup-form">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
          <input
            type="text"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </div>

        <button className="signup-btn">Register</button>
      </div>
    </div>
  );
};

export default Register;
