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

// Models
const User = require("./models/User");
const Reservation = require("./models/Reservation");

const app = express();

// ===============================
// CORS CONFIG (PRODUCTION SAFE)
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "https://fitwi-booking-5tx5r6y20-fitwis-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
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

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_SUPER_SECRET_KEY";

// ===============================
// VERIFY TOKEN MIDDLEWARE
// ===============================
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// ===============================
// REGISTER
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// LOGIN
// ===============================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // REQUIRED on Vercel (HTTPS)
      sameSite: "none", // REQUIRED for cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ===============================
// CREATE RESERVATION
// ===============================
app.post("/api/reservations", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const newReservation = new Reservation({
      listingId: req.body.listingId,
      listingName: req.body.listingName,
      checkIn: req.body.checkIn,
      totalPrice: req.body.totalPrice,
      userId: user._id,
      guestName: user.name,
      guestEmail: user.email,
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation confirmed!",
      data: newReservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// DATABASE + SERVER
// ===============================
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });
