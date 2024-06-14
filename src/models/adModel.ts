import mongoose, { Schema, Document } from "mongoose";

export interface IAd extends Document {
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    adUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Ad || mongoose.model<IAd>("Ad", AdSchema);