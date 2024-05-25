import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const videos = await Video.find();
    return NextResponse.json({ message: "Videos retrieved successfully", data: videos }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
