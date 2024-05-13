import connect from '../../../../dbConfig';
import Video from '../../../../models';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await connect();
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
      res.status(200).json({ success: true, data: video });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
