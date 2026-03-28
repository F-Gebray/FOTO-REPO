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

const app = express();

// ===============================
// SIMPLIFIED CORS (Monorepo Friendly)
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Allow if there's no origin (like a mobile app or server-to-server)
      // 2. Allow any .vercel.app domain (all your monorepo apps)
      // 3. Allow localhost (for your VS Code testing)
      if (
        !origin ||
        origin.includes(".vercel.app") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS Blocked: Origin not recognized"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// ===============================
// DATABASE
// ===============================
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is missing in Vercel Settings");
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

// ===============================
// ROUTES
// ===============================
app.get("/api/test", (req, res) => res.json({ message: "Backend Live" }));

app.post("/auth/login", async (req, res) => {
  await connectDB();
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "key", {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/reservations", async (req, res) => {
  await connectDB();
  try {
    const newRes = new Reservation(req.body);
    await newRes.save();
    res.status(201).json({ success: true, message: "Saved!" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ===============================
// EXPORT FOR VERCEL
// ===============================
module.exports = app;
