import connectToDatabase from '../../lib/db';
import User from "./User";

export default async function handler(req, res) {
    const { method, userId, videoId } = req.body;
  
    if (method === 'POST') {
      try {
        await connectToDatabase();
        const user = await User.findById(userId);
        user.favorites.push(videoId);
        await user.save();
        res.status(200).json({ success: true, message: 'Video added to favorites' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else if (method === 'DELETE') {
      try {
        await connectToDatabase();
        const user = await User.findById(userId);
        user.favorites = user.favorites.filter(id => id !== videoId);
        await user.save();
        res.status(200).json({ success: true, message: 'Video removed from favorites' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }
  