const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // Critical for MongoDB on Vercel

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Models
const User = require("./models/User");
const Reservation = require("./models/Reservation");
const { connectDB } = require("./utils/db");

const app = express();

// ===============================
// DYNAMIC CORS CONFIGURATION - FIXED
// ===============================
const corsOptions = {
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    // 2. Dynamic check: Allow any Vercel deployment or Localhost
    const isVercel = origin.endsWith(".vercel.app");
    const isLocal =
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://127.0.0.1");

    if (isVercel || isLocal) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Cookie",
  ],
  exposedHeaders: ["Set-Cookie", "Authorization"],
};

// Apply CORS first before any other middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ===============================
// DATABASE CONNECTION HELPER
// ===============================
let isConnected = false;
async function ensureDbConnection() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

// ===============================
// ROUTES
// ===============================

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "Booking API is active",
    timestamp: new Date().toISOString(),
    cors: "Dynamic Vercel Enabled",
  });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  await ensureDbConnection();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY",
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register
app.post("/api/auth/register", async (req, res) => {
  await ensureDbConnection();
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY",
      { expiresIn: "7d" },
    );

    res
      .status(201)
      .json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration error" });
  }
});

// Reservations
app.post("/api/reservations", async (req, res) => {
  await ensureDbConnection();
  try {
    const newRes = new Reservation(req.body);
    await newRes.save();
    res.status(201).json({ success: true, message: "Reservation saved!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to save reservation" });
  }
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export for Vercel
module.exports = app;
