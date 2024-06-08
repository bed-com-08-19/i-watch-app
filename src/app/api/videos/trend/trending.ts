// pages/api/videos/trending.ts

import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";

export default async function handler(req: NextRequest, res: NextResponse) {
  await connect();

  try {
    const videos = await Video.find().sort({ playCount: -1 }).limit(10);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
