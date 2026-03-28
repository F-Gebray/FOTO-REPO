const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Monorepo-friendly CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.includes(".vercel.app") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS Blocked"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

const MY_EMAIL = process.env.EMAIL_USER;

// Matches your vercel.json rewrite: /landing-api/(.*)
app.post("/landing-api/send-email", async (req, res) => {
  const { user_name, user_email, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 16-character Google App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${MY_EMAIL}>`,
      replyTo: user_email,
      to: MY_EMAIL,
      subject: `New message from ${user_name}`,
      html: `
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Use module.exports because this folder is "type": "commonjs"
module.exports = app;
