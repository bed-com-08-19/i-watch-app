import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createWriteStream } from 'fs';
import { getDataFromToken } from '@/helper/getDataFromToken';

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

// Updated runtime configuration
export const runtime = {
  api: {
    bodyParser: false,
  }
};

export async function POST(req: NextRequest) {
  await connect();

  try {
    const formData = await req.formData();
    const file = formData.get('video') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    
    // Get user ID from token or session
    const userId = await getDataFromToken(req);

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = path.join('./public/uploads/videos', `${uuidv4()}${path.extname(file.name)}`);

    const buffer = await file.arrayBuffer();
    await new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath);
      stream.write(Buffer.from(buffer));
      stream.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    const url = `/uploads/videos/${path.basename(filePath)}`;
    
    // Create Video object with creator as userId
    const video: IVideo = new Video({ title, description, url, creator: userId });
    await video.save();

    return NextResponse.json({ success: true, data: video }, { status: 200 });
  } catch (error: any) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
