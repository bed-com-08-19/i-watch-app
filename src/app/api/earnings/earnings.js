import connect from '../../../../dbConfig';
import Video from '../../../../models';
import Transaction from '../../lib/models/Transaction';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connect();
      const videos = await Video.find({});
      for (const video of videos) {
        const earnings = video.views * 0.01; // Adjust earning calculation as needed
        video.earnings += earnings;
        await video.save();
        await Transaction.create({
          user: video.creator,
          amount: earnings,
          type: 'earnings',
        });
      }
      res.status(200).json({ success: true, message: 'Earnings calculated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
