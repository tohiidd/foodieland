import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    image: { type: String, trim: true, require: true },
    author: { type: String, trim: true, require: true },
    authorImage: { type: String, trim: true },
    description: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);