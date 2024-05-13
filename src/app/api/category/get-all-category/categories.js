import connect from '../../../../dbConfig';
import Category from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connect();
      const categories = await Category.find({});
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
