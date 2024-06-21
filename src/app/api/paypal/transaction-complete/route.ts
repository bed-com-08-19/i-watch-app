import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import Transaction from '@/models/transaction';
import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helper/getDataFromToken';
import { sendSMSNotification } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  try {
    await connect();

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { orderID, icoinsAmount, phoneNumber } = await req.json();

    if (!orderID || !icoinsAmount || !phoneNumber) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Add your PayPal verification logic here if necessary

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    user.icoins += icoinsAmount;
    await user.save();

    const transaction = new Transaction({
      user: userId,
      amount: icoinsAmount,
      type: 'deposits',
      createdAt: new Date()
    });

    await transaction.save();

    const smsMessage = `Transaction complete: ${icoinsAmount} iCoins have been added to your account.`;
    await sendSMSNotification(phoneNumber, smsMessage);

    return NextResponse.json({ success: true, message: 'Transaction complete and iCoins updated' });
  } catch (error: any) {
    console.error('Error completing PayPal transaction:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
