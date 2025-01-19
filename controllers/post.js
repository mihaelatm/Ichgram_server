import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const userId = req.user._id;

  const { content, imageBase64 } = req.body; // Aici primim imaginea base64 din frontend

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Asigurăm că există o imagine base64
    if (!imageBase64 || !imageBase64.startsWith("data:image")) {
      return res
        .status(400)
        .json({
          error: "Invalid image format. Please upload a valid base64 image.",
        });
    }

    // Creăm un nou post cu imaginea în format base64
    const post = new Post({
      user_id: userId,
      images: [imageBase64], // Stocăm imaginea direct în format base64
      content,
      created_at: new Date(),
    });

    await post.save();

    // Actualizăm contorul de postări pentru utilizator
    user.posts_count += 1;
    user.posts.push(post);

    await user.save();

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when creating post" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.user._id });
    res.status(200).json({ status: "ok", data: posts });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching posts" });
  }
};

export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate(
      "user_id",
      "username profile_image"
    );

    if (!post) {
      return res.status(404).json({ error: "Post is not found" });
    }

    res.status(200).json({ status: "ok", data: post });
  } catch (error) {
    res.status(500).json({ error: "Error when fetching post" });
  }
};
