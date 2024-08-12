"use client";

import { useApiDataContext } from "../context/UserDataContext";
import Image from "next/image";

const UserProfile = ({}) => {
  const { userData, loading, error } = useApiDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }
  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Username: {userData.login}</p>
      <Image src={userData.avatar_url} alt="Avatar" width={100} height={100} />
      <p>Bio: {userData.bio}</p>
      <p>Location: {userData.location}</p>
      <p>Followers: {userData.followers}</p>
      <p>Following: {userData.following}</p>
      <p>Public Repos: {userData.public_repos}</p>
    </div>
  );
};

export default UserProfile;
