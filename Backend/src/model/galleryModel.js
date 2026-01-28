import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["photo", "video"],
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["event", "puja", "gemstone", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Gallery", gallerySchema);
