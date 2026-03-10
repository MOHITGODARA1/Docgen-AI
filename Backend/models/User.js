import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String }, // Optional, only for email providers
    provider: {
      type: String,
      enum: ["email", "github"],
      default: "email",
    },
    avatar: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
