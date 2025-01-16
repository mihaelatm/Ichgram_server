export const updateProfileImage = (req, res) => {
  const { userId, image } = req.body;

  if (!userId || !image) {
    return res.status(400).json({ error: "User ID and image are required!" });
  }

  userDatabase[userId] = { profileImage: image };

  res.status(200).json({ message: "Profile image updated successfully!" });
};

export const getProfileImage = (req, res) => {
  const { userId } = req.params;

  if (!userDatabase[userId]) {
    return res.status(404).json({ error: "User not found!" });
  }

  res.status(200).json({ profileImage: userDatabase[userId].profileImage });
};
