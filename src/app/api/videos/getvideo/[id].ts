import { connect } from "@/dbConfig/dbConfig";
import Video from "@/models/videoModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Video retrieved successfully", data: video }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
