import React from "react";
import Image from "next/image";
// import { Button } from "@nextui-org/button";
export default function Page() {
  const data = [
    {
      title: "GitHub",
      imageUrl: "/github.svg",
      value: "bg-gray-800 ",
    },
    {
      title: "Linkedin",
      imageUrl: "/linkedin.svg",
      value: "bg-blue-700",
    },
    {
      title: "Stackoverflow",
      imageUrl: "/stack.svg",
      value: "bg-orange-600 ",
    },
    {
      title: "LeetCode",
      imageUrl: "/leetcode.svg",
      value: "bg-slate-700 ",
    },
  ];
  return (
    <div className="h-screen p-8 w-full">
      <div className="flex-1 dark:bg-cyan-700  rounded-lg shadow-xl mt-4 p-8 ">
        <h4 className="text-xl dark:text-white text-gray-900 font-bold">
          Add Accounts
        </h4>
        <div className="flex gap-6 mt-4">
          {data.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-x-6 p-4 mb-2 bg-gray-800 text-white rounded`}
            >
              <span>+</span>

              {item.title}
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={24}
                height={24}
                className="mr-2"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
