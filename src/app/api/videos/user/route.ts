// pages/api/videos/user/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";

connect();

export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the token
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch videos for the user
    const videos = await Video.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      data: videos,
    });
  } catch (error: any) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
