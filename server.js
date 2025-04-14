const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax", // for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Route imports
const registerRoutes = require("./routes/register");
const enquiryRoutes = require("./routes/enquiry");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/address");
const paymentRoutes = require("./routes/paymentRoutes");

// Mount routes
app.use("/api", registerRoutes);
app.use("/api", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);

// Error handler middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// Database connection and server start
const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
