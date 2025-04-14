const twilio = require("twilio");
const generateOTP = require('../utils/generateOTP');
const Profile = require("../models/profile"); // Import Profile model

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// Send OTP
exports.sendOtp = async (req, res) => {
  let { phone } = req.body;
  phone = String(phone).trim();

  const otp = generateOTP();

  req.session.otp = otp;
  req.session.phone = phone;

  console.log("Sending OTP to phone:", phone);

  try {
    await client.messages.create({
      body: `Your OTP for Chef Food is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone.startsWith("+") ? phone : `+91${phone}`, // Assuming India format
    });

    res.status(200).json({ message: "OTP Sent Successfully" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;

  console.log("Session OTP:", req.session.otp);
  console.log("User Entered OTP:", otp);

  if (otp === req.session.otp) {
    try {
      const phone = req.session.phone;

      // Find user by phone
      let user = await Profile.findOne({ phone });

      if (!user) {
        // Optionally, auto-create a user if not exists (you can skip this if you don't want this behavior)
        user = await Profile.create({
          name: "Guest User", // placeholder or change logic if needed
          email: `${phone}@example.com`, // placeholder or collect during signup
          phone,
          password: "OTP_LOGIN", // placeholder if passwordless
        });
      }

      req.session.user = { _id: user._id }; // Enable session-based tracking
      req.session.isLoggedIn = true;

      res.status(200).json({ message: "OTP Verified Successfully" });
    } catch (err) {
      console.error("OTP verification error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
