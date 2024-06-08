import { getDataFromToken } from "../../../../helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    // Extracting username
    const { username, balance, email } = user.toObject();

    return NextResponse.json({
      message: "User found",
      data: {
        username,
        balance,
        email,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
