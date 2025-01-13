import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select([
      "-password",
      "-created_at",
    ]);

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    res.status(200).json({ status: "ok", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while fetching user's data." });
  }
};

export const updateUserProfile = async (req, res) => {
  console.log(req.user);
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const { username, bio } = req.body;

    if (username) user.username = username;
    if (bio) user.bio = bio;

    await user.save();
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    res.status(500).json({ message: "Error when updating profile" });
  }
};
