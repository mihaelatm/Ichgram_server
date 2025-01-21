import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, full_name, profile_link } = req.body;

  try {
    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "This email is already taken."
          : "This username is already taken.";
      return res.status(400).json({ message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      full_name,
      profile_link,
    });

    await user.save();

    res.status(201).json({ message: "User has been registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email/username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email/username or password." });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      token,
      username: user.username,
      profileLink: user.profile_link,
      bio: user.bio || null,
      profile_image: user.profile_image || null,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};
