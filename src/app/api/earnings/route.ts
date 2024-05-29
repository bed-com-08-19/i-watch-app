import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import Video from '@/models/videoModel';
import Transaction from '@/models/Transaction';

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      await connect();

      const videos = await Video.find({});
      
      for (const video of videos) {
        const earnings = video.views * 0.01; // Adjust earning calculation as needed
        video.earnings += earnings;
        await video.save();

        await Transaction.create({
          user: video.creator,
          amount: earnings,
          type: 'earnings',
        });
      }

      res.status(200).json({ success: true, message: 'Earnings calculated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
