// pages/api/videos/playback/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { videoId } = await request.json();
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const video = await Video.findById(videoId).populate('creator');
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.creditedVideos.includes(videoId)) {
      return NextResponse.json({ message: "User has already been credited for this video" }, { status: 400 });
    }

    if (video.creditedUserCount >= 10) {
      return NextResponse.json({ message: "Credit limit for this video has been reached" }, { status: 400 });
    }

    // Credit the user and video owner
    user.icoins += 2;
    video.creator.icoins += 4;
    user.creditedVideos.push(videoId);

    // Increment the creditedUserCount
    video.creditedUserCount += 1;

    await user.save();
    await video.creator.save();
    await video.save();

    return NextResponse.json({ message: "Credits awarded successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
