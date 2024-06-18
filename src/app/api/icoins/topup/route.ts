//\api\icoins\topup\route.ts

import { NextRequest, NextResponse } from 'next/server';

// POST: Calculate top-up amount
export async function POST(req: NextRequest) {
  const { icoinsAmount } = await req.json();

  // Assuming 1 icoin = 45 dollars
  const depositAmount = icoinsAmount * 45;

  return NextResponse.json({ success: true, depositAmount });
}
