import { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

type Data = {
  success: boolean;
  data?: any;
};

export async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

  try {
    const user = await User.findById(req.query.id);
    if (!user) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

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
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

  try {
    const deletedUser = await User.deleteOne({ _id: req.query.id });
    if (!deletedUser) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
