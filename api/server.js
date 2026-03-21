// ===============================
// DNS FIX (Node v20+)
// ===============================
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ===============================
// Imports
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Models (Ensure these paths are correct relative to api/server.js)
const User = require("./models/User");
const Reservation = require("./models/Reservation");

const app = express();

// ===============================
// CORS CONFIG
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-project-two-lyart.vercel.app", // ✅ Add this one
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(cookieParser());

// ===============================
// DATABASE CONNECTION (Serverless Optimized)
// ===============================
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env file");
}

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

// ===============================
// ROUTES
// ===============================

// TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({
    message: "✅ Backend is working!",
    env: process.env.NODE_ENV || "development",
  });
});

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

// VERIFY TOKEN MIDDLEWARE
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  await connectDB();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, message: "Registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  await connectDB();
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
// CREATE RESERVATION (Add this to your server.js)
app.post("/api/reservations", verifyToken, async (req, res) => {
  await connectDB(); // Ensure DB is connected for serverless
  try {
    const {
      listingId,
      listingName,
      checkIn,
      totalPrice,
      guestName,
      guestEmail,
    } = req.body;

    const newReservation = new Reservation({
      user: req.userId, // From verifyToken middleware
      listingId,
      listingName,
      checkIn,
      totalPrice,
      guestName,
      guestEmail,
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation confirmed!",
      reservation: newReservation,
    });
  } catch (err) {
    console.error("Reservation Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save reservation" });
  }
});

// ===============================
// LOCAL SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

// This ensures it runs locally but doesn't interfere with Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
    connectDB(); // Pre-connect locally
  });
}

// ===============================
// EXPORT FOR VERCEL
// ===============================
module.exports = app;
