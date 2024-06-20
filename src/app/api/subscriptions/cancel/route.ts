import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import Subscription from '@/models/Subscription';
import { connect } from '@/dbConfig/dbConfig'; // Ensure this path is correct based on your project structure

export async function POST(req: NextRequest) {
  await connect();
  try {
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { subscriptionId } = await req.json();
    
    // Cancel the subscription in PayPal
    await axios.post(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      }
    );

    // Update the subscription status in MongoDB
    await Subscription.updateOne(
      { _id: subscriptionId },
      { $set: { status: 'cancelled' } }
    );

    return NextResponse.json({ message: 'Subscription cancelled' }, { status: 200 });
  } catch (error: any) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ message: 'Cancel subscription failed', error: error.message }, { status: 500 });
  }
}
