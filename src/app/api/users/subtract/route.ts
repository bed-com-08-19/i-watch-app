import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helper/getDataFromToken";
import mongoose from "mongoose";


export async function POST(request: NextRequest) {

 await connect();
  try {
    // Get user ID from token (assuming you have a function getDataFromToken for this)
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch admin user from database
    const adminUser = await User.findOne({ _id: userId, role: "admin" });
    const { videoId } = await request.json();

    const user = await User.findById(userId);

    // Check if user has played the video before
    if (user.creditedVideos.includes(videoId)) {
      return NextResponse.json({ message: "Balance already subtracted for this video" }, { status: 400 });
    }

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });

    }

    // Subtract 10 from admin's balance
    adminUser.balance -= 10;
    adminUser.creditedVideos.push(videoId);

    // Save updated admin user
    await adminUser.save();

    return NextResponse.json({ message: "Balance subtracted successfully", newBalance: adminUser.balance });
  } catch (error: any) {
    console.error("Error subtracting balance:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


