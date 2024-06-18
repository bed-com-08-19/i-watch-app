//\api\icoins\gift\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/client';
import User from '@/models/userModel';
import Video from '@/models/videoModel';

// POST: Gift icoins to creator
export async function POST(req: NextRequest) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
  }

  const { viewerId, creatorId, icoinsAmount } = await req.json();

  try {
    
    const viewer = await User.findById(viewerId);
    const creator = await User.findById(creatorId);

    if (!viewer || !creator) {
      return NextResponse.json({ success: false, message: 'Viewer or creator not found' }, { status: 404 });
    }

    
    if (viewer.icoins < icoinsAmount) {
      return NextResponse.json({ success: false, message: 'Insufficient icoins' }, { status: 400 });
    }

    
    viewer.icoins -= icoinsAmount;
    await viewer.save();

    
    creator.icoins += icoinsAmount;
    await creator.save();

    return NextResponse.json({ success: true, message: `Successfully gifted ${icoinsAmount} icoins to the creator` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
