import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel'; // Adjust the path to your User model
import Transaction from '@/models/transaction'; // Adjust the path to your Transaction model
import { connect } from '@/dbConfig/dbConfig'; // Ensure this path is correct
import { getDataFromToken } from '@/helper/getDataFromToken'; // Adjust the path to your getDataFromToken function

export async function POST(req: NextRequest) {
  try {
    await connect();
    
    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { orderID, icoinsAmount } = await req.json();

    if (!orderID || !icoinsAmount) {
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

    return NextResponse.json({ success: true, message: 'Transaction complete and iCoins updated' });
  } catch (error: any) {
    console.error('Error completing PayPal transaction:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
