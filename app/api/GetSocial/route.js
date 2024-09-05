import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import User from '../../models/User';

export async function GET(request) {


  try {
    await dbConnect();

    const user = await User.findOne().select('socialLinks');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user.socialLinks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching user profile' }, { status: 500 });
  }
}
