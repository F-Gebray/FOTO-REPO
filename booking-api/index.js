const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// ===============================
// CORS Configuration - UPDATED
// ===============================
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all Vercel deployments and localhost
      if (
        !origin ||
        origin.includes(".vercel.app") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
  }),
);

// Handle preflight requests explicitly
app.options("/*path", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).json({ message: "OK" });
});

app.use(express.json());
app.use(cookieParser());

// ===============================
// Routes
// ===============================
app.use("/api/auth", require("./routes/auth"));

app.get("/api/test", (req, res) => res.json({ message: "Backend Live" }));

app.get("/", (req, res) => {
  res.json({
    message: "Booking API is running",
    status: "active",
    endpoints: {
      test: "/api/test",
      login: "/api/auth/login",
      register: "/api/auth/register",
    },
  });
});

// 404 handler
app.use("/*path", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
