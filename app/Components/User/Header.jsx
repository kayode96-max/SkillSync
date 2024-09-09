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
      <div className="h-full mb-2 rounded-lg dark:bg-[#1b1f23] bg-[#ffffff] flex flex-col items-center justify-center p-8">
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
            <p className="dark:text-white lg:text-2xl sm:text-lg text-base">
              {name}
            </p>
            <Image src={Tick} alt="blue tick" width={20} height={20} />
          </div>
          <p className="text-gray-700 dark:text-white lg:text-xl text-center sm:text-lg text-xs">
            {bio}
          </p>
          <p className="lg:text-sm text-xs font-bold text-gray-500 dark:text-white">
            {location}
          </p>
        </div>

        <SocialLinksContext.Provider value={{ socialLinks, setSocialLinks }}>
          <div className="w-full flex mt-4 justify-center lg:space-x-4 sm:space-x-3 space-x-2 items-center">
            <Link href={userData.html_url}>
              <Image src={GitHub} alt="GitHub" width={20} height={20} />
              {/* <svg viewBox="0 0 438.549 438.549" {...props}>
                <path
                  fill="currentColor"
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                ></path>
              </svg> */}
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
              <Image
                src={Stackoverflow}
                alt="Stack Overflow"
                width={20}
                height={20}
              />
            </Link>

            <Link href={socialLinks.website || "#"}>
              <Image src={net} alt="Website" width={20} height={20} />
            </Link>
            <Link
              auto
              className="cursor-pointer"
              onClick={() => setModalOpen(true)}
              color="gradient"
            >
              <Image src={Add} alt="add" width={20} height={20} />
            </Link>
          </div>
        </SocialLinksContext.Provider>

        <SocialModal
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          username={username}
        />
      </div>
    </div>
  );
}
