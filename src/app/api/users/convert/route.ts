// pages/api/users/convert.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helper/getDataFromToken';
import User, { IUser } from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const userId = await getDataFromToken(request);
    const { icoins }: { icoins: number } = await request.json();

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (icoins > user.icoins) {
      throw new Error('Insufficient iCoins balance');
    }

    const amountInMoney = icoins * 45; // Assuming 1 icoin = 45 dollars

    user.icoins -= icoins;
    user.balance += amountInMoney;

    await user.save();

    return NextResponse.json({ success: true, message: 'iCoins converted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
