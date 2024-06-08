// pages/api/videos/trend/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";

connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch top 10 trending videos sorted by play count in descending order
    const videos = await Video.find().sort({ playCount: -1 }).limit(10);
    
    return NextResponse.json({
      data: videos,
    });
  } catch (error: any) {
    console.error("Error fetching trending videos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
