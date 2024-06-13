// api/users/updatebio.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'PUT') {
    await connect();

    try {
      const { userId, bio } = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, { bio }, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ success: false });
      }

      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
