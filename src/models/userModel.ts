import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface representing a document in MongoDB
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
}

// Create a Schema corresponding to the document interface
const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"], // simple email validation regex
  },
  imgUrl: {
    type: String,
    required: false,
    default: ''
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
  bio: { 
    type: String, 
    default: '' 
  },
  preferredCategories: [{ type: String }],
  balance: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Adding an index on email for better performance
userSchema.index({ email: 1 });

// Create a Model
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;