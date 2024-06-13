import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import User from '@/models/userModel'; // Import your User model
import { getDataFromToken } from '@/helper/getDataFromToken'; // Assuming this helper retrieves user ID from token
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  await connect(); // Ensure MongoDB connection

  try {
    const { videoId } = await request.json(); // Assuming the client sends videoId in the request body
    const userId = await getDataFromToken(request); // Get user ID from token or session

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Increment playCount for the video
    video.playCount += 1;
    await video.save();

    // Increment playCount for the video creator (user)
    const videoOwner = await User.findById(video.creator);
    if (videoOwner) {
      videoOwner.playCount += 1;
      await videoOwner.save();
    }

    return NextResponse.json({ message: 'Video play count updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating play count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
