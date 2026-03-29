import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { connectDB } from "../../utils/db.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });

  await connectDB();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
