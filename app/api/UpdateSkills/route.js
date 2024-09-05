import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../models/User";

export async function POST(request) {
  try {
    await dbConnect();
    const { username, skills } = await request.json();

    if (!username || !skills) {
      return NextResponse.json(
        { message: "Missing username or skills in request body" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user's skills
    user.skills = skills;
    console.log("Updated skills:", skills);
    
    try {
      await user.save();
      console.log("User saved successfully");
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      return NextResponse.json({ message: "Error saving user" }, { status: 500 });
    }

    const updatedUser = await User.findOne({ username });
    console.log("Updated user document:", updatedUser);

    return NextResponse.json({ message: "Skills updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json({ message: "Error updating skills" }, { status: 500 });
  }
}
