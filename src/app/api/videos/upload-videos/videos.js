import connect from '../../../../dbConfig';
import Video from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, url, creator } = req.body;

    try {
      await connect();
      const video = await Video.create({ title, description, url, creator });
      res.status(201).json({ success: true, data: video });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
