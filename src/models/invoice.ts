// models/Invoice.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IInvoice extends Document {
  invoice_id: string;
  subscription_id: string;
  amount_paid?: number;
  amount_due?: number;
  currency: string;
  status: string;
  user_id: string;
  email: string;
}

const InvoiceSchema: Schema = new Schema({
  invoice_id: { type: String, required: true, unique: true },
  subscription_id: { type: String, required: true },
  amount_paid: { type: Number },
  amount_due: { type: Number },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
