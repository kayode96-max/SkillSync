import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import User from '../../models/User';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ username }).select('socialLinks');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user.socialLinks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching user social links' }, { status: 500 });
  }
}
