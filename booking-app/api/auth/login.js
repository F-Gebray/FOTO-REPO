import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { connectDB } from "../../utils/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });

  await connectDB();

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Optional: set cookie (works on Vercel if you configure https + sameSite)
    // res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}`);

    res
      .status(200)
      .json({
        success: true,
        user: { name: user.name, email: user.email },
        token,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
