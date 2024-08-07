
import React from "react";
import User from "./Components/User/header.jsx";
import Bio from "./Components/User/bio.jsx";
import Personal from "./Components/User/Personal.jsx";
export default function Home() {
  return (
    <div>
      <User/>
      <Bio/>
      <Personal/>
    </div>
  );
}
