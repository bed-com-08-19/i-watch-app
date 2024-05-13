const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
   username: {
   type: String,
   required: [true, "Please provide a username"],
   },
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
    enum: ["user", "admin", "creator"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  favoriteVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  preferredCategories: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.users || mongoose.model("user", userSchema);

module.exports = User;
