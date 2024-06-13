import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Handle GET requests to fetch all users
export async function GET(req: NextRequest) {
  try {
    await connect();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Handle POST requests to create a new user
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
