import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createWriteStream } from 'fs';
import { getDataFromToken } from '@/helper/getDataFromToken';

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    await connect();

    try {
      const formData = await req.formData();
      const file = formData.get('video') as File;
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;

      // Get user ID from token or session
      const userId = await getDataFromToken(req);

      if (!file) {
        return res.json({ success: false, error: 'No file uploaded' }, { status: 400 });
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

      return res.json({ success: true, data: video }, { status: 200 });
    } catch (error: any) {
      console.error('Error uploading video:', error);
      return res.json({ success: false, error: error.message }, { status: 400 });
    }
  } else {
    return res.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
