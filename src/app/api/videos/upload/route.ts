import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads/videos',
  filename: (req, file, cb) => {
    const randomName = `${uuidv4()}${file.originalname}`;
    cb(null, randomName);
  },
});

const upload = multer({ storage });

// Helper function to run middleware in Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const uploadMiddleware = upload.single('video');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await connect();

  // Run the upload middleware
  await runMiddleware(req, res, uploadMiddleware);

  const { title, description, creator } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  // Validate and convert creator ID to ObjectId
  let creatorId;
  try {
    creatorId = new mongoose.Types.ObjectId(creator);
  } catch (error) {
    return res.status(400).json({ success: false, error: 'Invalid creator ID' });
  }

  const url = `/uploads/videos/${req.file.filename}`;

  try {
    const video: IVideo = new Video({ title, description, url, creator: creatorId });
    await video.save();

    return res.status(200).json({ success: true, data: video });
  } catch (error: any) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
