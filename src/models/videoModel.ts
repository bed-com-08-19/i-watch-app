import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  creator: mongoose.Types.ObjectId;
  playCount: number;  // for view count
  creditedUserCount: number;  // to track credited users
  categories: mongoose.Types.ObjectId[]; // add categories field
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    playCount: { type: Number, default: 0 },
    creditedUserCount: { type: Number, default: 0 },  // initialize to 0
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],  // reference to categories
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
