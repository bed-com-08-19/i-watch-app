import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import Category from '@/models/category';

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      await connect();
      const deletedCategory = await Category.findByIdAndDelete(id as string);
      if (!deletedCategory) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
