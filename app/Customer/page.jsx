// app/Customer/page.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";

function UserProfile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading

    if (!session) {
      // If not logged in, redirect to login page
      signIn();
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null); // Optionally handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Bio: {userData.bio}</p>
      <p>Location: {userData.location}</p>
      <p>Public Repos: {userData.public_repos}</p>
      {/* Add more user data as needed */}
    </div>
  );
}

export default UserProfile;
