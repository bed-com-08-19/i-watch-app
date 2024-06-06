import connect  from '../../../dbConfig/dbConfig';
import Video from '../../../models/videoModel';

export default async (req, res) => {
  const { method } = req;

  await connect();

  switch (method) {
    case 'GET':
      try {
        const videos = await Video.find({});
        res.status(200).json({ success: true, data: videos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const video = await Video.create(req.body);
        res.status(201).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
