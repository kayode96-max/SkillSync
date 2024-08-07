import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req, res) {
  // Get session from NextAuth
  const session = await getSession({ req });

  // Check if session exists
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
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
    res.status(200).json(userData);
  } catch (error) {
    // Log the error and send a response
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Error fetching user data" });
  }
}
