"use client";

import React, { useState, useEffect, createContext } from "react";
import Imgupload from "../ImgUpload/page.jsx";
import SocialModal from "./SocialModal";
import { Link, Button } from "@nextui-org/react";
import Image from "next/image";
import Banner from "../../../public/banner.png";
import GitHub from "../../../public/github.svg";
import Linkedin from "../../../public/linkedin.svg";
import Stackoverflow from "../../../public/stack.svg";
import Leetcode from "../../../public/leetcode.svg";
import net from "../../../public/internet.png";
import Add from "../../../public/add.png";
import Tick from "../../../public/tick.png";

export const SocialLinksContext = createContext({
  socialLinks: {},
  setSocialLinks: () => {},
});

export default function Header({ userData }) {
  const [imageUrl, setImageUrl] = useState(Banner);
  const [socialLinks, setSocialLinks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const username = userData?.login || "defaultUsername";

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch profile data including bannerImage
      const response = await fetch(`/api/GetProfile`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user Image: ${response.status}`);
      }
      const profileData = await response.json();
      setImageUrl(profileData?.data || Banner);
    } catch (error) {
      console.error(`Error fetching user profile: ${error}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSocialLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch social links
      const response = await fetch(`/api/GetSocial`);
      if (!response.ok) {
        throw new Error(`Failed to fetch social links: ${response.status}`);
      }
      const socialData = await response.json();
      setSocialLinks(socialData.data || {});
    } catch (error) {
      console.error(`Error fetching social links: ${error}`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchSocialLinks();
  }, []);

  

  const avatarUrl = userData?.avatar_url || "https://via.placeholder.com/150";
  const name = userData?.name || "username";
  const bio = userData?.bio || "not fetched";
  const location = userData?.location || "not fetched";

  return (
    <div className="h-full border-b-2 mx-auto w-3/4 mt-4 dark:bg-[#021526] flex flex-col items-center justify-center p-8">
      <div className="w-full h-[300px] relative rounded-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full"
          />
        )}
      </div>

      <div className="flex flex-col w-full justify-center items-center -mt-20 z-10">
        <img
          src={avatarUrl}
          className="w-40 border-4 border-white rounded-full"
          alt="Profile"
        />
        <div className="absolute right-52">
          <Imgupload setImageUrl={setImageUrl} username={username} />
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <p className="dark:text-white text-2xl">{name}</p>
          <Image src={Tick} alt="blue tick" width={22} height={22} />
        </div>
        <p className="text-gray-700 dark:text-white">{bio}</p>
        <p className="text-sm text-gray-500 dark:text-white">{location}</p>
      </div>

      <SocialLinksContext.Provider value={{ socialLinks, setSocialLinks }} >
        <div className="w-full flex items-center justify-center mt-2">
          <div className="flex justify-center space-x-4 items-center mt-2">
            <Link href={userData.html_url}>
              <Image src={GitHub} alt="GitHub" width={24} height={24} />
            </Link>

            <Link href={socialLinks.linkedin || "#"}>
              <Image src={Linkedin} alt="LinkedIn" width={24} height={24} />
            </Link>

            <Link href={socialLinks.twitter || "#"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>

            <Link href={socialLinks.leetcode || "#"}>
              <Image src={Leetcode} alt="LeetCode" width={24} height={24} />
            </Link>

            <Link href={socialLinks.stackoverflow || "#"}>
              <Image src={Stackoverflow} alt="Stack Overflow" width={24} height={24} />
            </Link>

            <Link href={socialLinks.website || "#"}>
              <Image src={net} alt="Website" width={24} height={24} />
            </Link>
          </div>
          <Button auto onClick={() => setModalOpen(true)} color="gradient">
            Add
            <Image src={Add} alt="add" width={15} height={15} />
          </Button>
        </div>
      </SocialLinksContext.Provider>

      <SocialModal isOpen={isModalOpen}  onOpenChange={setModalOpen} username={username}/>
    </div>
  );
}
