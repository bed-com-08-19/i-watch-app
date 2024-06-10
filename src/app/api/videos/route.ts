import { NextRequest, NextResponse } from 'next/server';
import Video from "@/models/videoModel";
import { connect } from "@/dbConfig/dbConfig";
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    await connect();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connect();
  try {
    const body = await request.json();

    // Convert the creator field to an ObjectId
    let creator;
    try {
      // Ensure that the creator is converted to ObjectId
      creator = mongoose.Types.ObjectId.createFromHexString(body.creator);
    } catch (error) {
      // If conversion fails, return a 400 error
      return NextResponse.json({ success: false, error: 'Invalid creator ID' }, { status: 400 });
    }

    const videoData = {
      ...body,
      creator
    };

    const video = await Video.create(videoData);
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
