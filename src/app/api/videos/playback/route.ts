// pages/api/videos/playback.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { videoId } = await request.json();
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const videoOwner = await User.findById(video.creator);
    if (!videoOwner) {
      return NextResponse.json({ error: "Video owner not found" }, { status: 404 });
    }

    // Reward credits
    user.balance += 10;
    videoOwner.balance += 10;

    await user.save();
    await videoOwner.save();

    return NextResponse.json({ message: "Credits awarded successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
