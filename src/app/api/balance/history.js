import connectToDatabase from '../../../lib/db';
import Transaction from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      await connectToDatabase();
      const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

