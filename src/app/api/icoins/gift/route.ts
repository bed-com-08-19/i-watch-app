// api/icoins/gift.ts

import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/userModel'; // Adjust the import path based on your project structure
import Video, { IVideo } from '@/models/videoModel'; // Adjust the import path based on your project structure
import { getDataFromToken } from '@/helper/getDataFromToken'; // Assuming this function extracts user data from a token

// POST: Gift icoins to video creator
export async function POST(req: NextRequest) {
  try {
    // Extract userId from token
    const userId = await getDataFromToken(req);

    // Find the user (current user)
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const { videoId } = await req.json();

    // Find the video and its creator
    const video: IVideo | null = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    const creator: IUser | null = await User.findById(video.creator);
    if (!creator) {
      return NextResponse.json({ success: false, message: 'Creator not found' }, { status: 404 });
    }

    // Check if user has enough coins
    if (user.icoins < 1) {
      return NextResponse.json({ success: false, message: 'Insufficient coins' }, { status: 400 });
    }

    // Deduct 1 coin from user
    user.icoins -= 1;
    await user.save();

    // Add 1 coin to video creator
    creator.icoins += 1;
    await creator.save();

    return NextResponse.json({ success: true, message: 'Successfully gifted 1 coin to the video creator' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
