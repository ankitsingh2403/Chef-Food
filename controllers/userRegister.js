const UserRegister = require("../models/user");
const Profile = require("../models/profile"); // ✅ Import Profile model
const nodemailer = require("nodemailer");

exports.Registration = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      return next(new Error("Please Fill Full form", 400));
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      return next(new Error("Invalid Email Format", 400));
    }

    if (!phoneRegex.test(phone)) {
      return next(new Error("Invalid Phone Number", 400));
    }

    const existingUser = await UserRegister.findOne({ phone });
    if (existingUser) {
      return next(new Error("User Already Registered", 400));
    }

    //  Step 1: Create user in UserRegister
    const response = await UserRegister.create({ name, phone, email });

    //  Step 2: Also create user in Profile
    await Profile.create({ name, phone, email });

    //  Step 3: Send welcome email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Chef Food 🍽️" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to Chef Food – Registration Successful!",
      html: `
          <h2>Hi ${name},</h2>
          <p>Welcome to <strong>Chef Food</strong>! 🎊</p>
          <p>Your registration was successful, and you're now ready to dive into a world of delicious food from your favorite restaurants, all in one place.</p>
          <p>Start exploring our menu, add your favorite dishes to the cart, and enjoy seamless ordering at your fingertips.</p>
          <hr/>
          <p><em>We’re excited to have you onboard. If you ever need support or want to share feedback, just hit reply!</em></p>
          <p>Bon Appétit! 😋</p>
          <br/>
          <p>Warm regards,<br/><strong>The Chef Food Team</strong></p>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: true,
      data: response,
      message: "User Registered Successfully and confirmation email delivered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Server error",
      message: error.message,
    });
  }
};
