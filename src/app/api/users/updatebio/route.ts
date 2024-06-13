// pages/api/users/updatebio.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/dbConfig/dbConfig'; // Ensure correct path
import UserModel from '@/models/userModel'; // Ensure correct path

const updateBio = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, bio } = req.body;

  if (!userId || !bio) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connect();

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bio = bio;
    await user.save();

    res.status(200).json({ message: 'Bio updated successfully', bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default updateBio;
