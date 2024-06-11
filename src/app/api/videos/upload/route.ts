import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import path from 'path';
import { promises as fs } from 'fs';

// Configure the runtime correctly
export const runtime = 'nodejs';

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

  const fileName = `${uuidv4()}${path.extname(file.name)}`;
  const filePath = path.join('./public/uploads/videos', fileName);

  try {
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));

    const url = `/uploads/videos/${fileName}`;
    const video: IVideo = new Video({ title, description, url, creator });
    await video.save();

    return NextResponse.json({ success: true, data: video }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
