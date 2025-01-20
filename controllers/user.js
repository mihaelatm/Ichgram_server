import upload from "../middlewares/multer.js";
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).select([
      "-password",
      "-created_at",
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching user's data." });
  }
};

export const updateUserProfile = async (req, res) => {
  console.log("Request body:", req.body);
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    console.log("User before update:", user);

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const { username, bio, profile_image } = req.body;

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (profile_image) {
      user.profile_image = profile_image;
    }

    await user.save();

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error when updating profile" });
  }
};

export const uploadProfileImage = upload.single("profile_image");
