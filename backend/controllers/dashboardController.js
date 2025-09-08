import Content from "../models/Content.js";

export const getUserContents = async (req, res) => {
  try {
    const contents = await Content.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contents" });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    if (!content) return res.status(404).json({ message: "Not found" });
    if (content.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await content.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting content" });
  }
};
