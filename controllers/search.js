import User from "../models/User.js";
import Post from "../models/Post.js";

export const searchUsers = async (req, res) => {
  const { query } = req.query;

  console.log(query);

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).select(["_id", "username", "bio", "profile_image"]);

    res.status(200).json({ status: "ok", data: users });
  } catch (error) {
    res.status(500).json({ error: "Error when searching users" });
  }
};

export const searchPosts = async (req, res) => {
  const { query } = req.query;

  const filter = query
    ? {
        $or: [
          { content: { $regex: query, $options: "i" } },
          // { tags: { $regex: "#" + query, $options: "i" } },
        ],
      }
    : {};

  try {
    const posts = await Post.find(filter);
    res
      .status(200)
      .json({ status: "ok", data: { count: posts.length, posts } });
  } catch (error) {
    res.status(500).json({ error: "Error when searching posts" });
  }
};
