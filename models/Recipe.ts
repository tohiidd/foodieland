import mongoose from "mongoose";

const NutritionSchema = new mongoose.Schema(
  {
    calories: { type: String },
    totalFat: { type: String },
    protein: { type: String },
    carbohydrate: { type: String },
    cholesterol: { type: String },
  },
  { timestamps: true }
);

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    image: { type: String, trim: true, require: true },
    banner: { type: String, trim: true },
    video: { type: String, trim: true, require: true },
    chef: { type: String, trim: true, require: true },
    category: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
    cookTime: { type: String, trim: true },
    prepTime: { type: String, trim: true },
    likes: { type: Number },
    nutrition: { type: NutritionSchema },
  },
  { timestamps: true }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
