// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

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

// Create Express app
const app = express();

// ===============================
// COMPLETE CORS CONFIGURATION - FIXED
// ===============================
const allowedOrigins = [
  "https://foto-booking-pypfj9mpg-fitwis-projects.vercel.app",
  "https://foto-booking-cjrix51i6-fitwis-projects.vercel.app",
  "https://foto-booking-n7lerfeuz-fitwis-projects.vercel.app",
  "https://booking-af49z6nf2-fitwis-projects.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
  /\.vercel\.app$/, // Allows any Vercel preview deployment
];

// CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      const isAllowed = allowedOrigins.some((pattern) => {
        if (typeof pattern === "string") {
          return pattern === origin;
        } else if (pattern instanceof RegExp) {
          return pattern.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        console.log("✅ Allowed origin:", origin);
        callback(null, true);
      } else {
        console.log("❌ Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Set-Cookie", "Authorization"],
  }),
);

// Handle preflight requests explicitly
app.options("*", (req, res) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  const isAllowed = allowedOrigins.some((pattern) => {
    if (typeof pattern === "string") {
      return pattern === origin;
    } else if (pattern instanceof RegExp) {
      return pattern.test(origin);
    }
    return false;
  });

  if (isAllowed && origin) {
    res.header("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    res.header("Access-Control-Allow-Origin", "*");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie, X-Requested-With, Accept",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400"); // 24 hours cache for preflight
  res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());

// ===============================
// DATABASE CONNECTION
// ===============================
let isConnected = false;
async function ensureDbConnection() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

// ===============================
// HEALTH CHECK ENDPOINTS
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "Booking API is running",
    status: "active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      test: "/api/test",
      login: "/api/auth/login",
      register: "/api/auth/register",
      reservations: "/api/reservations",
    },
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend Live",
    timestamp: new Date().toISOString(),
    cors: "Enabled",
  });
});

// ===============================
// AUTH ROUTES
// ===============================
// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  await ensureDbConnection();

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY",
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  await ensureDbConnection();

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create token for auto-login after registration
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SUPER_SECRET_KEY",
      { expiresIn: "7d" },
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// ===============================
// RESERVATIONS ENDPOINT
// ===============================
app.post("/api/reservations", async (req, res) => {
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
// 404 HANDLER
// ===============================
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested endpoint does not exist",
    availableEndpoints: {
      root: "/",
      test: "/api/test",
      login: "/api/auth/login",
      register: "/api/auth/register",
      reservations: "/api/reservations",
    },
  });
});

// ===============================
// ERROR HANDLING MIDDLEWARE
// ===============================
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// EXPORT FOR VERCEL
// ===============================
module.exports = app;
