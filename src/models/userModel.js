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
  img: { type: String, default: 0 },
  preferredCategories: [{ type: String }],
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});



const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = UserModel;
