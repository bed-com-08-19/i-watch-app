import {connect} from '@/dbConfig/dbConfig';
import Category from '@/models/category';
import type { NextApiRequest, NextApiResponse } from 'next';


type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'GET') {
    try {
      await connect();
      const categories = await Category.find({});
      res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
