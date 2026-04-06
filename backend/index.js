const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ----- CONFIG -----
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// ----- MONGOOSE MODELS -----
// isMe removed — it's a client-side concern, not a DB concern
const messageSchema = new mongoose.Schema(
  {
    chatId: { type: Number, required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

// ----- EXPRESS SETUP -----
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// ----- SOCKET.IO SETUP -----
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*", // restrict in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // ── Join a chat room ──────────────────────────────────────────────────────
  socket.on("join_chat", async (chatId) => {
    try {
      // Leave all previous rooms except the socket's own room
      const previousRooms = [...socket.rooms].filter((r) => r !== socket.id);
      for (const room of previousRooms) {
        socket.leave(room);
      }

      // Always join as a string — prevents number/string room mismatch
      const roomId = chatId.toString();
      socket.join(roomId);
      console.log(`📌 ${socket.id} joined room: "${roomId}"`);

      // Paginated history — last 50 messages, oldest first
      const messages = await Message.find({ chatId: Number(chatId) })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean(); // plain objects, no Mongoose overhead

      socket.emit("chat_history", messages.reverse());
    } catch (err) {
      console.error("❌ join_chat error:", err.message);
      socket.emit("error", { message: "Failed to load chat history" });
    }
  });

  // ── Send a message ────────────────────────────────────────────────────────
  // ── Send a message ────────────────────────────────────────────────────────
  socket.on("send_message", async (msg) => {
    // FIX: Check for null/undefined instead of !msg.chatId
    const isChatIdMissing = msg?.chatId === undefined || msg?.chatId === null;

    if (isChatIdMissing || !msg?.sender?.trim() || !msg?.text?.trim()) {
      return socket.emit("error", { message: "Invalid message payload" });
    }

    try {
      const newMessage = new Message({
        chatId: Number(msg.chatId), // Ensure it's stored as a number
        sender: msg.sender,
        text: msg.text,
        time: msg.time,
      });

      const saved = await newMessage.save();

      const payload = {
        ...saved.toObject(),
        _id: saved._id.toString(),
      };

      // Always use .toString() for the room name
      io.to(msg.chatId.toString()).emit("receive_message", payload);
    } catch (err) {
      console.error("❌ send_message error:", err.message);
      socket.emit("error", { message: "Failed to send message" });
    }
  });
  // ── Delete a message ──────────────────────────────────────────────────────
  socket.on("delete_message", async ({ chatId, messageId, sender }) => {
    console.log("5. server got:", { chatId, messageId, sender });
    try {
      const message = await Message.findById(messageId);
      console.log(
        "6. found in DB:",
        message ? message.toObject() : "NOT FOUND",
      );
      console.log(
        "7. sender match?",
        message?.sender,
        "===",
        sender,
        "→",
        message?.sender === sender,
      );
      console.log("8. socket rooms:", [...socket.rooms]);

      if (!message)
        return socket.emit("error", { message: "Message not found" });
      if (message.sender !== sender)
        return socket.emit("error", { message: "Unauthorized" });

      await Message.findByIdAndDelete(messageId);
      console.log("9. deleted. emitting to room:", chatId.toString());
      io.to(chatId.toString()).emit("message_deleted", messageId.toString());
    } catch (err) {
      console.error("10. ERROR:", err.message);
    }
  });

  // ── Disconnect ────────────────────────────────────────────────────────────
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ----- START SERVER -----
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
