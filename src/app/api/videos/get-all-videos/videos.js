import connect from '../../../../dbConfig';
import Video from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connect();
      const videos = await Video.find({});
      res.status(200).json({ success: true, data: videos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
