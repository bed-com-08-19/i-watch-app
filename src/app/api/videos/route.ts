import { NextRequest, NextResponse } from 'next/server';
import Video from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET() {
  await connect();
  try {
    const videos = await Video.find({});
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await connect();
  try {
    const body = await request.json();
    const video = await Video.create(body);
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

