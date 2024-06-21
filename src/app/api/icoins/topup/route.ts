import { NextRequest, NextResponse } from 'next/server';
import { sendSMSNotification } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  try {
    const { icoinsAmount, phoneNumber } = await req.json();

    if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
      throw new Error('Invalid phone number');
    }

    const depositAmount = icoinsAmount * 45;

    await sendSMSNotification(phoneNumber, `Top-up successful: ${icoinsAmount} icoins for ${depositAmount} dollars`);
    return NextResponse.json({ success: true, depositAmount });
  } catch (error) {
    console.error('Error during top-up:', error);
    return NextResponse.json({ success: false, error: 'Failed to process top-up' }, { status: 500 });
  }
}
