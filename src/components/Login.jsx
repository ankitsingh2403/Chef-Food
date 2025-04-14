import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // This effect will run only once when the page is first loaded
  useEffect(() => {
    // Check the login state only once during page load
    const loginState = localStorage.getItem("isLoggedIn");
    if (loginState === "true") {
      setIsLoggedIn(true);
      navigate("/profile"); // Redirect to profile page if logged in
    }
  }, [navigate]);

  // Send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    if (!phone) return toast.error("Enter your phone number!");

    try {
      const res = await fetch("http://localhost:4000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, { autoClose: 3000 });
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  // Verify OTP and Login
  const loginWithOTP = async (e) => {
    e.preventDefault();
    if (!userOtp) return toast.error("Enter the OTP!");

    try {
      const res = await fetch("http://localhost:4000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: userOtp }),
        credentials: "include", // Include session cookies
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { autoClose: 3000 });
        localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
        setIsLoggedIn(true);
        navigate("/profile"); // Navigate to profile page after successful login
      } else {
        toast.error(data.message || "Invalid OTP");
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      toast.info(data.message, { autoClose: 3000 });
      setIsLoggedIn(false);
      setPhone("");
      setUserOtp("");
      localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box animated-box">
        <h2 className="login-title">{isLoggedIn ? "Welcome!" : "Sign In"}</h2>

        {!isLoggedIn ? (
          <>
            <p className="login-subtitle">
              OR <Link to="/register" className="login-link">Create an Account</Link>
            </p>
            <p className="login-welcome">
              Welcome to <span className="brand">Chef Food</span>
            </p>
            <p className="login-description">Please Login to Continue</p>

            <form className="login-form">
              <input
                type="text"
                placeholder="Enter your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field animated-input"
              />
              <button className="btn orange-btn" onClick={sendOTP}>Send OTP</button>

              <input
                type="text"
                placeholder="Enter Your OTP"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
                className="input-field animated-input"
              />
              <button className="btn blue-btn" onClick={loginWithOTP}>Login</button>
            </form>
          </>
        ) : (
          <>
            <p className="login-welcome">You are logged in!</p>
            <button className="btn green-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
