import { connect } from "@/dbConfig/dbConfig";
// import User from '../../../../models';
import User from "@/models/userModel"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connect();
      const users = await User.find({});
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
