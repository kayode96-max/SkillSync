// app/api/user/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";

export async function GET(req) {
  // Get session from NextAuth
  const session = await getServerSession(authOptions);

  // Check if session exists
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  // Extract the access token from the session
  const accessToken = session.accessToken || session.token;

  // Specify the GitHub username
  const githubUsername = 'Ahsankhalid618';

  try {
    // Construct the API endpoint for the specific user
    const apiUrl = `https://api.github.com/users/${githubUsername}`;

    // Make a request to the GitHub API
    const githubResponse = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Get user data from the response
    const userData = githubResponse.data;

    // Send the user data as the response
    return new Response(JSON.stringify(userData), {
      status: 200,
    });
  } catch (error) {
    // Log the error and send a response
    console.error("Error fetching user data:", error.message);
    return new Response(JSON.stringify({ message: "Error fetching user data" }), {
      status: 500,
    });
  }
}
