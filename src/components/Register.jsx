import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Registration Successful")
        //clear form
        setName("");
        setEmail("");
        setPhone("");
      } else {
        toast.error(data.message || "Registration failed");
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

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

        <button className="signup-btn"onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
