import { connect } from "@/dbConfig/dbConfig";
import User from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    try {
      await connect();
      const user = await User.create({ username, email, password, role });
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
