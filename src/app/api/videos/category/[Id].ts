// pages/api/videos/category/[categoryId].ts

import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/videoModel';
import { connect } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest, { params }: { params: { categoryId: string } }) {
  await connect();

  try {
    const { categoryId } = params;
    const videos = await Video.find({ categories: categoryId }).sort({ createdAt: -1 }).populate('creator');
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
