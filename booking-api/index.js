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

// Create Express app BEFORE using it
const app = express();

// ===============================
// SIMPLIFIED CORS (Monorepo Friendly)
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
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

// ← Add this line right after
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

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
app.use("/api/auth", require("./routes/auth"));

app.get("/api/test", (req, res) => res.json({ message: "Backend Live" }));

app.post("/api/reservations", async (req, res) => {
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
