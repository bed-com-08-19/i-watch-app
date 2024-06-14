// routes/withdraw.ts

import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Transaction, { ITransaction } from '../models/Transaction';
import fetch from 'node-fetch';

const router = express.Router();

// Function to send SMS using TelcomW API
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

// POST /api/withdraw
router.post('/', async (req: Request, res: Response) => {
  const { mobileNumber, amount }: { mobileNumber: string; amount: number } = req.body;

  try {
    // Find user by mobile number
    const user: IUser | null = await User.findOne({ phoneNumber: mobileNumber });

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
    const transaction: ITransaction = new Transaction({ user: user._id, amount, type: 'withdrawal' });
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
});

export default router;
