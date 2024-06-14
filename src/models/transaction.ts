// models/transaction.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  type: 'earnings' | 'spending';
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earnings', 'spending'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
