import mongoose from 'mongoose';

const { Schema } = mongoose;

const viewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  video: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
  createdAt: { type: Date, default: Date.now },
});

const View = mongoose.model('View', viewSchema);

export default View;
