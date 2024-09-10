import React from "react";
import { auth } from "./auth.js";
import Header from "./Components/User/Header.jsx";
import Bio from "./Components/User/Bio.jsx";
import Personal from "./Components/User/Personal.jsx";
import { redirect } from "next/navigation.js";


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

    // Ensure user exists in our database
    await fetch('/api/EnsureUser', {
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