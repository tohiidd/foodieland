import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, require: true },
    email: { type: String, trim: true, require: true },
    subject: { type: String, trim: true, require: true },
    enquiry: { type: String, enum: ["advertising", "commercials", "support"], default: "support", require: true },
    message: { type: String, trim: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
