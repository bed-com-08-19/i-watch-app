import { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/dbConfig/dbConfig';
import Video from '@/models/videoModel';

type Data = {
  success: boolean;
  data?: any;
};

export async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

  try {
    const video = await Video.findById(req.query.id);
    if (!video) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

  try {
    const video = await Video.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!video) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse<Data>) {
  await connect();

  try {
    const deletedVideo = await Video.deleteOne({ _id: req.query.id });
    if (!deletedVideo) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
