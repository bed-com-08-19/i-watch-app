import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Ad from "@/models/adModel";

export async function GET(req: NextRequest) {
  await connect();
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: ads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { title, description, adUrl } = await req.json();
    const ad = await Ad.create({ title, description, adUrl });
    return NextResponse.json({ success: true, data: ad }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
