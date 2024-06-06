import connect  from '../../../dbConfig/dbConfig';
import Video from '../../../models/videoModel';

export default async (req, res) => {
  const { method } = req;

  await connect();

  switch (method) {
    case 'GET':
      try {
        const video = await Video.findById(req.query.id);
        if (!video) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const video = await Video.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!video) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedVideo = await Video.deleteOne({ _id: req.query.id });
        if (!deletedVideo) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
