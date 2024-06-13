// pages/api/videos/user.ts
import { NextRequest, NextResponse } from 'next/server';
import Video from "@/models/videoModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}