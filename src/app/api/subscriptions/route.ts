import { NextRequest, NextResponse } from 'next/server';
import Subscription from '@/models/subscription';
import { connect } from '@/dbConfig/dbConfig'; // Ensure this path is correct based on your project structure

// Handle GET request to fetch subscriptions
export async function GET(req: NextRequest) {
  try {
    await connect();
    const subscriptions = await Subscription.find().sort({ start_date: -1 });
    return NextResponse.json({ success: true, data: subscriptions });
  } catch (error: any) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Handle POST request to create a new subscription
export async function POST(req: NextRequest) {
  await connect();
  try {
    const body = await req.json();
    const subscription = await Subscription.create(body);
    return NextResponse.json({ success: true, data: subscription }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
