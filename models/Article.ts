import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    image: { type: String, trim: true, require: true },
    author: { type: String, trim: true, require: true },
    shortDescription: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
