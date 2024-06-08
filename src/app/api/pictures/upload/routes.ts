import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Image, { IImage } from '@/models/imageModel';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createWriteStream } from 'fs';

// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: './public/uploads/image',
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

const uploadMiddleware = upload.single('image');

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  await connect();

  const formData = await req.formData();
  const file = formData.get('image') as File;
  const user = formData.get('user') as string;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  const filePath = path.join('./public/uploads/image', `${uuidv4()}${path.extname(file.name)}`);

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
    const image: IImage = new Image({ url, user });
    await image.save();

    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
