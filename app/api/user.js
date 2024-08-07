// pages/api/user.js
import { getSession } from "next-auth/react";
import axios from "axios";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const githubResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const userData = githubResponse.data;

    // Fetch additional data like repos, followers, etc. using similar requests
    // and include them in the response

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
}
