import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../models/User";

export async function POST(request) {
  console.log('Handling POST request');
  try {
    console.log('Received request to /api/UpdateProfile');
    await dbConnect();

    // Parse the request body directly
    const { username, bannerImage } = await request.json();
    console.log({ username, bannerImage });

    // Validate incoming data
    if (!username || !bannerImage) {
      return NextResponse.json({ message: 'Missing username or bannerImage in request body' }, { status: 400 });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user's bannerImage
    user.bannerImage = bannerImage;
    await user.save();

    return NextResponse.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
  }
}