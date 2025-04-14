const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// --- Step 1: Cookie Parser (before sessions)
app.use(cookieParser());

// --- Step 2: CORS (must match frontend + include credentials)
app.use(cors({
  origin: process.env.FRONTEND_URL, // e.g., http://localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// --- Step 3: Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,  // Important to avoid empty sessions
  cookie: {
    secure: false,            // Set true if using HTTPS
    httpOnly: true,
    sameSite: "lax",          // "lax" or "none" if on cross-origin and using HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}));

// --- Step 4: Body Parser (after session)
app.use(express.json());

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

// Error middleware
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

// DB connect and start server
const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
