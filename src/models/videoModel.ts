// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const videoSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   url: { type: String, required: true },
//   category: { type: String },
//   creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   views: { type: Number, default: 0 },
//   earnings: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// const Video = mongoose.model('Video', videoSchema);

// export default Video;

import mongoose, { Schema, Document } from "mongoose";

interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

