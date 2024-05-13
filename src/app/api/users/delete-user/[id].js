import { connect } from "@/dbConfig/dbConfig";
import User from '../../../../models';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'DELETE') {
    try {
      await connect();
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
