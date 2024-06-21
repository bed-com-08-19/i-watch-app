import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Subscription from '@/models/Subscription';
import User from '@/models/userModel'; // Import User model
import { connect } from '@/dbConfig/dbConfig';
import twilio from 'twilio';
import { getDataFromToken } from "@/helper/getDataFromToken";

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;
const client = twilio(accountSid, authToken);

async function sendSMSNotification(phoneNumber: string, message: string) {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
    return response;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw new Error('Failed to send SMS');
  }
}

export async function POST(req: NextRequest) {
  await connect();
  try {
    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { subscriptionId } = await req.json();

    // Fetch subscription details
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return NextResponse.json({ message: 'Subscription not found' }, { status: 404 });
    }

    // Cancel the subscription in PayPal
    await axios.post(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscription.subscription_id}/cancel`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID!,
          password: process.env.PAYPAL_SECRET!,
        },
      }
    );

    // Update the subscription status in MongoDB
    subscription.status = 'cancelled';
    await subscription.save();

    // Update the user's subscription status in MongoDB
    const user = await User.findById(subscription.user_id);
    if (user) {
      user.isSubscribed = false;
      await user.save();

      // Send SMS using Twilio
      const smsMessage = `Your subscription has been cancelled. We hope to see you back soon!`;
      await sendSMSNotification(user.phoneNumber, smsMessage);
    }

    return NextResponse.json({ message: 'Subscription cancelled' }, { status: 200 });
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ message: 'Cancel subscription failed', error: error.message }, { status: 500 });
  }
}
