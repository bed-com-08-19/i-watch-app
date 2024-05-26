import { getStorage, ref, uploadBytes } from 'firebase/storage';
import connect from '../../../../dbConfig';
import Video from '../../../../models';

// Get Firebase Storage instance
const storage = getStorage();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, creator } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    try {
      await connect();

      // Create a storage reference with a unique filename
      const storageRef = ref(storage, `videos/${file.originalname}`);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file.buffer);

      // Get the download URL of the uploaded file
      const downloadUrl = await snapshot.ref.getDownloadURL();

      // Create video document in MongoDB with metadata
      const video = await Video.create({ title, description, url: downloadUrl, creator });

      res.status(201).json({ success: true, data: video });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

