const Message = require("../models/message");
const nodemailer = require("nodemailer");

exports.Messages = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return next(new Error("Please fill out the full enquiry form", 400));
    }

    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      return next(new Error("Invalid Email Format", 400));
    }

    if (!phoneRegex.test(phone)) {
      return next(new Error("Invalid Phone Number", 400));
    }

    const response = await Message.create({ name, phone, email, message });

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Chef Food" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Thanks for your Enquiry – Chef Food",
      html: `
        <h3>Hello ${name},</h3>
        <p>Your Enquiry was --> ${message} <-- and  we had Received it. </p>
        <p>Thanks for reaching out to <strong>Chef Food</strong>! We’ve received your enquiry and our team is looking into it.</p>
        <p>We value your feedback! If you’d like to share your experience visiting our site, feel free to reply to this email.</p>
        <br/>
        <p>Cheers,<br/>Chef Food Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      data: response,
      message: "Message sent successfully and confirmation email delivered.",
    });
  } catch (err) {
    console.log("Error in enquiry:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
