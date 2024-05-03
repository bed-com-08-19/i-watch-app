// ./src/models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: [true, "Please provide a username"],
  //   unique: true,
  // },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "creator"], // Add your desired roles here
    default: "user", // Set a default role if no role is provided
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
