// pages/api/videos/category.js
import connectToDatabase from '../../lib/db';

export default async function handler(req, res) {
    const { method } = req;
  
    if (method === 'GET') {
      const { category } = req.query;
  
      try {
        await connectToDatabase();
        const videos = await Video.find({ category });
        res.status(200).json({ success: true, data: videos });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }
  