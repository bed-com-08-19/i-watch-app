// models/Subscription.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISubscription extends Document {
  subscription_id: string;
  stripe_user_id: string;
  status: string;
  start_date: string;
  plan_id: string;
  user_id: string;
  email: string;
}

const SubscriptionSchema: Schema = new Schema({
  subscription_id: { type: String, required: true, unique: true },
  stripe_user_id: { type: String, required: true },
  status: { type: String, required: true },
  start_date: { type: Date, required: true },
  plan_id: { type: String, required: true },
  user_id: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
