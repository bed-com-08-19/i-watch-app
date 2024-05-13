import connect from '../../../../dbConfig';
import User from '../../../../models';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { userId, amount } = req.body;
  
      try {
        await connect();
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.balance += amount;
        await user.save();
        res.status(200).json({ success: true, message: 'Deposit successful', data: user });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }