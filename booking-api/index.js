// booking-api/api/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Models
const User = require("../models/User");
const Reservation = require("../models/Reservation");

// Utils
const { connectDB } = require("../utils/db");

const app = express();

// ===============================
// Middleware
// ===============================
const allowedOrigins = [
  "https://your-frontend.vercel.app", // production frontend
  "http://localhost:5173", // local Vite dev
  /\.vercel\.app$/, // allow any Vercel preview deployment
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests
      const isAllowed = allowedOrigins.some((pattern) =>
        typeof pattern === "string" ? pattern === origin : pattern.test(origin),
      );
      if (isAllowed) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// ===============================
// Database connection
// ===============================
let isConnected = false;
async function ensureDbConnection() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

// ===============================
// Health check
// ===============================
app.get("/api/test", async (req, res) => {
  res.json({ message: "Backend Live", timestamp: new Date().toISOString() });
});

// ===============================
// Auth routes
// ===============================
app.post("/api/auth/login", async (req, res) => {
  console.log("Login called with", req.body); // Debug log
  await ensureDbConnection();

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

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
});

app.post("/api/auth/register", async (req, res) => {
  console.log("Register called with", req.body); // Debug log
  await ensureDbConnection();

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  if (password.length < 6)
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 6 characters",
      });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "SUPER_SECRET_KEY",
    { expiresIn: "7d" },
  );

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

// ===============================
// Reservations
// ===============================
app.post("/api/reservations", async (req, res) => {
  console.log("Reservation called with", req.body); // Debug log
  await ensureDbConnection();

  try {
    const newRes = new Reservation(req.body);
    await newRes.save();
    res.status(201).json({ success: true, message: "Saved!" });
  } catch (err) {
    console.error("Reservation error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save reservation" });
  }
});

// ===============================
// 404 handler
// ===============================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ===============================
// Export for Vercel
// ===============================
module.exports = app;
