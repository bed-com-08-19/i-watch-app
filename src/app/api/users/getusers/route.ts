
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all users from the database
    const users = await User.find({}).select('-password'); // Exclude password from the response

    // Return the user data
    return NextResponse.json({
      message: "Users fetched successfully",
      success: true,
      users: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
