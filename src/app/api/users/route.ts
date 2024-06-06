import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";




// Handle GET requests
export async function GET(req: NextRequest) {
  await connect();

  try {
    const users: IUser[] = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// Handle POST requests
export async function POST(req: NextRequest) {
  await connect();

  try {
    const body = await req.json();
    const user: IUser = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}