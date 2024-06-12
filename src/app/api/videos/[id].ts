// /app/api/videos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Video from "@/models/videoModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  await connect();
  const { id } = req.query;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  await connect();
  const { id } = req.query;

  try {
    const body = await req.json();
    const video = await Video.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!video) {
      return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  await connect();
  const { id } = req.query;

  try {
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
