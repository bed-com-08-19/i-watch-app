
import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionPlanSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

export default SubscriptionPlan;
