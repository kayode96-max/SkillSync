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
    const response = await fetch(`https://api.github.com/users/${username}`,{ cache: 'force-cache' });
    if (response.ok) {
      userData = await response.json();
 
    }else {
      // Log the error if the response is not OK
      console.error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }
  }

  if (!session?.user) {
    redirect("/Login");
  }

  return (
    <div className="dark:bg-[#02090f]">
      <Header userData={userData} username={username} />
      <Bio username={username} />
      <Personal userData={userData} />
    </div>
  );
}