import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Transaction from '@/models/transaction';

export async function GET(req: NextRequest) {
  try {
    await connect();
    const transactions = await Transaction.find().populate('user');
    return NextResponse.json({ success: true, transactions });
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { user, amount, type } = await req.json();
    const transaction = new Transaction({ user, amount, type });
    await transaction.save();
    return NextResponse.json({ success: true, transaction }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}