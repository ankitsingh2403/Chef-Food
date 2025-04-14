import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/profile", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.setItem("isLoggedIn", "false");
          navigate("/login");
        }
      } catch (err) {
        toast.error("Error loading profile");
        navigate("/login");
      }
    };

    // Only call if logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <h1 className="profile-heading">Welcome to Chef Food 🍽️</h1>
      <p className="profile-tagline">
        Get ready to order your favorite meals and enjoy a delightful experience! 🍕🍜🍔
      </p>

      <div className="profile-wrapper">
        <div className="profile-avatar-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1049/1049166.png"
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <div className="profile-avatar-name">{user?.name}</div>
        </div>

        <div className="profile-details-card">
          <h3 className="profile-details-title">Your Info</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      <button className="profile-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
