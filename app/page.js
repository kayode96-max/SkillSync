import React from "react";
import { auth } from "./auth.js";
import Header from "./Components/User/Header.jsx";
import Bio from "./Components/User/Bio.jsx";
import Personal from "./Components/User/Personal.jsx";
import { redirect } from "next/navigation.js";
import { headers } from 'next/headers';

export default async function Page() {
  const session = await auth();
  const username = session?.user?.username;

  let userData = null;
  if (username) {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      cache: 'no-store', // Force fresh fetch
    });
    if (response.ok) {
      userData = await response.json();
 
    } else {
      console.error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }

    // Use the headers() function to get the host
    const headersList = headers();
    const host = headersList.get('host');

    // Construct the full URL
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const apiUrl = `${protocol}://${host}/api/EnsureUser`;

    // Make the API call
    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
  }

  if (!session?.user) {
    redirect("/Login");
  }

  return (
    <div className="dark:bg-[#000000] bg-[#DEE5D4] pt-4">
      <Header userData={userData} username={username} />
      <Bio username={username} />
      <Personal userData={userData} />
    </div>
  );
}