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
import Tick from "../../../public/bluetick1.svg";

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
    <div className=" w-full lg:w-[75%] lg:mx-auto ">
      <div className="h-full border-b-2 border-slate-600 dark:bg-[#1b1f23] flex flex-col items-center justify-center p-8">
      <div className="w-full lg:h-[300px] sm:h-[200px] h-[120px] shrink relative rounded-md">
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
            objectFit="fill"
            objectPosition="center"
            className="w-full"
          />
        )}
      </div>

      <div className="flex flex-col w-full justify-center items-center -mt-10 lg:-mt-20 z-10">
        <img
          src={avatarUrl}
          className="w-20 sm:w-30 lg:w-40 border-2 lg:border-4 border-white rounded-full"
          alt="Profile"
        />
        <div className="absolute lg:right-56 sm:right-28 right-10 top-[14.5rem] sm:top-[20rem]">
          <Imgupload setImageUrl={setImageUrl} username={username} />
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <p className="dark:text-white lg:text-2xl sm:text-lg text-base">{name}</p>
          <Image src={Tick} alt="blue tick" width={20} height={20} />
        </div>
        <p className="text-gray-700 dark:text-white lg:text-xl text-center sm:text-lg text-xs">{bio}</p>
        <p className="lg:text-sm text-xs font-bold text-gray-500 dark:text-white">{location}</p>
      </div>

      <SocialLinksContext.Provider value={{ socialLinks, setSocialLinks }} >
        
          <div className="w-full flex mt-4 justify-center lg:space-x-4 sm:space-x-3 space-x-2 items-center">
            <Link href={userData.html_url}>
              <Image src={GitHub} alt="GitHub" width={20} height={20} />
            </Link>

            <Link href={socialLinks.linkedin || "#"}>
              <Image src={Linkedin} alt="LinkedIn" width={20} height={20} />
            </Link>

            <Link href={socialLinks.twitter || "#"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Link>

            <Link href={socialLinks.leetcode || "#"}>
              <Image src={Leetcode} alt="LeetCode" width={20} height={20} />
            </Link>

            <Link href={socialLinks.stackoverflow || "#"}>
              <Image src={Stackoverflow} alt="Stack Overflow" width={20} height={20} />
            </Link>

            <Link href={socialLinks.website || "#"}>
              <Image src={net} alt="Website" width={20} height={20} />
            </Link> 
            <Link auto className="cursor-pointer" onClick={() => setModalOpen(true)} color="gradient">
           
            <Image src={Add} alt="add" width={20} height={20} />
          </Link>
          </div>
       
      </SocialLinksContext.Provider>

      <SocialModal isOpen={isModalOpen}  onOpenChange={setModalOpen} username={username}/>
    </div>
    </div>
    
  );
}
