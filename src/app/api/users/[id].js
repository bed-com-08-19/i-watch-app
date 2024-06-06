
import connect  from '../../../dbConfig/dbConfig';
import User from '../../../models/userModel';

export default async (req, res) => {
  const { method } = req;

  await connect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(req.query.id);
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedUser = await User.deleteOne({ _id: req.query.id });
        if (!deletedUser) {
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
