import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    progress: { type: Number, default: 0 }, // % course progress
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
