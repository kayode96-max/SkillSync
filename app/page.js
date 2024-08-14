import React from "react";
import { auth } from "./auth.js";
import Logout from "./Login/Logout.jsx";
import Image from "next/image";
import Header from "./Components/User/Header.jsx";
import Bio from "./Components/User/Bio.jsx";
import Personal from "./Components/User/Personal.jsx";
import { redirect } from "next/navigation.js";

export default async function Page() {
  const session = await auth();
  const username = session?.user?.username;

  let userData = null;
  if (username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      userData = await response.json();
    }
  }

  if (!session?.user) {
    redirect("/Login");
  }

  return (
    <div>
      <Header userData={userData} />
      <Bio />
      <Personal />
    </div>
  );
}
