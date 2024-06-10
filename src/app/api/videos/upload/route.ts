import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createWriteStream } from 'fs';
import mongoose from 'mongoose';

// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads/videos',
  filename: (req, file, cb) => {
    const randomName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, randomName);
  },
});

const upload = multer({ storage });

// Helper function to run middleware in Next.js
const runMiddleware = (req: NextRequest, res: NextResponse, fn: any) => {
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

export const segment = {
  config: {
    api: {
      bodyParser: false,
    },
  },
};

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData();
  const file = formData.get('video') as File;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const creatorId = formData.get('creator') as string;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  // Validate and convert creator ID to ObjectId
  let creator;
  try {
    creator = new mongoose.Types.ObjectId(creatorId);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid creator ID' }, { status: 400 });
  }

  const filePath = path.join('./public/uploads/videos', `${uuidv4()}${path.extname(file.name)}`);

  try {
    const buffer = await file.arrayBuffer();
    await new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath);
      stream.write(Buffer.from(buffer));
      stream.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    const url = `/uploads/videos/${path.basename(filePath)}`;
    const video: IVideo = new Video({ title, description, url, creator });
    await video.save();

    return NextResponse.json({ success: true, data: video }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
