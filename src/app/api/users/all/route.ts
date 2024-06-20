import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

export async function GET(req: NextRequest) {
  await connect();
  
  try {
    const users = await User.find({}, 'username role isSubscribed').limit(5);
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
