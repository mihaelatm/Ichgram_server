import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, full_name } = req.body;

  try {
    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User with such username or email is already has been registred",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
    });

    await user.save();

    res.status(201).json({ message: "User has been regsitred successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};
