import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '@/dbConfig/dbConfig';
import Transaction from '@/models/transaction';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

async function sendSMSNotification(phoneNumber: string, message: string) {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'US');
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      throw new Error('Invalid phone number');
    }

    const formattedPhoneNumber = phoneNumberObj.format('E.164');

    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: formattedPhoneNumber,
    });
    return response;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw new Error('Failed to send SMS');
  }
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount }: { phoneNumber: string; amount: number } = await request.json();

    if (!phoneNumber || !amount) {
      console.error('Missing required fields:', { phoneNumber, amount });
      return NextResponse.json({ success: false, message: 'Phone number and amount are required' }, { status: 400 });
    }

    const userId = getDataFromToken(request);

    if (!userId) {
      console.error('Invalid token');
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 400 });
    }

    await connect();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid user ID:', userId);
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId);
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    let userBalance = user.balance;
    if (userBalance < amount) {
      console.error('Insufficient balance:', { userBalance, amount });
      return NextResponse.json({ success: false, message: 'Insufficient balance' }, { status: 400 });
    }
    userBalance -= amount;
    user.balance = userBalance;

    await user.save();

    const transaction = new Transaction({
      user: user._id,
      amount,
      type: 'withdrawal'
    });
    await transaction.save();

    const smsMessage = `Withdrawal of ${amount} successful from I-WATCH. Updated balance: ${userBalance}. KEEP MAKING MONEY with US`;
    await sendSMSNotification(phoneNumber, smsMessage);

    return NextResponse.json({ success: true, message: 'Withdrawal successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    return NextResponse.json({ success: false, error: 'Failed to process withdrawal' }, { status: 500 });
  }
}
