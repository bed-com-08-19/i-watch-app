import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/userModel';
import Video, { IVideo } from '@/models/videoModel';
import { getDataFromToken } from '@/helper/getDataFromToken';
import { sendSMSNotification } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const { videoId, phoneNumber } = await req.json();

    const video: IVideo | null = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    const creator: IUser | null = await User.findById(video.creator);
    if (!creator) {
      return NextResponse.json({ success: false, message: 'Creator not found' }, { status: 404 });
    }

    if (user.icoins < 1) {
      return NextResponse.json({ success: false, message: 'Insufficient coins' }, { status: 400 });
    }

    user.icoins -= 1;
    await user.save();

    creator.icoins += 1;
    await creator.save();

    await sendSMSNotification(phoneNumber, `Successfully gifted 1 coin to the video creator`);
    return NextResponse.json({ success: true, message: 'Successfully gifted 1 coin to the video creator' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
