// pages/api/videos/[id]/play.ts

import { NextApiRequest, NextApiResponse } from "next";
import {connect} from "@/dbConfig/dbConfig"; // Adjust the import path as needed
import Video from "@/models/videoModel"; // Adjust the import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await connect();

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    video.playCount += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
