import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["summary", "blog", "chat"], required: true },
  input: { type: String },
  output: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Content", contentSchema);
