
// pages/api/ad/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Ad from "@/models/adModel";

export async function GET(req: NextRequest) {
  await connect();
  try {
    const count = await Ad.countDocuments();
    const random = Math.floor(Math.random() * count);
    const ad = await Ad.findOne().skip(random);

    return NextResponse.json({ success: true, ad });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
