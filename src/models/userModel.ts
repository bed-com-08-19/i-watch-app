import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'creator';
  isVerified: boolean;
  favoriteVideos: mongoose.Types.ObjectId[];
  bio: string;
  preferredCategories: string[];
  balance: number;
  createdAt: Date;
  imgUrl: string;
  subscription?: string;
  credits?: number;
  creditedVideos: mongoose.Types.ObjectId[];
  playCount: number;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: [true, "Please provide a username"] },
  email: { type: String, required: [true, "Please provide an email"], unique: true, match: [/.+\@.+\..+/, "Please provide a valid email address"] },
  imgUrl: { type: String, required: false, default: '' },
  password: { type: String, required: [true, "Please provide a password"] },
  role: { type: String, enum: ["user", "admin", "creator"], default: "user" },
  isVerified: { type: Boolean, default: false },
  favoriteVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  bio: { type: String, default: '' },
  subscription: { type: String },
  credits: { type: Number, default: 0 },
  preferredCategories: [{ type: String }],
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  creditedVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  playCount: { type: Number, default: 0 }
});

// Adding an index on email for better performance
UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
