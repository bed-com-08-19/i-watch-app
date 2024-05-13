import { connect } from "@/dbConfig/dbConfig";
import User from '../../../../models';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { username, email, password, role } = req.body;

  if (method === 'PUT') {
    try {
      await connect();
      const user = await User.findByIdAndUpdate(id, { username, email, password, role }, { new: true });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
