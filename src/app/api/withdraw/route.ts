// pages/api/withdraw.ts
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import Transaction from '@/models/transaction';
import fetch from 'node-fetch';
import { connect } from '@/dbConfig/dbConfig';
import mongoose from 'mongoose';

async function sendSMSNotification(phoneNumber: string, message: string) {
  const apiKey = 'TTEPAiSawKA2Ia2w92Px'; // Replace with your TelcomW API key
  const password = '12345678'; // Replace with your TelcomW API password

  const formData = new URLSearchParams();
  formData.append('api_key', apiKey);
  formData.append('password', password);
  formData.append('text', message);
  formData.append('numbers', phoneNumber);
  formData.append('from', 'WGIT'); // Replace with your sender ID

  const smsApiUrl = 'https://telcomw.com/api-v2/send';

  const response = await fetch(smsApiUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to send SMS');
  }

  const responseData = await response.json();
  return responseData;
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount }: { phoneNumber: string; amount: number } = await request.json();

    if (!phoneNumber || !amount) {
      return NextResponse.json({ success: false, message: 'Phone number and amount are required' }, { status: 400 });
    }

    await connect();

    // Fetch current user balance (replace with actual logic)
    let userBalance = 20; // Example initial balance
    userBalance -= amount;

    const transaction = new Transaction({ user: new mongoose.Types.ObjectId('current_user_id'), amount, type: 'spending' });
    await transaction.save();

    const smsMessage = `Withdrawal of ${amount} successful from I-WATCH. Updated balance: ${userBalance}. KEEP MAKING MONEY with US`;
    await sendSMSNotification(phoneNumber, smsMessage);

    return NextResponse.json({ success: true, message: 'Withdrawal successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    return NextResponse.json({ success: false, error: 'Failed to process withdrawal' }, { status: 500 });
  }
}
