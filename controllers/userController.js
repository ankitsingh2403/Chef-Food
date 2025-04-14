const Profile = require("../models/profile");

exports.getProfile = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await Profile.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error in profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Logout logic
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};
