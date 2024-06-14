import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import Transaction from '@/models/transaction';
import fetch from 'node-fetch';
import { connect } from '@/dbConfig/dbConfig';

// Function to send SMS using TelcomW API (unchanged)
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
    const { mobileNumber, amount }: { mobileNumber: string; amount: number } = request.body;

    // Check if mobileNumber is null or undefined
    if (!mobileNumber) {
      return NextResponse.json({ success: false, message: 'Mobile number is required' }, { status: 400 });
    }

    await connect(); // Ensure database connection

    // Find user by mobile number
    const user = await User.findOne({ phoneNumber: mobileNumber });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Check if user has sufficient balance
    if (user.balance < amount) {
      return NextResponse.json({ success: false, message: 'Insufficient balance' }, { status: 400 });
    }

    // Deduct balance
    user.balance -= amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({ user: user._id, amount, type: 'withdrawal' });
    await transaction.save();

    // Send withdrawal success SMS
    const smsMessage = `Withdrawal of ${amount} successful from I-WATCH. Updated balance: ${user.balance}. KEEP MAKING MONEY with US`;
    await sendSMSNotification(mobileNumber, smsMessage);

    // Respond with success message
    return NextResponse.json({ success: true, message: 'Withdrawal successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    return NextResponse.json({ success: false, error: 'Failed to process withdrawal' }, { status: 500 });
  }
}
