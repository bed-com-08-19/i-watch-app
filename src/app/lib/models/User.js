import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creator', 'user'], default: 'user' },
  favoriteVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  preferredCategories: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
