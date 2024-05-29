import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../../dbConfig';
import Category from '../../../../models';

type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      await connect();
      const category = await Category.create({ name });
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
