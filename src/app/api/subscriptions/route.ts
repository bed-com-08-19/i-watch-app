import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connect } from '@/dbConfig/dbConfig';
import Subscription from '@/models/Subscription';
import User from '@/models/userModel'; // Import User model
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

async function sendSMSNotification(phoneNumber: string, message: string) {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber, 'US'); // Replace 'US' with your default country code if necessary
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

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { planId, start_date, end_date } = await req.json();

    if (!planId || !start_date || !end_date) {
      console.error('Missing required fields:', { planId, start_date, end_date });
      return NextResponse.json({ success: false, message: 'Plan ID, start date, and end date are required' }, { status: 400 });
    }

    const userId = getDataFromToken(req);

    if (!userId) {
      console.error('Invalid token');
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid user ID:', userId);
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found:', userId);
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const subscription = await Subscription.create({
      subscription_id: `sub_${Date.now()}`, // Example subscription ID
      stripe_user_id: userId,
      status: 'active',
      start_date,
      end_date,
      plan_id: planId,
      user_id: userId,
      email: user.email,
      phoneNumber: user.phoneNumber, // Ensure phoneNumber is part of the User model
    });

    const smsMessage = `You have successfully subscribed. Your subscription ends on ${new Date(end_date).toLocaleDateString()}.`;
    await sendSMSNotification(user.phoneNumber, smsMessage);

    user.isSubscribed = true;
    await user.save();

    return NextResponse.json({ success: true, data: subscription }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ success: false, error: 'Failed to create subscription' }, { status: 500 });
  }
}
