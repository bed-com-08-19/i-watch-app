import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  await connect(); // Ensure connection is made in each request

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

    const videoOwner = video.creator;
    if (!videoOwner) {
      return NextResponse.json({ error: "Video owner not found" }, { status: 404 });
    }

    // Check if user has already been credited for this video
    if (user.creditedVideos.includes(videoId)) {
      return NextResponse.json({ message: "User has already been credited for this video" }, { status: 400 });
    }

    // Reward credits
    user.balance += 10;
    videoOwner.balance += 10;
    user.creditedVideos.push(videoId);

    await user.save();
    await videoOwner.save();

    return NextResponse.json({ message: "Credits awarded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
