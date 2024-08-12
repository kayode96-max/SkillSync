import React from "react";
import { auth } from "./auth.js";
import Logout from "./Login/Logout.jsx";
import Image from "next/image";
import Header from "./Components/User/Header.jsx";
import Bio from "./Components/User/Bio.jsx";
import Personal from "./Components/User/Personal.jsx";

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
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-3xl my-2">{session?.user.username}</h1>
      <Image
        src={session?.user.image}
        alt="profile"
        width={100}
        height={100}
        className="rounded-full"
      />
      <Logout />
      <Header userData={userData} />
      <Bio />
      <Personal />
    </div>
  );
}
