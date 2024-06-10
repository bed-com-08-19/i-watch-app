// \api\users\verify\[id]\route.ts

import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    await connect();

    const { id } = params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        user.isVerified = true;
        user.role = 'creator';
        await user.save();

        return NextResponse.json({ message: 'User verified and role updated to creator', user }, { status: 200 });
    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
