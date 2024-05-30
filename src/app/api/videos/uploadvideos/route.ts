import type { NextApiRequest, NextApiResponse } from 'next';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { connect } from '@/dbConfig/dbConfig';
import Video from '@/models/videoModel';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { storage } from '@/firebase';

type ResponseData = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
};

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, error: 'Error parsing the form data' });
      }

      const { title, description, creator } = fields;
      const file = files.file;

      if (!file || Array.isArray(file)) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }

      try {
        await connect();

        const filePath = file.filepath;
        const fileBuffer = await fs.readFile(filePath);

        const storageRef = ref(storage, `videos/${file.originalFilename}`);

        const snapshot = await uploadBytes(storageRef, fileBuffer);

        const downloadUrl = await getDownloadURL(snapshot.ref);

        const video = await Video.create({
          title: title as unknown as string,
          description: description as unknown as string,
          url: downloadUrl,
          creator: creator as unknown as string,
        });

        res.status(201).json({ success: true, data: video });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
