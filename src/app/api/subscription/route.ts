import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const { userId, amount } = req.body;

    try {
      await connect();
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.balance += amount;
      await user.save();
      res.status(200).json({ success: true, message: 'Deposit successful', data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
