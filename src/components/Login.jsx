import { useState } from "react";
import { Link } from "react-router-dom";



const Login = () => {
  const [phone, setPhone] = useState("");
  const [userOtp, setUserOtp] = useState("");

  return (
    <div className="login-container">
      <div className="login-box animated-box">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">
          OR <Link to="/register" className="login-link">Create an Account</Link>
        </p>

        <p className="login-welcome">
          Welcome to <span className="brand">Chef Food</span>
        </p>
        <p className="login-description">Please Login to Continue</p>

        <div className="login-form">
          <input
            type="text"
            placeholder="Enter your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field animated-input"
          />
          <button className="btn orange-btn">Send OTP</button>

          <input
            type="text"
            placeholder="Enter Your OTP"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            className="input-field animated-input"
          />
          <button className="btn green-btn">Verify OTP</button>

          <button className="btn blue-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
