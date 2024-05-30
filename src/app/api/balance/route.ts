import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

type ResponseData = {
  success: boolean;
  data?: { balance: number } | null;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      await connect();

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, data: null, error: 'User not found' });
      }

      return res.status(200).json({ success: true, data: { balance: user.balance } });
    } catch (error: any) {
      return res.status(500).json({ success: false, data: null, error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, data: null, error: 'Method Not Allowed' });
  }
}
