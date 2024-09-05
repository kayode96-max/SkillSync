import { NextResponse } from 'next/server';
import dbConnect from '../../lib/db';
import User from '../../models/User';

export async function POST(request) {
  console.log('Handling POST request to /api/UpdateSocial');

  try {
    await dbConnect();
    console.log('db is connected to UpdateSocial');
    const {username,  socialLinks } = await request.json();
    console.log({ username, socialLinks });

    if (!username ||!socialLinks) {
      return NextResponse.json({ message: 'Missing username or socialLinks in request body' }, { status: 400 });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.socialLinks = socialLinks;
    await user.save();

    return NextResponse.json({ message: 'Social links updated successfully', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating social links' }, { status: 500 });
  }
}
