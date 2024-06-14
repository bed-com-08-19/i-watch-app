import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/userModel';
import Transaction from '@/models/transaction';
import fetch from 'node-fetch';
import { connect } from '@/dbConfig/dbConfig'; // Adjust path as per your project

// Function to send SMS using TelcomW API (unchanged)
async function sendSMSNotification(phoneNumber: string, message: string) {
  const apiKey = 'TTEPAiSawKA2Ia2w92Px '; // Replace with your TelcomW API key
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Ensure HTTPS request handling
//   if (!req.secure) {
//     return res.status(403).json({ success: false, message: 'HTTPS Required' });
//   }

  const { mobileNumber, amount }: { mobileNumber: string; amount: number } = req.body;

  try {
    await connect(); // Ensure database connection

    // Find user by mobile number
    const user = await User.findOne({ phoneNumber: mobileNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
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
    res.status(200).json({ success: true, message: 'Withdrawal successful' });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    res.status(500).json({ success: false, error: 'Failed to process withdrawal' });
  }
}
