import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from '@/models/userModel';
import Video, { IVideo } from '@/models/videoModel';
import { getDataFromToken } from '@/helper/getDataFromToken';
import { sendSMSNotification } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const { videoId, amount } = await req.json();

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    }

    const creator = await User.findById(video.creator);
    if (!creator) {
      return NextResponse.json({ success: false, message: 'Creator not found' }, { status: 404 });
    }

    if (user.icoins < amount) {
      return NextResponse.json({ success: false, message: 'Insufficient coins' }, { status: 400 });
    }

    user.icoins -= amount;
    await user.save();

    creator.icoins += amount;
    await creator.save();

    await sendSMSNotification(user.phoneNumber, `${amount} coins have been deducted from your account`);
    await sendSMSNotification(creator.phoneNumber, `${amount} coins have been added to your account from ${user.username}`);

    return NextResponse.json({
      success: true,
      message: `Successfully gifted ${amount} coins to ${creator.username}`,
      creatorName: creator.username,
      userCoins: user.icoins,
      creatorCoins: creator.icoins,
    });
  } catch (error:any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
