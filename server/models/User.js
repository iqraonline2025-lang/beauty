import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Optional because Google users won't have one
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple nulls for email-only users
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;