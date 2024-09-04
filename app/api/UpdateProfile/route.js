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
    if (!bannerImage || !username) {
      return NextResponse.json({ message: 'Missing bannerImage or username in request body' }, { status: 400 });
    }

    // Update the user's bannerImage
    const user = await User.create({ username, bannerImage });

    if (!user) {
      return NextResponse.json({ message: 'Error saving username and bannerImage' }, { status: 500 });
    }

    return NextResponse.json({ message: 'both username and bannerImage created successfully', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating profile' }, { status: 500 });
  }
}