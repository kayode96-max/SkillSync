import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../models/User";

export async function GET(request) {
  try {
    await dbConnect();
    const { username } = request.url; // Extract username from query params or URL
    const user = await User.findOne({ username });
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
  }
}
