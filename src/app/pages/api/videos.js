import connectToDatabase from '../../lib/db';
import Video from '../../lib/models/Video';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const videos = await Video.find({});
        res.status(200).json({ success: true, data: videos });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const video = await Video.create(req.body);
        res.status(201).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const { id } = req.query;
        const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
        if (!video) {
          return res.status(404).json({ success: false, message: 'Video not found' });
        }
        res.status(200).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.query;
        const video = await Video.findByIdAndDelete(id);
        if (!video) {
          return res.status(404).json({ success: false, message: 'Video not found' });
        }
        res.status(200).json({ success: true, message: 'Video deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
