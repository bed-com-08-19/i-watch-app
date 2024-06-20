import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helper/getDataFromToken";
import Video from "@/models/videoModel"; // Adjust import path as necessary
import { connect } from "@/dbConfig/dbConfig"; // Adjust import path as necessary

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);
    const videos = await Video.find({ userId }).sort({ watchedAt: -1 }).limit(15); // Fetch last 15 watched videos

    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const body = await request.json();
    const video = await Video.create(body); // Assuming body contains video details

    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
