import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  creator: mongoose.Types.ObjectId;
  playCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    playCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
