// api/videos/playcount/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Video, { IVideo } from '@/models/videoModel';
import User from '@/models/userModel'; // Import IUser from user model
import { getDataFromToken } from '@/helper/getDataFromToken';
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

    // Check if the user has already been credited for this video
    if (user.creditedVideos.includes(videoId)) {
      return NextResponse.json({ message: 'User has already been credited for this video' }, { status: 400 });
    }

    // Check if the video has reached its credit limit
    if (video.creditedUserCount >= 10) {
      return NextResponse.json({ message: 'Credit limit for this video has been reached' }, { status: 400 });
    }

    // Increment playCount for the video
    video.playCount += 1;
    video.awardedViewers.push(userId);

    // Increment playCount for the video creator (user)
    const videoOwner = await User.findById(video.creator);
    if (videoOwner) {
      videoOwner.playCount += 1;
      await videoOwner.save();
    }

    // Credit the user with coins and update creditedVideos
    user.icoins += 2; // Assuming coins logic
    user.creditedVideos.push(videoId);

    // Increment the creditedUserCount
    video.creditedUserCount += 1;

    await video.save();
    await user.save();

    return NextResponse.json({ message: 'Video play count updated and user awarded successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating play count:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
