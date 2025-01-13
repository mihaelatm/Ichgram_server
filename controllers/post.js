import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const userId = req.user._id;

  const { content } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not found" });
    }

    const post = new Post({
      user_id: userId,
      images: ["fileNumber1"],
      content,
      created_at: new Date(),
    });

    await post.save();

    user.posts_count += 1;

    await user.save();

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when creating post" });
  }
};
