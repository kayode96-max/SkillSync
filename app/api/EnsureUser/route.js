import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../models/User";

export async function POST(request) {
  try {
    await dbConnect();
    const { username } = await request.json();

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }

    return NextResponse.json({ message: 'User ensured', user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error ensuring user' }, { status: 500 });
  }
}