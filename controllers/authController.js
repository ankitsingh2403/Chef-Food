const twilio = require("twilio");
const generateOTP = require('../utils/generateOTP');
const Profile = require("../models/profile");

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// Send OTP
exports.sendOtp = async (req, res) => {
  let { phone } = req.body;
  phone = String(phone).trim();

  const otp = generateOTP();

  // Save OTP in session
  req.session.otp = otp;
  req.session.phone = phone;

  console.log("Sending OTP to phone:", phone);
  console.log("OTP stored in session:", otp);
  console.log("Session:", req.session);
  console.log('Session ID during sendOTP:', req.sessionID);


  try {
    await client.messages.create({
      body: `Your OTP for Chef Food is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone.startsWith("+") ? phone : `+91${phone}`,
    });

    res.status(200).json({ message: "OTP Sent Successfully" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  console.log("Verifying OTP")
  const { otp } = req.body;

  console.log("Session in verify:", req.session);
  console.log("Session OTP:", req.session.otp);
  console.log("User Entered OTP:", otp);
  console.log('Session ID during verifyOTP:', req.sessionID);


  if (otp === req.session.otp) {
    try {
      const phone = req.session.phone;

      let user = await Profile.findOne({ phone });

      if (!user) {
        user = await Profile.create({
          name: "Guest User",
          email: `${phone}@example.com`,
          phone,
          password: "OTP_LOGIN",
        });
      }

      req.session.user = { _id: user._id };
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
